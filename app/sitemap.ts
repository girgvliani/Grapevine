import type { MetadataRoute } from "next";
import { SERVICE_SLUGS } from "@/lib/i18n";
import { absoluteUrl, localizedHref } from "@/lib/routing";
import { getPublishedPosts } from "@/lib/blog";

// Every canonical (bare Georgian) route, each carrying its /en hreflang
// alternate. Georgian is the x-default via the bare URL.
const ROUTES: string[] = [
  "/",
  "/services",
  "/portfolio",
  "/contact",
  "/blog",
  "/seo-audit",
  "/privacy",
  ...SERVICE_SLUGS.map((slug) => `/services/${slug}`),
];

// When each static page's content last changed. Google uses lastmod to decide
// what to recrawl, so keep it honest: bump a route's date when its copy or
// metadata changes, not on every deploy. Routes not listed fall back to
// SITE_LAST_MODIFIED (the last site-wide metadata change).
const SITE_LAST_MODIFIED = "2026-10-19"; // titles, descriptions and share images reworked
const ROUTE_LAST_MODIFIED: Record<string, string> = {
  "/privacy": "2026-09-28",
  "/seo-audit": "2026-09-28",
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = ROUTES.map((route) => ({
    url: absoluteUrl(localizedHref(route, "ka")),
    lastModified: new Date(ROUTE_LAST_MODIFIED[route] ?? SITE_LAST_MODIFIED),
    alternates: {
      languages: {
        ka: absoluteUrl(localizedHref(route, "ka")),
        en: absoluteUrl(localizedHref(route, "en")),
      },
    },
  }));

  // Blog posts are single-language content, not ka/en pairs of the same
  // page, so each gets its own sitemap entry with no cross-language
  // alternate — unlike everything else above. Swallows DB errors so a
  // misconfigured/unreachable database doesn't take the whole sitemap down.
  let postEntries: MetadataRoute.Sitemap = [];
  try {
    const [kaPosts, enPosts] = await Promise.all([getPublishedPosts("ka"), getPublishedPosts("en")]);
    postEntries = [
      ...kaPosts.map((post) => ({ url: absoluteUrl(`/blog/${post.slug}`), lastModified: post.updatedAt })),
      ...enPosts.map((post) => ({ url: absoluteUrl(localizedHref(`/blog/${post.slug}`, "en")), lastModified: post.updatedAt })),
    ];
  } catch {
    /* DATABASE_URL not set yet, or DB unreachable — sitemap still works without post entries */
  }

  return [...staticEntries, ...postEntries];
}
