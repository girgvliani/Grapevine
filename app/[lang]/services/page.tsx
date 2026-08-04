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
  return pageMetadata({
    internalPath: "/services",
    locale,
    title: locale === "ka" ? "სერვისები — Grapevine" : "Services — Grapevine",
    description: t.servicesPage.tagline,
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
