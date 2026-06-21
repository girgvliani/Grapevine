"use client";

import Image from "next/image";
import birdImg from "./assets/Component 9.png";
import logoBlack from "./assets/logoblack.png";
import { useLang } from "./LanguageProvider";
import { useMediaQuery, MOBILE_QUERY } from "@/lib/useMediaQuery";

export default function Footer() {
  const { t } = useLang();
  const isMobile = useMediaQuery(MOBILE_QUERY);

  const logo = (
    <Image src={logoBlack} alt="Grapevine" style={{ width: "5.625rem", height: "auto" }} />
  );

  const tagline = (
    <h3
      style={{
        fontSize: isMobile ? "1.125rem" : "clamp(1.125rem, 2.5vw, 1.75rem)",
        fontWeight: 900,
        textTransform: "uppercase",
        letterSpacing: "-0.01em",
        color: "var(--dark)",
        fontFamily: "var(--font-heading)",
        lineHeight: 1.1,
        maxWidth: "16.25rem",
        textAlign: isMobile ? "right" : "left",
      }}
    >
      {t.footer.taglineLine1}
      <br />
      {t.footer.taglineLine2}
    </h3>
  );

  const quickLinks = (
    <div>
      <div
        style={{
          fontSize: "0.6875rem",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "rgba(26,5,18,0.45)",
          fontFamily: "var(--font-primary)",
          marginBottom: "1rem",
        }}
      >
        {t.footer.quickLinks}
      </div>
      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.625rem" }}>
        {[
          { label: t.footer.links.services, href: "#services" },
          { label: t.footer.links.portfolio, href: "#work" },
          { label: t.footer.links.contact, href: "#cta" },
        ].map(({ label, href }) => (
          <li key={href}>
            <a
              href={href}
              style={{
                fontSize: "0.8125rem",
                color: "var(--dark)",
                fontFamily: "var(--font-primary)",
                textDecoration: "none",
                opacity: 0.7,
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.opacity = "1")}
              onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.opacity = "0.7")}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );

  const button = (
    <button
      style={{
        background: "var(--dark)",
        color: "var(--cream)",
        padding: isMobile ? "0.875rem 1.75rem" : "0.75rem 1.375rem",
        borderRadius: "100px",
        fontSize: "0.75rem",
        fontWeight: 700,
        letterSpacing: "0.06em",
        fontFamily: "var(--font-primary)",
        border: "none",
        cursor: "none",
        whiteSpace: "nowrap",
        transition: "background 0.2s",
      }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "var(--purple-dark)")}
      onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "var(--dark)")}
      onClick={() => document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" })}
    >
      {t.footer.button}
    </button>
  );

  const socials = (
    <div style={{ display: "flex", gap: "0.5rem" }}>
      {[
        { label: "f", href: "#" },
        { label: "ig", href: "#" },
        { label: "in", href: "#" },
      ].map(({ label, href }) => (
        <a
          key={label}
          href={href}
          style={{
            width: "2.25rem",
            height: "2.25rem",
            background: "var(--dark)",
            borderRadius: "0.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--cream)",
            fontSize: "0.6875rem",
            fontWeight: 700,
            fontFamily: "var(--font-primary)",
            textDecoration: "none",
            transition: "background 0.2s",
            cursor: "none",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "var(--purple-dark)")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "var(--dark)")}
        >
          {label}
        </a>
      ))}
    </div>
  );

  return (
    <footer
      style={{
        background: "var(--cream)",
        position: "relative",
        overflow: "hidden",
        borderTop: "1px solid rgba(26,5,18,0.1)",
      }}
    >
      {/* Faded bird — decorative */}
      <div
        style={{
          position: "absolute",
          right: isMobile ? "-1rem" : "12rem",
          top: isMobile ? "7.5rem" : "3.5rem",
          width: isMobile ? "12rem" : "13.75rem",
          height: isMobile ? "12rem" : "13.75rem",
          opacity: 0.1,
          pointerEvents: "none",
        }}
      >
        <Image src={birdImg} alt="" fill style={{ objectFit: "contain", objectPosition: "right top" }} />
      </div>

      {/* Main content */}
      {isMobile ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "2.5rem",
            padding: "3.25rem clamp(1.5rem, 5vw, 3rem) 2.5rem",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: "1rem",
            }}
          >
            {logo}
            {tagline}
          </div>
          {quickLinks}
          {button}
          {socials}
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            padding: "3.25rem clamp(1.5rem, 5vw, 3rem) 2.5rem",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {logo}
            {tagline}
          </div>
          {quickLinks}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "1rem" }}>
            {button}
            {socials}
          </div>
        </div>
      )}

      {/* Bottom bar */}
      <div
        style={{
          borderTop: "1px solid rgba(26,5,18,0.1)",
          padding: "1rem clamp(1.5rem, 5vw, 3rem)",
          textAlign: "center",
          fontSize: "0.6875rem",
          color: "rgba(26,5,18,0.4)",
          fontFamily: "var(--font-primary)",
          letterSpacing: "0.08em",
          position: "relative",
          zIndex: 1,
        }}
      >
        {t.footer.copyright}
      </div>
    </footer>
  );
}
