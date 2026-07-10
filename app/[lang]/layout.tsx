import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import "../globals.css";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import { LanguageProvider } from "@/components/LanguageProvider";
import { LANGUAGES, type Lang } from "@/lib/i18n";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space",
});

// Body / UI font (--font-primary via --font-mono). OFL, free for commercial use.
const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Grapevine — We Untangle The Mess",
  description:
    "Grapevine finds the core thread of your brand and helps you grow it — free of chaos, full of direction.",
};

// Pre-render both locales at build time.
export function generateStaticParams() {
  return LANGUAGES.map(({ code }) => ({ lang: code }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  // Anything other than a supported locale 404s (the proxy only ever routes
  // valid locales here, but a hand-typed /fr/... would fall through to this).
  if (lang !== "en" && lang !== "ka") notFound();

  return (
    <html lang={lang} className={`${spaceGrotesk.variable} ${spaceMono.variable}`}>
      <body>
        <LanguageProvider lang={lang as Lang}>
          <div id="progress" />
          <Cursor />
          <Nav />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
