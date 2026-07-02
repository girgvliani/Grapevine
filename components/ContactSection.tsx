"use client";

import Cta from "./Cta";
import { useLang } from "./LanguageProvider";

// Thin wrapper so the /contact route reuses the homepage contact form (Cta)
// while adding the page eyebrow and the top padding that clears the fixed nav.
export default function ContactSection() {
  const { t } = useLang();
  return <Cta eyebrow={t.cta.eyebrow} standalone />;
}
