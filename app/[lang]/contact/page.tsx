import type { Metadata } from "next";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { isLocale, pageAlternates } from "@/lib/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : "ka";
  return {
    title: locale === "ka" ? "კონტაქტი — Grapevine" : "Contact — Grapevine",
    description:
      locale === "ka"
        ? "გვითხარით, სად არის თქვენი ბრენდი აღრეული. ჩვენ ვიპოვით ძაფს და გეგმას მის გასასწორებლად."
        : "Tell us where your brand is tangled. We'll find the thread and a plan to pull it straight.",
    alternates: pageAlternates("/contact", locale),
  };
}

export default function ContactPage() {
  return (
    <main>
      <ContactSection />
      <Footer />
    </main>
  );
}
