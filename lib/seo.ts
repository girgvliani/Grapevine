// Shared page metadata. Every route builds its <head> through `pageMetadata` so
// canonical URLs, hreflang, Open Graph and Twitter cards stay consistent — and so
// adding a field later is one edit here rather than five across the app.
//
// og:image is NOT set here: `app/opengraph-image.tsx` is a file convention that
// Next applies to every route beneath it automatically.

import type { Metadata } from "next";
import {
  SITE_URL,
  absoluteUrl,
  localizedHref,
  pageAlternates,
  type Locale,
} from "./routing";

export const SITE_NAME = "Grapevine";

// Open Graph wants full locale codes, not our two-letter routing locales.
const OG_LOCALE: Record<Locale, string> = { ka: "ka_GE", en: "en_US" };

export function pageMetadata({
  internalPath,
  locale,
  title,
  description,
}: {
  internalPath: string;
  locale: Locale;
  title: string;
  description: string;
}): Metadata {
  const other: Locale = locale === "ka" ? "en" : "ka";

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: pageAlternates(internalPath, locale),
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      url: absoluteUrl(localizedHref(internalPath, locale)),
      title,
      description,
      locale: OG_LOCALE[locale],
      alternateLocale: OG_LOCALE[other],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
