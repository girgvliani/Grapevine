"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { useLang } from "./LanguageProvider";
import { useMediaQuery, MOBILE_QUERY } from "@/lib/useMediaQuery";
import { localizedHref } from "@/lib/routing";

// Cookie consent, "basic" mode: Google Analytics / Tag Manager are not loaded
// AT ALL until the visitor accepts — no script, no cookies, no pings. Rejecting
// is one click and as prominent as accepting. The footer's "Cookie settings"
// link reopens the banner via OPEN_EVENT.
//
// Bump STORAGE_KEY's version if what we track changes (e.g. marketing pixels
// get added to GTM) — everyone is then asked again.

const STORAGE_KEY = "gv-cookie-consent-v1";
const OPEN_EVENT = "gv:open-cookie-settings";

type Choice = "granted" | "denied";

export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

function readChoice(): Choice | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null; // storage blocked — treat as "not asked yet"
  }
}

// Google's cookies (_ga, _ga_<id>, _gid, _gat…, _gcl_…) are set on the
// registrable domain (.grapevine.ge), so clear them there and on the host.
function clearGoogleCookies() {
  const host = window.location.hostname;
  const domains = ["", host, `.${host.split(".").slice(-2).join(".")}`];
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=")[0].trim();
    if (!/^(_ga|_gid|_gat|_gcl)/.test(name)) continue;
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ""}`;
    }
  }
}

export default function CookieConsent({ gaId, gtmId }: { gaId?: string; gtmId?: string }) {
  const { t, lang } = useLang();
  const c = t.cookieConsent;
  const isMobile = useMediaQuery(MOBILE_QUERY);
  // undefined until mounted: the server can't know the choice, and rendering
  // the banner during SSR would flash it for people who already chose.
  const [choice, setChoice] = useState<Choice | null | undefined>(undefined);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const stored = readChoice();
    setChoice(stored);
    setOpen(stored === null);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, reopen);
    return () => window.removeEventListener(OPEN_EVENT, reopen);
  }, []);

  function decide(next: Choice) {
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage blocked — the choice still applies for this page view */
    }
    setOpen(false);
    if (next === "denied" && choice === "granted") {
      // Already-running Google scripts can't be unloaded, so drop their
      // cookies and reload into a clean, analytics-free page.
      clearGoogleCookies();
      window.location.reload();
      return;
    }
    setChoice(next);
  }

  const tracking = choice === "granted" && (
    <>
      {gtmId && <GoogleTagManager gtmId={gtmId} />}
      {gaId && <GoogleAnalytics gaId={gaId} />}
    </>
  );

  if (!open) return tracking || null;

  const button = (primary: boolean) => ({
    flex: "1 1 0",
    padding: "0.75rem 1rem",
    borderRadius: "100px",
    fontSize: "0.75rem",
    fontWeight: 700,
    letterSpacing: "0.06em",
    fontFamily: "var(--font-primary)",
    border: "1.5px solid var(--purple-dark)",
    background: primary ? "var(--purple-dark)" : "transparent",
    color: primary ? "var(--white)" : "var(--purple-dark)",
  });

  return (
    <>
      {tracking}
      <div
        role="dialog"
        aria-modal="false"
        aria-labelledby="cookie-consent-title"
        aria-describedby="cookie-consent-text"
        style={{
          position: "fixed",
          left: isMobile ? 12 : 24,
          right: isMobile ? 12 : "auto",
          // On phones, sit above the support bubble (bottom-right, ~58px tall)
          // rather than covering it.
          bottom: isMobile ? 86 : 24,
          maxWidth: isMobile ? "none" : "24rem",
          zIndex: 9995,
          background: "var(--cream)",
          color: "var(--dark)",
          borderRadius: "1.25rem",
          padding: "1.25rem 1.25rem 1.125rem",
          boxShadow: "0 1.25rem 3rem -1rem rgba(16,3,10,0.55)",
          border: "1px solid rgba(26,5,18,0.1)",
          fontFamily: "var(--font-primary)",
          animation: "svcRise 0.45s cubic-bezier(0.16,1,0.3,1) both",
        }}
      >
        <div
          id="cookie-consent-title"
          style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "1.0625rem", marginBottom: "0.5rem" }}
        >
          {c.title}
        </div>
        <p id="cookie-consent-text" style={{ fontSize: "0.8125rem", lineHeight: 1.6, color: "rgba(26,5,18,0.75)" }}>
          {c.text}{" "}
          <Link
            href={localizedHref("/privacy", lang)}
            style={{ color: "var(--purple-dark)", fontWeight: 700, textDecoration: "underline", textUnderlineOffset: "0.2em" }}
          >
            {c.learnMore}
          </Link>
        </p>
        <div style={{ display: "flex", gap: "0.625rem", marginTop: "1rem" }}>
          <button type="button" onClick={() => decide("denied")} style={button(false)}>
            {c.reject}
          </button>
          <button type="button" onClick={() => decide("granted")} style={button(true)}>
            {c.accept}
          </button>
        </div>
      </div>
    </>
  );
}
