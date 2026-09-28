// Fetching a URL a visitor typed in, without letting them point our server at
// something it shouldn't reach (SSRF): localhost, private networks, cloud
// metadata endpoints. Every hop of a redirect chain is re-validated, because
// "https://innocent.ge" redirecting to "http://127.0.0.1" is the classic bypass.
//
// Known gap: the DNS check and fetch()'s own lookup are separate, so a
// hostname that flips between a public and a private IP (DNS rebinding) could
// slip through. Closing that needs a custom undici dispatcher with a pinned
// lookup — worth doing if this ever runs somewhere with a real internal network.

import { lookup } from "node:dns/promises";
import { isIP } from "node:net";
import type { AuditErrorCode } from "./types";

export class AuditError extends Error {
  constructor(public code: AuditErrorCode) {
    super(code);
  }
}

const USER_AGENT =
  "Mozilla/5.0 (compatible; GrapevineSEOAudit/1.0; +https://grapevine.ge/seo-audit)";
const MAX_REDIRECTS = 5;

// Accepts what people actually type ("example.ge", "www.example.ge/page") and
// returns a normalised URL, or null if it isn't something we'll audit.
export function normalizeUrl(input: string): URL | null {
  let raw = input.trim();
  if (!raw || raw.length > 2048) return null;
  if (!/^[a-z][a-z0-9+.-]*:\/\//i.test(raw)) raw = `https://${raw}`;

  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return null;
  }
  if (!isAllowedShape(url)) return null;
  url.hash = "";
  return url;
}

function isAllowedShape(url: URL): boolean {
  if (url.protocol !== "http:" && url.protocol !== "https:") return false;
  if (url.username || url.password) return false;
  // Only the standard ports — nobody's public website lives on :6379.
  if (url.port && url.port !== "80" && url.port !== "443") return false;

  const host = url.hostname.replace(/^\[|\]$/g, "");
  // Raw IPs (including the decimal/hex forms URL normalises into dotted
  // quads) are refused outright; real sites are audited by domain name.
  if (isIP(host)) return false;
  if (!host.includes(".")) return false;
  if (/\.(local|localhost|internal|lan|home|corp)$/i.test(host)) return false;
  return true;
}

function isPrivateIPv4(ip: string): boolean {
  const [a, b, c] = ip.split(".").map(Number);
  return (
    a === 0 ||
    a === 10 ||
    a === 127 ||
    (a === 100 && b >= 64 && b <= 127) || // carrier-grade NAT
    (a === 169 && b === 254) || // link-local, incl. cloud metadata
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 168) ||
    // Only 192.0.0.x and 192.0.2.x are reserved — the rest of 192.0.x.x is
    // public (WordPress.com sites resolve to 192.0.78.x).
    (a === 192 && b === 0 && (c === 0 || c === 2)) ||
    (a === 198 && (b === 18 || b === 19)) ||
    a >= 224 // multicast + reserved
  );
}

function isPrivateIPv6(ip: string): boolean {
  const addr = ip.toLowerCase();
  if (addr === "::" || addr === "::1") return true;
  // IPv4-mapped (::ffff:10.0.0.1) — no public site resolves to these.
  if (addr.startsWith("::ffff:")) return true;
  return /^(f[cd]|fe[89ab]|ff|64:ff9b|2001:db8)/.test(addr);
}

async function assertPublicHost(hostname: string) {
  let addresses: { address: string; family: number }[];
  try {
    addresses = await lookup(hostname, { all: true });
  } catch {
    throw new AuditError("dns_failed");
  }
  if (addresses.length === 0) throw new AuditError("dns_failed");
  for (const { address, family } of addresses) {
    if (family === 4 ? isPrivateIPv4(address) : isPrivateIPv6(address)) {
      throw new AuditError("blocked_host");
    }
  }
}

// Validates the host without fetching — lets the route reject a bad address
// before it spends PageSpeed quota on it.
export async function assertAuditable(url: URL) {
  if (!isAllowedShape(url)) throw new AuditError("blocked_host");
  await assertPublicHost(url.hostname);
}

export type FetchResult = {
  finalUrl: URL;
  status: number;
  headers: Headers;
  body: string;
  redirects: number;
  elapsedMs: number;
};

export async function safeFetch(
  start: URL,
  { timeoutMs, maxBytes }: { timeoutMs: number; maxBytes: number }
): Promise<FetchResult> {
  const signal = AbortSignal.timeout(timeoutMs);
  const began = Date.now();
  let url = start;

  for (let redirects = 0; ; redirects++) {
    await assertAuditable(url);

    let res: Response;
    try {
      res = await fetch(url, {
        redirect: "manual",
        signal,
        cache: "no-store",
        headers: {
          "User-Agent": USER_AGENT,
          Accept: "text/html,application/xhtml+xml,text/plain,application/xml;q=0.9,*/*;q=0.5",
          "Accept-Language": "ka,en;q=0.8",
        },
      });
    } catch (err) {
      throw new AuditError(isTimeout(err) ? "timeout" : isCertError(err) ? "tls_invalid" : "fetch_failed");
    }

    const location = res.headers.get("location");
    if (res.status >= 300 && res.status < 400 && location) {
      await res.body?.cancel();
      if (redirects >= MAX_REDIRECTS) throw new AuditError("too_many_redirects");
      try {
        url = new URL(location, url);
      } catch {
        throw new AuditError("fetch_failed");
      }
      continue;
    }

    const elapsedMs = Date.now() - began;
    const body = await readCapped(res, maxBytes).catch((err) => {
      throw new AuditError(isTimeout(err) ? "timeout" : "fetch_failed");
    });
    return { finalUrl: url, status: res.status, headers: res.headers, body, redirects, elapsedMs };
  }
}

// Reads at most `maxBytes` and stops — a multi-gigabyte response must not be
// buffered into the function's memory.
async function readCapped(res: Response, maxBytes: number): Promise<string> {
  if (!res.body) return "";
  const reader = res.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (size < maxBytes) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    size += value.byteLength;
  }
  await reader.cancel().catch(() => {});

  const bytes = new Uint8Array(Math.min(size, maxBytes));
  let offset = 0;
  for (const chunk of chunks) {
    const slice = chunk.subarray(0, bytes.length - offset);
    bytes.set(slice, offset);
    offset += slice.length;
    if (offset >= bytes.length) break;
  }

  const charset = /charset=([^;]+)/i.exec(res.headers.get("content-type") ?? "")?.[1]?.trim();
  try {
    return new TextDecoder(charset || "utf-8").decode(bytes);
  } catch {
    return new TextDecoder("utf-8").decode(bytes); // unknown charset label
  }
}

// A broken certificate is a finding in itself (e.g. one issued for www. only),
// not a failure of the tool — browsers show the same site a full-page warning.
function isCertError(err: unknown): boolean {
  const code = (err as { cause?: { code?: string } })?.cause?.code ?? "";
  return /^(ERR_TLS_CERT|CERT_|UNABLE_TO_(GET|VERIFY)|DEPTH_ZERO_SELF_SIGNED|SELF_SIGNED)/.test(code);
}

function isTimeout(err: unknown): boolean {
  return err instanceof Error && (err.name === "TimeoutError" || err.name === "AbortError");
}
