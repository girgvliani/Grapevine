// JSON-LD graphs, rendered by <JsonLd>. These let search engines resolve
// Grapevine as one entity across both locales (every page reuses the same
// `@id` rather than restating the organisation) and understand what each
// service page actually offers.

import { SITE_URL, absoluteUrl, localizedHref, type Locale } from "./routing";
import { translations, type ServiceSlug } from "./i18n";
import { SITE_NAME } from "./seo";

// Stable node ids, so `provider`/`publisher` can point at the org by reference.
const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const LANG_TAG: Record<Locale, string> = { ka: "ka-GE", en: "en-US" };

// The `sameAs` signals that tie this domain to the brand's public profiles.
// Keep in sync with the links in components/Footer.tsx and BehanceLink.tsx.
const SOCIAL_PROFILES = [
  "https://www.facebook.com/Grapevinegeo",
  "https://www.instagram.com/grapevine.agency/",
  "https://www.linkedin.com/company/grapevine-georgia/",
  "https://www.behance.net/grapevineagency",
];

function organization(locale: Locale) {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE_NAME,
    url: absoluteUrl(localizedHref("/", locale)),
    description: translations[locale].hero.description,
    foundingDate: "2014",
    logo: { "@type": "ImageObject", url: absoluteUrl("/icon.png") },
    sameAs: SOCIAL_PROFILES,
    telephone: "+995599495574",
    // Address still deliberately omitted: a guessed NAP is worse than none,
    // since inconsistent details actively hurt local ranking. Once the real
    // one is known, add `address` and change @type to "ProfessionalService"
    // to become eligible for local results.
  };
}

function website(locale: Locale) {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: absoluteUrl(localizedHref("/", locale)),
    name: SITE_NAME,
    publisher: { "@id": ORG_ID },
    inLanguage: LANG_TAG[locale],
  };
}

function graph(nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}

// Site-wide identity — emitted once, from the root layout.
export function siteSchema(locale: Locale) {
  return graph([organization(locale), website(locale)]);
}

// A single service page: what it is, who provides it, and where it sits.
export function serviceSchema({
  slug,
  locale,
  name,
  description,
}: {
  slug: ServiceSlug;
  locale: Locale;
  name: string;
  description: string;
}) {
  const path = `/services/${slug}`;
  const url = absoluteUrl(localizedHref(path, locale));

  const trail = [
    { name: SITE_NAME, path: "/" },
    { name: locale === "ka" ? "სერვისები" : "Services", path: "/services" },
    { name, path },
  ];

  return graph([
    {
      "@type": "Service",
      "@id": `${url}#service`,
      name,
      description,
      serviceType: name,
      url,
      provider: { "@id": ORG_ID },
      inLanguage: LANG_TAG[locale],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: trail.map((crumb, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: crumb.name,
        item: absoluteUrl(localizedHref(crumb.path, locale)),
      })),
    },
  ]);
}
