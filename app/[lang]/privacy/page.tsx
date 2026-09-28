import type { Metadata } from "next";
import PrivacyPolicy from "@/components/PrivacyPolicy";
import Footer from "@/components/Footer";
import { isLocale } from "@/lib/routing";
import { pageMetadata } from "@/lib/seo";
import { PRIVACY } from "@/content/privacy";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : "ka";
  return pageMetadata({
    internalPath: "/privacy",
    locale,
    title: `${PRIVACY[locale].title} - Grapevine`,
    description: PRIVACY[locale].intro,
  });
}

export default function PrivacyPage() {
  return (
    <>
      <PrivacyPolicy />
      <Footer />
    </>
  );
}
