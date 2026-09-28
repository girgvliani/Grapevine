"use client";

import type { CSSProperties } from "react";
import { useLang } from "./LanguageProvider";
import { openCookieSettings } from "./CookieConsent";
import { mtavruli } from "@/lib/i18n";
import { PRIVACY, type PolicyBlock } from "@/content/privacy";

// Client component (like the other pages) so the header language toggle swaps
// the text in place. Copy lives in content/privacy.ts.

const PAD_X = "clamp(1.5rem,7.6vw,6.875rem)";
const text: CSSProperties = {
  fontSize: "0.9375rem",
  lineHeight: 1.75,
  color: "rgba(26,5,18,0.82)",
  fontFamily: "var(--font-primary)",
};
const cell: CSSProperties = {
  padding: "0.625rem 0.75rem",
  borderBottom: "1px solid rgba(26,5,18,0.12)",
  textAlign: "left",
  verticalAlign: "top",
  fontSize: "0.8125rem",
  lineHeight: 1.5,
};

export default function PrivacyPolicy() {
  const { lang } = useLang();
  const policy = PRIVACY[lang];

  function renderBlock(block: PolicyBlock, key: number) {
    switch (block.type) {
      case "p":
        return (
          <p key={key} style={{ ...text, marginBottom: "1rem" }}>
            {block.text}
          </p>
        );
      case "list":
        return (
          <ul key={key} style={{ ...text, paddingLeft: "1.25rem", marginBottom: "1rem" }}>
            {block.items.map((item, i) => (
              <li key={i} style={{ marginBottom: "0.375rem" }}>
                {item}
              </li>
            ))}
          </ul>
        );
      case "cookies": {
        const h = policy.cookieTable;
        return (
          <div key={key} style={{ overflowX: "auto", margin: "0.5rem 0 1.25rem" }}>
            <table style={{ width: "100%", minWidth: "34rem", borderCollapse: "collapse", fontFamily: "var(--font-primary)", color: "var(--dark)" }}>
              <thead>
                <tr>
                  {[h.name, h.provider, h.purpose, h.duration, h.consent].map((label) => (
                    <th key={label} style={{ ...cell, fontWeight: 700, fontSize: "0.6875rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(26,5,18,0.55)", borderBottom: "1.5px solid rgba(26,5,18,0.25)" }}>
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {policy.cookies.map((row) => (
                  <tr key={row.name}>
                    <td style={{ ...cell, fontWeight: 700, whiteSpace: "nowrap" }}>{row.name}</td>
                    <td style={cell}>{row.provider}</td>
                    <td style={cell}>{row.purpose}</td>
                    <td style={cell}>{row.duration}</td>
                    <td style={cell}>{row.needsConsent ? h.yes : h.no}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      case "settingsButton":
        return (
          <button
            key={key}
            type="button"
            onClick={openCookieSettings}
            style={{
              padding: "0.75rem 1.5rem",
              borderRadius: "100px",
              border: "none",
              background: "var(--purple-dark)",
              color: "var(--white)",
              fontSize: "0.8125rem",
              fontWeight: 700,
              letterSpacing: "0.06em",
              fontFamily: "var(--font-primary)",
              marginBottom: "0.5rem",
            }}
          >
            {policy.settingsButton}
          </button>
        );
    }
  }

  return (
    <main style={{ background: "var(--dark)", color: "var(--white)" }}>
      <header style={{ padding: `11rem ${PAD_X} 3rem` }}>
        <div className="container-cap">
          <div
            style={{
              color: "var(--orange)",
              fontSize: "0.75rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              marginBottom: "1.5rem",
              fontFamily: "var(--font-primary)",
            }}
          >
            {policy.eyebrow}
          </div>
          <h1
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 900,
              fontSize: "clamp(2.25rem,5.5vw,4.5rem)",
              lineHeight: 1,
              letterSpacing: "-0.02em",
              color: "var(--orange)",
              maxWidth: "60rem",
            }}
          >
            {mtavruli(policy.title)}
          </h1>
          <p style={{ marginTop: "1.5rem", fontSize: "0.8125rem", color: "rgba(255,250,236,0.55)", fontFamily: "var(--font-primary)" }}>
            {policy.updatedLabel} {policy.updated}
          </p>
        </div>
      </header>

      <div style={{ padding: `0 ${PAD_X} 6rem` }}>
        <article
          className="container-cap"
          style={{
            background: "var(--cream)",
            color: "var(--dark)",
            borderRadius: "1.25rem",
            padding: "clamp(1.5rem, 4vw, 3.5rem)",
          }}
        >
          <div style={{ maxWidth: "46rem" }}>
            <p style={{ ...text, fontSize: "1rem", marginBottom: "2rem" }}>{policy.intro}</p>
            {policy.sections.map((section) => (
              <section key={section.heading} style={{ marginBottom: "2rem" }}>
                <h2
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 900,
                    fontSize: "clamp(1.25rem, 2.4vw, 1.625rem)",
                    letterSpacing: "-0.01em",
                    lineHeight: 1.2,
                    marginBottom: "0.875rem",
                  }}
                >
                  {section.heading}
                </h2>
                {section.blocks.map(renderBlock)}
              </section>
            ))}
          </div>
        </article>
      </div>
    </main>
  );
}
