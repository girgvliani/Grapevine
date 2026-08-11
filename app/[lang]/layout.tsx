import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import "../globals.css";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import SupportWidget from "@/components/SupportWidget";
import JsonLd from "@/components/JsonLd";
import { LanguageProvider } from "@/components/LanguageProvider";
import { LANGUAGES, translations, type Lang } from "@/lib/i18n";
import { isLocale } from "@/lib/routing";
import { pageMetadata } from "@/lib/seo";
import { siteSchema } from "@/lib/structuredData";

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

// Locale-aware defaults. Each page may override title/description/alternates;
// the home page ("/") inherits the alternates set here.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : "ka";
  const t = translations[locale];

  return pageMetadata({
    internalPath: "/",
    locale,
    title:
      locale === "ka"
        ? "Grapevine — მარკეტინგ სააგენტო"
        : "Grapevine — We Untangle The Mess",
    description: t.hero.description,
  });
}

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

  // Google Tag Manager — only loads when NEXT_PUBLIC_GTM_ID is set, so no
  // tracking fires until you add the real container ID to the environment.
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  // Google Analytics (GA4, gtag.js) — same opt-in-via-env pattern as GTM above.
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang={lang} className={`${spaceGrotesk.variable} ${spaceMono.variable}`}>
      {gtmId && <GoogleTagManager gtmId={gtmId} />}
      {gaId && <GoogleAnalytics gaId={gaId} />}
      <body>
        {/* Site-wide identity graph (Organization + WebSite). Service pages add
            their own Service/BreadcrumbList nodes on top of this. */}
        <JsonLd data={siteSchema(lang)} />
        <LanguageProvider lang={lang as Lang}>
          <div id="progress" />
          <Cursor />
          <Nav />
          {children}
          <SupportWidget />
        </LanguageProvider>
      </body>
    </html>
  );
}
