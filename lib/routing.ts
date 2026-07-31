// ──────────────────────────────────────────────────────────────────────────
// URL scheme + locale helpers.
//
// Georgian ("ka") is the DEFAULT locale and is served at BARE paths (e.g.
// `/services`) — this preserves the old single-language grapevine.ge URLs for
// SEO. English ("en") is a new locale served under an `/en` prefix.
//
//   ka  →  /services            (bare, canonical)
//   en  →  /en/services
//
// The pages physically live under `app/[lang]/…`; `proxy.ts` rewrites bare
// paths to the internal `/ka/…` segment without changing the visible URL.
// ──────────────────────────────────────────────────────────────────────────

export const LOCALES = ["ka", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "ka";

// Public origin, used to build absolute URLs for metadata/sitemap. Override in
// the environment for previews; falls back to the production domain.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://grapevine.ge"
).replace(/\/$/, "");

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

// Build the public href for an internal (bare) path in a given locale.
//   localizedHref("/services", "ka") → "/services"
//   localizedHref("/services", "en") → "/en/services"
//   localizedHref("/", "en")         → "/en"
export function localizedHref(path: string, locale: Locale): string {
  if (!path.startsWith("/")) return path; // hash / external — leave untouched
  if (locale === DEFAULT_LOCALE) return path;
  return path === "/" ? "/en" : `/en${path}`;
}

// Remove a leading locale segment, returning the bare internal path.
//   "/en/services" → "/services"   "/en" → "/"   "/services" → "/services"
export function stripLocale(pathname: string): string {
  const match = pathname.match(/^\/(ka|en)(?=\/|$)/);
  if (!match) return pathname || "/";
  return pathname.slice(match[0].length) || "/";
}

// Absolute URL for a bare internal path.
export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path === "/" ? "" : path}`;
}

// `alternates` block for page metadata: a self-referencing canonical for the
// active locale plus the hreflang map (ka / en / x-default). Feed it a BARE
// internal path such as "/services" or "/services/branding".
export function pageAlternates(internalPath: string, locale: Locale) {
  const ka = absoluteUrl(localizedHref(internalPath, "ka"));
  const en = absoluteUrl(localizedHref(internalPath, "en"));
  return {
    canonical: absoluteUrl(localizedHref(internalPath, locale)),
    languages: { ka, en, "x-default": ka },
  };
}