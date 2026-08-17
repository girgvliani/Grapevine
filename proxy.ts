import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Next 16 renamed the `middleware` file convention to `proxy`. This runs before
// routing and implements the "bare Georgian, prefixed English" URL scheme:
//
//   • /en, /en/…   → served as-is (English locale).
//   • /ka, /ka/…   → 308-redirected to the bare Georgian URL, so there is a
//                    single canonical Georgian path (no duplicate content).
//   • anything else → a bare Georgian path, internally REWRITTEN to /ka/… so the
//                     [lang] route resolves while the visible URL stays clean.
//
// Bare paths always resolve to Georgian (the default locale). We intentionally
// do NOT auto-redirect based on Accept-Language: a stable, crawlable canonical
// URL matters more for SEO than guessing the visitor's language. English is
// opt-in via the language toggle, which navigates to the /en prefix.

const DEFAULT_LOCALE = "ka";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // English is already correctly prefixed.
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    return NextResponse.next();
  }

  // Explicit /ka/* → canonical bare Georgian URL (permanent).
  if (pathname === "/ka" || pathname.startsWith("/ka/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice("/ka".length) || "/";
    return NextResponse.redirect(url, 308);
  }

  // Old WordPress blog (/ბლოგი) — now that there's a real blog again, send the
  // indexed URL there instead of home. Handled here rather than in
  // next.config because redirects() doesn't reliably match non-ASCII sources.
  let decoded = pathname;
  try {
    decoded = decodeURIComponent(pathname);
  } catch {
    /* malformed escape — leave as-is */
  }
  if (decoded === "/ბლოგი" || decoded === "/ბლოგი/") {
    const url = request.nextUrl.clone();
    url.pathname = "/blog";
    return NextResponse.redirect(url, 308);
  }

  // Bare Georgian path → rewrite onto the internal /ka segment. The browser URL
  // is unchanged; Next serves the statically rendered /ka/<path> page.
  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Run on everything except Next internals, API routes, the admin tool
  // (not locale content — rewriting /admin to /ka/admin 404s it, since admin
  // pages live outside app/[lang]), and files with an extension (favicon.ico,
  // sitemap.xml, robots.txt, images), which must not be rewritten.
  matcher: ["/((?!_next|api|admin|.*\\..*).*)"],
};