"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { translations, type Lang, type Translation } from "@/lib/i18n";

// Mirrors the cookie the proxy reads to pick a locale for unprefixed URLs.
const COOKIE_KEY = "grapevine_lang";

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Translation;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

// The [lang] route segment (passed by app/[lang]/layout.tsx) seeds the initial
// language on load. After that, switching is a pure client-side text swap: both
// locales are already bundled, so we flip React state and rewrite only the URL's
// locale segment (via history.replaceState — no navigation, no reload). The page
// stays exactly where it is and only the text changes. A direct visit or reload
// still server-renders the correct locale from the URL, so SEO is unaffected.
export function LanguageProvider({
  lang: initialLang,
  children,
}: {
  lang: Lang;
  children: React.ReactNode;
}) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  // Follow the route's locale if a real navigation lands on a different one.
  useEffect(() => {
    setLangState(initialLang);
  }, [initialLang]);

  const setLang = (next: Lang) => {
    if (next === lang) return;

    // Remember the choice so the proxy honours it on the next unprefixed visit.
    try {
      document.cookie = `${COOKIE_KEY}=${next};path=/;max-age=31536000;samesite=lax`;
    } catch {
      /* ignore write failures (private mode, etc.) */
    }

    // Rewrite only the leading locale segment in the URL bar — no navigation,
    // no reload, no scroll reset. Next keeps usePathname in sync with this.
    const { pathname, search, hash } = window.location;
    const rest = pathname.replace(/^\/(en|ka)(?=\/|$)/, "");
    window.history.replaceState(null, "", `/${next}${rest}${search}${hash}`);

    // Keep the document language in sync for a11y / screen readers.
    document.documentElement.lang = next;

    setLangState(next);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within a LanguageProvider");
  return ctx;
}