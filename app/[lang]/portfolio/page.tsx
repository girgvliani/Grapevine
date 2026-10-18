import type { Metadata } from "next";
import PortfolioShowcase from "@/components/PortfolioShowcase";
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
    internalPath: "/portfolio",
    locale,
    title:
      locale === "ka"
        ? "პორტფოლიო: ბრენდინგისა და მარკეტინგის ნამუშევრები - Grapevine"
        : "Portfolio: Branding and Marketing Work - Grapevine",
    description:
      locale === "ka"
        ? "Grapevine-ის შესრულებული პროექტები: ბრენდინგი, კამპანიები, ვებსაიტები და ვიდეო ქართული და საერთაშორისო ბრენდებისთვის."
        : "Selected projects by Grapevine: branding, campaigns, websites and video for Georgian and international brands.",
    ogTitle: t.nav?.portfolio ?? (locale === "ka" ? "პორტფოლიო" : "Portfolio"),
  });
}

export default function PortfolioPage() {
  return (
    <main>
      <PortfolioShowcase />
      <Footer />
    </main>
  );
}
