import type { Metadata } from "next";
import ServicesShowcase from "@/components/ServicesShowcase";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Grapevine — Services & Pricing",
  description:
    "Everything we do to untangle your brand and grow it — strategy, branding, social, SEO, campaigns, production, CRM, web and mobile.",
};

export default function ServicesPage() {
  return (
    <main>
      <ServicesShowcase />
      <Footer />
    </main>
  );
}
