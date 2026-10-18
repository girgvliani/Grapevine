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
    title:
      locale === "ka"
        ? "დაგვიკავშირდით: მარკეტინგული სააგენტო თბილისში - Grapevine"
        : "Contact Grapevine: Marketing Agency in Tbilisi",
    description:
      locale === "ka"
        ? "info@grapevine.ge, +995 599 495 574. გვითხარით, სად არის თქვენი ბრენდი აღრეული. ჩვენ ვიპოვით ძაფს და გეგმას მის გასასწორებლად."
        : "info@grapevine.ge, +995 599 495 574. Tell us where your brand is tangled. We'll find the thread and a plan to pull it straight.",
    ogTitle: locale === "ka" ? "კონტაქტი" : "Contact",
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
