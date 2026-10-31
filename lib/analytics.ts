// Custom events for Google Tag Manager (GTM-NFQ4XF79). GTM reads
// window.dataLayer; the GA4 and Google Ads tags in the container are
// triggered by these event names, so the names are a contract with the
// advertiser's setup and must not change without telling them.
//
// Pushing is safe before consent or when GTM never loads: dataLayer is just
// an array until the container script picks it up, and nothing is sent to
// Google unless the visitor accepted cookies (CookieConsent).

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export type AnalyticsEvent =
  // Contact form accepted by /api/contact (never on click or captcha error).
  | { event: "lead_submitted"; form_location: "contact_page" | "cta_block"; page_path: string }
  // /api/seo-audit started streaming results for a URL.
  | { event: "seo_audit_started"; page_path: string };

export function trackEvent(payload: AnalyticsEvent) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
}
