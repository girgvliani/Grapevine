import type { Metadata } from "next";
import PortfolioShowcase from "@/components/PortfolioShowcase";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Grapevine — Portfolio",
  description:
    "A selection of brands we've untangled and grown — campaigns, branding, social, SEO, web and strategy.",
};

export default function PortfolioPage() {
  return (
    <main>
      <PortfolioShowcase />
      <Footer />
    </main>
  );
}
