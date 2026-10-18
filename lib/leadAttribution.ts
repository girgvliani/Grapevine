// Lead attribution: which ad or campaign link brought a visitor, so a contact
// form enquiry can be credited to it in the CRM (Reports → by campaign).
//
// Captured on arrival from the URL (utm_* parameters, Google gclid / Facebook
// fbclid), plus the landing page and the external site that referred them.
// It never leaves the browser on its own — /api/contact receives it only when
// the visitor chooses to send the form.
//
// Consent-aware storage:
//   - analytics consent granted → localStorage, kept 90 days, so an enquiry
//     sent on a later visit still counts;
//   - otherwise → sessionStorage, gone when the tab closes.
// A new campaign link replaces what's stored; a plain visit keeps it.

const KEY = "gv-lead-attribution";
const CONSENT_KEY = "gv-cookie-consent-v1";
const MAX_AGE_MS = 90 * 24 * 60 * 60 * 1000;
const PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"] as const;

type Stored = {
  at: number;
  params: Partial<Record<(typeof PARAMS)[number], string>>;
  landingPage: string;
  referrer: string;
};

/** Shape sent to /api/contact and on to the CRM. */
export type LeadAttribution = {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  gclid?: string;
  fbclid?: string;
  landingPage?: string;
  referrer?: string;
};

function consented(): boolean {
  try {
    return localStorage.getItem(CONSENT_KEY) === "granted";
  } catch {
    return false;
  }
}

function load(storage: Storage): Stored | null {
  try {
    const value = JSON.parse(storage.getItem(KEY) ?? "null") as Stored | null;
    if (!value || Date.now() - value.at > MAX_AGE_MS) return null;
    return value;
  } catch {
    return null;
  }
}

function save(value: Stored) {
  try {
    (consented() ? localStorage : sessionStorage).setItem(KEY, JSON.stringify(value));
  } catch {
    /* storage blocked — attribution just isn't recorded */
  }
}

/** Run once per page load (LeadAttributionCapture in the root layout). */
export function captureLeadAttribution() {
  const query = new URLSearchParams(window.location.search);
  const params: Stored["params"] = {};
  for (const name of PARAMS) {
    const value = query.get(name);
    if (value) params[name] = value.slice(0, 500);
  }
  const fromCampaign = Object.keys(params).length > 0;
  if (!fromCampaign && (load(sessionStorage) || load(localStorage))) return;

  const referrer =
    document.referrer && !document.referrer.startsWith(window.location.origin) ? document.referrer : "";
  save({ at: Date.now(), params, landingPage: window.location.href, referrer });
}

/** What to send with the contact form (empty object if nothing was recorded). */
export function readLeadAttribution(): LeadAttribution {
  const stored = load(sessionStorage) ?? load(localStorage);
  if (!stored) return {};
  const p = stored.params;
  return {
    utmSource: p.utm_source,
    utmMedium: p.utm_medium,
    utmCampaign: p.utm_campaign,
    utmTerm: p.utm_term,
    utmContent: p.utm_content,
    gclid: p.gclid,
    fbclid: p.fbclid,
    landingPage: stored.landingPage || undefined,
    referrer: stored.referrer || undefined,
  };
}

/** Called by the cookie banner when the visitor changes their choice. */
export function onConsentChange(choice: "granted" | "denied") {
  try {
    if (choice === "granted") {
      // Keep this visit's attribution for later visits too.
      const current = load(sessionStorage);
      if (current) localStorage.setItem(KEY, JSON.stringify(current));
    } else {
      // Withdrawn: drop the long-lived copy; this visit's copy stays session-only.
      const persisted = load(localStorage);
      localStorage.removeItem(KEY);
      if (persisted && !load(sessionStorage)) sessionStorage.setItem(KEY, JSON.stringify(persisted));
    }
  } catch {
    /* storage blocked */
  }
}
