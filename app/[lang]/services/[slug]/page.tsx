import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicesShowcase from "@/components/ServicesShowcase";
import Footer from "@/components/Footer";
import {
  translations,
  SERVICE_SLUGS,
  type Lang,
  type ServiceSlug,
} from "@/lib/i18n";
import { isLocale, pageAlternates, type Locale } from "@/lib/routing";
import { getServiceDetail } from "@/lib/serviceContent";

// Pre-render every service page for both locales at build time (12 slugs × 2).
export function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }));
}

function resolve(lang: string, slug: string): { locale: Locale; slug: ServiceSlug } | null {
  if (!isLocale(lang)) return null;
  if (!(SERVICE_SLUGS as readonly string[]).includes(slug)) return null;
  return { locale: lang, slug: slug as ServiceSlug };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const r = resolve(lang, slug);
  if (!r) return {};

  const t = translations[r.locale];
  const card = t.services.cards[r.slug];
  const detail = getServiceDetail(r.slug, r.locale as Lang);
  const name = detail?.title || [card.name, card.sub].filter(Boolean).join(" ");

  return {
    title: detail?.metaTitle || `${name} — Grapevine`,
    description: detail?.metaDescription || t.servicesPage.tagline,
    alternates: pageAlternates(`/services/${r.slug}`, r.locale),
  };
}

// A service URL renders the services page with that card already expanded
// (server-rendered so the copy is in the HTML), rather than a separate layout.
// Opening/closing cards then updates the URL client-side without a reload.
export default async function ServicePage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const r = resolve(lang, slug);
  if (!r) notFound();

  return (
    <main>
      <ServicesShowcase initialOpen={r.slug} />
      <Footer />
    </main>
  );
}