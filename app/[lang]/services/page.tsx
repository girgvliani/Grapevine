import type { Metadata } from "next";
import ServicesShowcase from "@/components/ServicesShowcase";
import Footer from "@/components/Footer";
import { translations } from "@/lib/i18n";
import { isLocale } from "@/lib/routing";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : "ka";
  const t = translations[locale];
  // Search-facing: the hub page should rank for "marketing services" queries,
  // not for the word "Services". The visible heading stays as designed.
  return pageMetadata({
    internalPath: "/services",
    locale,
    title:
      locale === "ka"
        ? "მარკეტინგული სერვისები თბილისში - Grapevine"
        : "Marketing Services in Tbilisi - Grapevine",
    description:
      locale === "ka"
        ? `ბრენდინგი, ციფრული რეკლამა, SEO, ვიდეო პროდაქშენი, ვებ და მობილური დეველოპმენტი, CRM და PR ერთი სააგენტოსგან თბილისში. ${t.servicesPage.tagline}`
        : `Branding, digital advertising, SEO, video production, web and mobile development, CRM and PR from one agency in Tbilisi. ${t.servicesPage.tagline}`,
    ogTitle: t.nav?.services ?? (locale === "ka" ? "სერვისები" : "Services"),
  });
}

export default function ServicesPage() {
  return (
    <main>
      <ServicesShowcase />
      <Footer />
    </main>
  );
}
