import type { Metadata } from "next";
import PortfolioShowcase from "@/components/PortfolioShowcase";
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
    title: locale === "ka" ? "პორტფოლიო — Grapevine" : "Portfolio — Grapevine",
    description: t.portfolioPage.intro,
    alternates: pageAlternates("/portfolio", locale),
  };
}

export default function PortfolioPage() {
  return (
    <main>
      <PortfolioShowcase />
      <Footer />
    </main>
  );
}
