import type { Metadata } from "next";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Grapevine — Let's Talk Mess / Contact",
  description:
    "Tell us where your brand is tangled. We'll find the thread and a plan to pull it straight.",
};

export default function ContactPage() {
  return (
    <main>
      <ContactSection />
      <Footer />
    </main>
  );
}
