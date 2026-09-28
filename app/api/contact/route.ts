import { NextResponse } from "next/server";
import { Resend } from "resend";
import { checkTurnstile } from "@/lib/turnstile";

// Override via env if you verify a different sending domain in Resend.
const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "info@grapevine.ge";
const FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL ?? "Grapevine Website <contact@mail.grapevine.ge>";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// CRM lead capture. `CRM_TENANT` is what switches this on — unset (a preview
// deploy, a fork) and enquiries are simply emailed as before, same opt-in-via-env
// pattern as GA/GTM.
const CRM_API_URL =
  process.env.CRM_API_URL ?? "https://crmgrapevine-production.up.railway.app";
const CRM_TENANT = process.env.CRM_TENANT;

// Mirrors the enquiry into the CRM as a Contact with Status "Lead" and
// Source "Web Form". Deliberately best-effort and never throws: the visitor
// has already passed the captcha and their message is being emailed, so a CRM
// outage must not fail their submission. Awaited rather than fired and
// forgotten because a serverless function can be frozen the moment it responds.
async function createCrmLead(fields: { email: string; subject: string; message: string }) {
  if (!CRM_TENANT) return;
  try {
    const res = await fetch(`${CRM_API_URL}/api/public/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Tenant": CRM_TENANT },
      // `email` is the only field the endpoint requires. This form collects no
      // name, so the subject is folded into the message rather than dropped —
      // the CRM has no subject field of its own.
      body: JSON.stringify({
        email: fields.email,
        message: fields.subject ? `${fields.subject}\n\n${fields.message}` : fields.message,
      }),
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) {
      console.error("Contact form: CRM lead capture failed:", res.status, await res.text());
    }
  } catch (err) {
    console.error("Contact form: CRM lead capture error:", err);
  }
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Contact form: RESEND_API_KEY is not set");
    return NextResponse.json({ error: "server_misconfigured" }, { status: 500 });
  }

  let body: { email?: string; subject?: string; message?: string; turnstileToken?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const email = (body.email ?? "").trim();
  const subject = (body.subject ?? "").trim();
  const message = (body.message ?? "").trim();
  const turnstileToken = (body.turnstileToken ?? "").trim();

  if (!EMAIL_PATTERN.test(email) || !message) {
    return NextResponse.json({ error: "invalid_input" }, { status: 400 });
  }

  const captchaError = await checkTurnstile(request, turnstileToken, "Contact form");
  if (captchaError) {
    return NextResponse.json({ error: captchaError }, { status: 400 });
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: TO_EMAIL,
    replyTo: email,
    subject: subject ? `Website contact: ${subject}` : "New website contact form submission",
    text: `From: ${email}\nSubject: ${subject || "(no subject)"}\n\n${message}`,
  });

  // Runs whether or not the email went out: if Resend failed, this is the only
  // surviving record of the enquiry. Repeat submissions after a failure are
  // matched by the CRM's own duplicate detection.
  await createCrmLead({ email, subject, message });

  if (error) {
    console.error("Contact form: Resend send failed:", error);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
