import type { NextConfig } from "next";

// ── SEO redirect map ──────────────────────────────────────────────────────
// The old grapevine.ge (single-language Georgian) served each service as a
// flat, root-level page. They now live under /services/<slug>. `permanent: true`
// emits a 308 so accumulated link equity carries over to the new URL.
//
// Destinations are BARE Georgian paths (proxy.ts rewrites them onto /ka).
// Adjust a destination if a given slug should map to a different service page.
const OLD_URL_REDIRECTS: { source: string; destination: string }[] = [
  { source: "/social-media-audit", destination: "/services/social-media-audit" },
  { source: "/social-media", destination: "/services/social-media" },
  { source: "/branding", destination: "/services/branding" },
  { source: "/pr-service", destination: "/services/pr-services" },
  { source: "/cifruli-reklama", destination: "/services/digital-advertising" },
  { source: "/saitebis-damzadeba", destination: "/services/web-development" },
  { source: "/google-ads", destination: "/services/campaigns" },
  { source: "/reklamis-gashveba", destination: "/services/digital-advertising" },
  // No dedicated page yet — send to home. Revisit if these earn search traffic
  // (a real /about page would preserve more of the old ranking).
  { source: "/about", destination: "/" },
  // Note: the old WordPress blog (/ბლოგი) is redirected in proxy.ts instead —
  // next.config redirects don't reliably match non-ASCII sources.
];

const nextConfig: NextConfig = {
  async redirects() {
    return OLD_URL_REDIRECTS.map((r) => ({ ...r, permanent: true }));
  },
};

export default nextConfig;