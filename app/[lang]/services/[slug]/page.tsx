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
import { isLocale, type Locale } from "@/lib/routing";
import { pageMetadata } from "@/lib/seo";
import { serviceSchema } from "@/lib/structuredData";
import { getServiceDetail } from "@/lib/serviceContent";
import JsonLd from "@/components/JsonLd";

// Pre-render every service page for both locales at build time (12 slugs × 2).
export function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }));
}

function resolve(lang: string, slug: string): { locale: Locale; slug: ServiceSlug } | null {
  if (!isLocale(lang)) return null;
  if (!(SERVICE_SLUGS as readonly string[]).includes(slug)) return null;
  return { locale: lang, slug: slug as ServiceSlug };
}

// The service's display name + description, falling back to the card copy for
// services that have no detail entry yet. Shared by the metadata and the JSON-LD
// so the two can't drift apart.
function serviceCopy({ locale, slug }: { locale: Locale; slug: ServiceSlug }) {
  const t = translations[locale];
  const card = t.services.cards[slug];
  const detail = getServiceDetail(slug, locale as Lang);

  return {
    name: detail?.title || [card.name, card.sub].filter(Boolean).join(" "),
    description: detail?.metaDescription || t.servicesPage.tagline,
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const r = resolve(lang, slug);
  if (!r) return {};

  const { name, description } = serviceCopy(r);

  return pageMetadata({
    internalPath: `/services/${r.slug}`,
    locale: r.locale,
    title: getServiceDetail(r.slug, r.locale as Lang)?.metaTitle || `${name} — Grapevine`,
    description,
  });
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

  const { name, description } = serviceCopy(r);

  return (
    <main>
      {/* Service + BreadcrumbList, layered on the Organization/WebSite graph
          the root layout already emits. */}
      <JsonLd
        data={serviceSchema({ slug: r.slug, locale: r.locale, name, description })}
      />
      <ServicesShowcase initialOpen={r.slug} />
      <Footer />
    </main>
  );
}