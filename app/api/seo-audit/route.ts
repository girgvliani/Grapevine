import { NextResponse } from "next/server";
import { auditPage } from "@/lib/seoAudit/pageChecks";
import { runPageSpeed, PsiError } from "@/lib/seoAudit/pagespeed";
import { AuditError, assertAuditable, normalizeUrl } from "@/lib/seoAudit/safeFetch";
import type { AuditErrorCode, AuditEvent } from "@/lib/seoAudit/types";
import { checkTurnstile, clientIp } from "@/lib/turnstile";

// PageSpeed alone takes 10–30s per strategy, and mobile + desktop run in parallel.
export const maxDuration = 60;

// Per-instance rate limit. Serverless instances don't share memory, so this is
// a speed bump, not a guarantee — Turnstile is the real gate. Move this to
// Upstash/Vercel KV if the PageSpeed quota ever starts running out.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 6;
const recent = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (hits.length >= MAX_PER_WINDOW) return true;
  hits.push(now);
  recent.set(ip, hits);
  if (recent.size > 5000) recent.clear(); // bound memory on a long-lived instance
  return false;
}

function fail(code: AuditErrorCode, status: number) {
  return NextResponse.json({ error: code }, { status });
}

export async function POST(request: Request) {
  let body: { url?: string; turnstileToken?: string };
  try {
    body = await request.json();
  } catch {
    return fail("generic", 400);
  }

  const url = normalizeUrl(body.url ?? "");
  if (!url) return fail("invalid_url", 400);

  if (await checkTurnstile(request, (body.turnstileToken ?? "").trim(), "SEO audit")) {
    return fail("captcha", 400);
  }

  const ip = clientIp(request)?.split(",")[0].trim() ?? "unknown";
  if (rateLimited(ip)) return fail("rate_limited", 429);

  // Reject private/unresolvable hosts before any PageSpeed quota is spent.
  try {
    await assertAuditable(url);
  } catch (err) {
    return fail(err instanceof AuditError ? err.code : "generic", 400);
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const send = (event: AuditEvent) => {
        try {
          controller.enqueue(encoder.encode(`${JSON.stringify(event)}\n`));
        } catch {
          /* client went away — keep going so the function finishes cleanly */
        }
      };

      await Promise.all([
        auditPage(url).then(
          (report) => send({ type: "page", report }),
          (err) => {
            if (!(err instanceof AuditError)) console.error("SEO audit: page check crashed:", err);
            send({ type: "page_error", code: err instanceof AuditError ? err.code : "generic" });
          }
        ),
        ...(["mobile", "desktop"] as const).map((strategy) =>
          runPageSpeed(url.href, strategy).then(
            (report) => send({ type: "psi", report }),
            (err) => send({ type: "psi_error", strategy, code: err instanceof PsiError ? err.code : "failed" })
          )
        ),
      ]);

      send({ type: "done" });
      try {
        controller.close();
      } catch {
        /* already closed by a client disconnect */
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
