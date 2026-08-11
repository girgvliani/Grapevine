import { NextResponse } from "next/server";
import { Resend } from "resend";

// Override via env if you verify a different sending domain in Resend.
const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "info@grapevine.ge";
const FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL ?? "Grapevine Website <contact@mail.grapevine.ge>";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Contact form: RESEND_API_KEY is not set");
    return NextResponse.json({ error: "server_misconfigured" }, { status: 500 });
  }

  let body: { email?: string; subject?: string; message?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const email = (body.email ?? "").trim();
  const subject = (body.subject ?? "").trim();
  const message = (body.message ?? "").trim();

  if (!EMAIL_PATTERN.test(email) || !message) {
    return NextResponse.json({ error: "invalid_input" }, { status: 400 });
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: TO_EMAIL,
    replyTo: email,
    subject: subject ? `Website contact: ${subject}` : "New website contact form submission",
    text: `From: ${email}\nSubject: ${subject || "(no subject)"}\n\n${message}`,
  });

  if (error) {
    console.error("Contact form: Resend send failed:", error);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
