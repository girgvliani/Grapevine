import type { Metadata } from "next";
import ContactSection from "@/components/ContactSection";
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
    internalPath: "/contact",
    locale,
    title: locale === "ka" ? "კონტაქტი — Grapevine" : "Contact — Grapevine",
    description:
      locale === "ka"
        ? "გვითხარით, სად არის თქვენი ბრენდი აღრეული. ჩვენ ვიპოვით ძაფს და გეგმას მის გასასწორებლად."
        : "Tell us where your brand is tangled. We'll find the thread and a plan to pull it straight.",
  });
}

export default function ContactPage() {
  return (
    <main>
      <ContactSection />
      <Footer />
    </main>
  );
}
