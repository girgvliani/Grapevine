import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Next 16 renamed the `middleware` file convention to `proxy`. This runs before
// routing and redirects any URL missing a locale prefix to the right /en or /ka.

const LOCALES = ["en", "ka"] as const;
const DEFAULT_LOCALE = "ka";

// Cookie (set by the language toggle) wins; then the browser's Accept-Language;
// finally the default. Only en/ka are supported so the parse is intentionally small.
function getLocale(request: NextRequest): string {
  const cookie = request.cookies.get("grapevine_lang")?.value;
  if (cookie === "en" || cookie === "ka") return cookie;

  const accept = (request.headers.get("accept-language") ?? "").toLowerCase();
  for (const part of accept.split(",")) {
    const tag = part.split(";")[0].trim();
    if (tag === "ka" || tag.startsWith("ka-")) return "ka";
    if (tag === "en" || tag.startsWith("en-")) return "en";
  }
  return DEFAULT_LOCALE;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (hasLocale) return NextResponse.next();

  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Run on everything except Next internals and files with an extension
  // (favicon.ico, images, etc.), which must not be locale-prefixed.
  matcher: ["/((?!_next|.*\\..*).*)"],
};
