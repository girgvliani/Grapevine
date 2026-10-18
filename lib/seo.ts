// Shared page metadata. Every route builds its <head> through `pageMetadata` so
// canonical URLs, hreflang, Open Graph and Twitter cards stay consistent — and so
// adding a field later is one edit here rather than five across the app.
//
// og:image IS set here: every page gets its own card from /api/og carrying the
// page's name. (The opengraph-image file convention only ever reached the
// homepage in production, leaving 36 pages with no share image.)

import type { Metadata } from "next";
import {
  SITE_URL,
  absoluteUrl,
  localizedHref,
  pageAlternates,
  singleLocaleAlternates,
  type Locale,
} from "./routing";

export const SITE_NAME = "Grapevine";

// Open Graph wants full locale codes, not our two-letter routing locales.
const OG_LOCALE: Record<Locale, string> = { ka: "ka_GE", en: "en_US" };

// Google shows roughly 155 characters of a description; anything longer is
// cut mid-sentence. Trims on a word boundary and adds an ellipsis.
export const DESCRIPTION_MAX = 155;
export function snippet(text: string, max = DESCRIPTION_MAX): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const atWord = cut.lastIndexOf(" ");
  return `${(atWord > max * 0.6 ? cut.slice(0, atWord) : cut).replace(/[\s,;:.\-–—]+$/, "")}…`;
}

// The share card prints the page's name, not the full SEO title, so strip the
// " - Grapevine" / " | Grapevine" suffix every title carries.
function cardTitle(title: string): string {
  return title.replace(/\s*[-|–—]\s*Grapevine\s*$/u, "").trim();
}

export function ogImageUrl(locale: Locale, title: string): string {
  const params = new URLSearchParams({ lang: locale, title: cardTitle(title) });
  return absoluteUrl(`/api/og?${params.toString()}`);
}

export function pageMetadata({
  internalPath,
  locale,
  title,
  description,
  ogTitle,
  singleLocale = false,
}: {
  internalPath: string;
  locale: Locale;
  title: string;
  description: string;
  // Text on the share card when the page title isn't the right thing to print
  // (the homepage shows the hero label rather than its search-facing title).
  ogTitle?: string;
  // Set for content with no real counterpart in the other language (blog
  // posts) — drops the hreflang `languages` block and the OG alternateLocale,
  // both of which would otherwise claim a translation that doesn't exist.
  singleLocale?: boolean;
}): Metadata {
  const other: Locale = locale === "ka" ? "en" : "ka";
  const image = {
    url: ogImageUrl(locale, ogTitle ?? title),
    width: 1200,
    height: 630,
    alt: ogTitle ?? cardTitle(title),
  };

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description: snippet(description),
    alternates: singleLocale
      ? singleLocaleAlternates(internalPath, locale)
      : pageAlternates(internalPath, locale),
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      url: absoluteUrl(localizedHref(internalPath, locale)),
      title,
      description: snippet(description),
      locale: OG_LOCALE[locale],
      alternateLocale: singleLocale ? undefined : OG_LOCALE[other],
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: snippet(description),
      images: [image.url],
    },
  };
}
