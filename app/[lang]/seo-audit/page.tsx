import type { Metadata } from "next";
import SeoAudit from "@/components/SeoAudit";
import Footer from "@/components/Footer";
import { isLocale } from "@/lib/routing";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : "ka";
  return pageMetadata({
    internalPath: "/seo-audit",
    locale,
    title: locale === "ka" ? "უფასო SEO აუდიტი - Grapevine" : "Free SEO Audit - Grapevine",
    description:
      locale === "ka"
        ? "შეამოწმეთ თქვენი ვებსაიტის SEO, სისწრაფე და ქართული ბაზრის სპეციფიკა 30 წამში — უფასოდ, Grapevine-ისგან."
        : "Check your website's SEO, speed and Georgian-market specifics in 30 seconds — free, from Grapevine.",
  });
}

export default function SeoAuditPage() {
  return (
    <>
      <SeoAudit />
      <Footer />
    </>
  );
}
