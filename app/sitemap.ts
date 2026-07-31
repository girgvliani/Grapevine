import type { MetadataRoute } from "next";
import { SERVICE_SLUGS } from "@/lib/i18n";
import { absoluteUrl, localizedHref } from "@/lib/routing";

// Every canonical (bare Georgian) route, each carrying its /en hreflang
// alternate. Georgian is the x-default via the bare URL.
const ROUTES: string[] = [
  "/",
  "/services",
  "/portfolio",
  "/contact",
  ...SERVICE_SLUGS.map((slug) => `/services/${slug}`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: absoluteUrl(localizedHref(route, "ka")),
    alternates: {
      languages: {
        ka: absoluteUrl(localizedHref(route, "ka")),
        en: absoluteUrl(localizedHref(route, "en")),
      },
    },
  }));
}