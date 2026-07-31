import type { Metadata } from "next";
import ServicesShowcase from "@/components/ServicesShowcase";
import Footer from "@/components/Footer";
import { translations } from "@/lib/i18n";
import { isLocale, pageAlternates } from "@/lib/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : "ka";
  const t = translations[locale];
  return {
    title: locale === "ka" ? "სერვისები — Grapevine" : "Services — Grapevine",
    description: t.servicesPage.tagline,
    alternates: pageAlternates("/services", locale),
  };
}

export default function ServicesPage() {
  return (
    <main>
      <ServicesShowcase />
      <Footer />
    </main>
  );
}
