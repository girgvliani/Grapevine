import type { Metadata } from "next";
import { Fredoka, Martian_Mono } from "next/font/google";
import "./offers.css";

// grapevine.ge/offers — the internal offer editor. Like /admin it lives
// outside app/[lang] and has its own root layout: no site Nav, cursor,
// cookie banner, analytics or support bubble. proxy.ts keeps /offers out of
// the Georgian /ka rewrite.

// The deck's body font (Fredoka Light) and a free stand-in for its heading
// face (TT Autonomous Mono, a commercial font). Georgian uses Mersad for
// headings and DejaVu Sans Mono for body text (the Georgian deck's look),
// both declared in offers.css.
const fredoka = Fredoka({ subsets: ["latin"], weight: ["300", "500"], variable: "--font-fredoka" });
// Variable font with a width axis: headings use it at 87.5% width, closer to
// the narrower TT Autonomous Mono in the deck.
const martian = Martian_Mono({ subsets: ["latin"], axes: ["wdth"], variable: "--font-martian" });

export const metadata: Metadata = {
  title: "Grapevine Offers",
  robots: { index: false, follow: false },
};

export default function OffersRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ka" className={`${fredoka.variable} ${martian.variable}`}>
      <body>{children}</body>
    </html>
  );
}
