// Bridges the editable content/services.json file into the app. The per-service
// detail copy (scraped/translated from the old grapevine.ge) lives in that JSON
// so it can be updated without touching code; this module gives it a type and a
// safe getter. Services with no copy yet (empty body) return null, letting the
// page fall back to the generic shared text.

import data from "@/content/services.json";
import type { Lang, ServiceSlug } from "./i18n";

export type ServiceDetail = {
  title: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  body: string;
  included: string[];
  price: string;
};

const services = data.services as Record<
  string,
  { ka: ServiceDetail; en: ServiceDetail }
>;

export function getServiceDetail(
  slug: ServiceSlug,
  lang: Lang
): ServiceDetail | null {
  const entry = services[slug];
  if (!entry) return null;
  const detail = entry[lang];
  // No body = no real copy yet (a net-new service) → let the caller fall back.
  if (!detail || !detail.body) return null;
  return detail;
}