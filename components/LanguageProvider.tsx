"use client";

import { createContext, useContext } from "react";
import { usePathname, useRouter } from "next/navigation";
import { translations, type Lang, type Translation } from "@/lib/i18n";

// Mirrors the cookie the proxy reads to pick a locale for unprefixed URLs.
const COOKIE_KEY = "grapevine_lang";

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Translation;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

// `lang` is the source of truth and comes from the [lang] route segment
// (passed down by app/[lang]/layout.tsx), so the URL always matches the UI.
export function LanguageProvider({
  lang,
  children,
}: {
  lang: Lang;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const setLang = (next: Lang) => {
    if (next === lang) return;
    // Remember the choice so the proxy honours it on the next unprefixed visit.
    try {
      document.cookie = `${COOKIE_KEY}=${next};path=/;max-age=31536000;samesite=lax`;
    } catch {
      /* ignore write failures (private mode, etc.) */
    }
    // Swap the leading locale segment, keeping the rest of the path.
    const rest = pathname.replace(/^\/(en|ka)(?=\/|$)/, "");
    router.push(`/${next}${rest || ""}`);
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
