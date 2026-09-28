// Server-side Cloudflare Turnstile verification, shared by every public form
// route (/api/contact, /api/seo-audit).

async function verifyTurnstile(token: string, ip: string | null, secret: string) {
  const params = new URLSearchParams({ secret, response: token });
  if (ip) params.set("remoteip", ip);
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  });
  const data = (await res.json()) as { success: boolean };
  return data.success;
}

export function clientIp(request: Request): string | null {
  return request.headers.get("cf-connecting-ip") ?? request.headers.get("x-forwarded-for");
}

// Returns an error code, or null when the request may proceed.
//
// The captcha is only enforced when it's actually configured, mirroring the
// forms, which skip the widget when NEXT_PUBLIC_TURNSTILE_SITE_KEY is unset.
// The two used to disagree: with no key deployed the form submitted an empty
// token and the contact route rejected every real enquiry with `captcha_required`.
export async function checkTurnstile(
  request: Request,
  token: string,
  logPrefix: string
): Promise<"captcha_required" | "captcha_failed" | null> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.warn(`${logPrefix}: TURNSTILE_SECRET_KEY is not set — accepting submissions without spam protection`);
    return null;
  }
  if (!token) return "captcha_required";
  return (await verifyTurnstile(token, clientIp(request), secret)) ? null : "captcha_failed";
}
