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
  ...SERVICE_SLUGS.map((slug) => `/services/${slug}`),
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = ROUTES.map((route) => ({
    url: absoluteUrl(localizedHref(route, "ka")),
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
