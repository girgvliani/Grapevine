// JSON-LD graphs, rendered by <JsonLd>. These let search engines resolve
// Grapevine as one entity across both locales (every page reuses the same
// `@id` rather than restating the organisation) and understand what each
// service page actually offers.

import { SITE_URL, absoluteUrl, localizedHref, type Locale } from "./routing";
import { translations, type ServiceSlug } from "./i18n";
import { SITE_NAME } from "./seo";
import { DEFAULT_AUTHOR } from "./blog";

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

// Business facts that must read identically on the site, on the Google
// Business Profile and in every directory (SEO review, 26-31 Oct 2026).
// Hours per the GBP: 10:00-18:00. Weekdays are an assumption until the
// advertiser confirms the days on the profile.
export const BUSINESS = {
  telephone: "+995599495574",
  email: "info@grapevine.ge",
  openingHours: { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "10:00", closes: "18:00" },
  areaServed: "Tbilisi",
  // No office address is published (confirmed by the client, 31 Oct 2026);
  // the GBP lists a service area instead. Add `address` here when one exists.
} as const;

function organization(locale: Locale) {
  return {
    // ProfessionalService is a LocalBusiness subtype, which is what Google
    // Maps and "near me" searches read; Organization keeps the entity link
    // that every page's publisher/provider points at.
    "@type": ["Organization", "ProfessionalService"],
    "@id": ORG_ID,
    name: SITE_NAME,
    url: absoluteUrl(localizedHref("/", locale)),
    description: translations[locale].hero.description,
    foundingDate: "2014",
    logo: { "@type": "ImageObject", url: absoluteUrl("/icon.png") },
    image: absoluteUrl("/icon.png"),
    sameAs: SOCIAL_PROFILES,
    telephone: BUSINESS.telephone,
    email: BUSINESS.email,
    areaServed: { "@type": "City", name: BUSINESS.areaServed },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: BUSINESS.openingHours.days,
        opens: BUSINESS.openingHours.opens,
        closes: BUSINESS.openingHours.closes,
      },
    ],
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
  faq,
}: {
  slug: ServiceSlug;
  locale: Locale;
  name: string;
  description: string;
  // The page's visible FAQ block, when the service has one. Emitted as a
  // FAQPage node so the questions can appear under the result in Google.
  faq?: { q: string; a: string }[];
}) {
  const path = `/services/${slug}`;
  const url = absoluteUrl(localizedHref(path, locale));

  const trail = [
    { name: SITE_NAME, path: "/" },
    { name: locale === "ka" ? "სერვისები" : "Services", path: "/services" },
    { name, path },
  ];

  const faqNode =
    faq && faq.length > 0
      ? [
          {
            "@type": "FAQPage",
            "@id": `${url}#faq`,
            inLanguage: LANG_TAG[locale],
            mainEntity: faq.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: { "@type": "Answer", text: item.a },
            })),
          },
        ]
      : [];

  return graph([
    ...faqNode,
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

// A blog post. `BlogPosting` (not the bare `Article`) is the more specific
// schema.org type for exactly this kind of dated, single-author entry.
export function articleSchema({
  slug,
  locale,
  title,
  description,
  author,
  createdAt,
  updatedAt,
}: {
  slug: string;
  locale: Locale;
  title: string;
  description: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}) {
  const path = `/blog/${slug}`;
  const url = absoluteUrl(localizedHref(path, locale));

  // Nobody's attributed this one to a real person yet — represent the byline
  // as the organization itself rather than mislabeling a team credit as a
  // schema.org Person, which is specifically what Google's authorship
  // guidance says to avoid.
  const authorNode =
    author === DEFAULT_AUTHOR
      ? { "@type": "Organization", "@id": ORG_ID }
      : { "@type": "Person", name: author };

  return graph([
    {
      "@type": "BlogPosting",
      "@id": `${url}#article`,
      mainEntityOfPage: url,
      url,
      headline: title,
      description,
      author: authorNode,
      publisher: { "@id": ORG_ID },
      datePublished: createdAt,
      dateModified: updatedAt,
      inLanguage: LANG_TAG[locale],
    },
  ]);
}
