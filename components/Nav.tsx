"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import logo from "./assets/logo.png";
import { useLang } from "./LanguageProvider";
import { LANGUAGES } from "@/lib/i18n";
import { useMediaQuery, MOBILE_QUERY } from "@/lib/useMediaQuery";

const LINKS = [
  { href: "#services", key: "services" as const },
  { href: "#work", key: "portfolio" as const },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, setLang, t } = useLang();
  const isMobile = useMediaQuery(MOBILE_QUERY);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Freeze page scroll while the mobile menu is open.
  useEffect(() => {
    const value = menuOpen ? "hidden" : "";
    document.body.style.overflow = value;
    document.documentElement.style.overflow = value;
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

  // Close the menu if the viewport grows past the mobile breakpoint.
  useEffect(() => {
    if (!isMobile) setMenuOpen(false);
  }, [isMobile]);

  const goTo = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  // Reusable language toggle pill. `compact` shrinks it for the mobile menu.
  const renderLangToggle = (compact = false) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.125rem",
        border: "1px solid rgba(255,255,255,0.25)",
        borderRadius: "100px",
        padding: compact ? "0.125rem" : "0.1875rem",
      }}
    >
      {LANGUAGES.map(({ code, label }) => {
        const active = lang === code;
        return (
          <button
            key={code}
            onClick={() => setLang(code)}
            style={{
              background: active ? "var(--white)" : "transparent",
              color: active ? "var(--dark)" : "var(--white)",
              border: "none",
              borderRadius: "100px",
              padding: compact ? "0.1875rem 0.5rem" : "0.25rem 0.625rem",
              fontSize: compact ? "0.5625rem" : "0.6875rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontFamily: "var(--font-primary)",
              opacity: active ? 1 : 0.7,
              transition: "background 0.2s, color 0.2s, opacity 0.2s",
            }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "1.25rem clamp(1.5rem, 5vw, 2.5rem)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          transition: "background 0.3s ease",
          background: scrolled ? "rgba(26, 5, 18, 0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
        }}
      >
        {/* Logo */}
        <Image src={logo} alt="Grapevine" style={{ width: "5.625rem", height: "auto" }} priority />

        {isMobile ? (
          /* Burger */
          <button
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
            style={{
              background: "none",
              border: "none",
              padding: "0.25rem",
              display: "flex",
              alignItems: "center",
            }}
          >
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M4 8H24M4 14H24M4 20H24" stroke="var(--white)" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        ) : (
          <>
            {/* Links */}
            <ul style={{ display: "flex", gap: "2.25rem", listStyle: "none" }}>
              {LINKS.map(({ href, key }) => (
                <li key={href}>
                  <a
                    href={href}
                    style={{
                      color: "var(--white)",
                      textDecoration: "none",
                      fontSize: "0.75rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      opacity: 0.75,
                      transition: "opacity 0.2s",
                      fontFamily: "var(--font-primary)",
                    }}
                    onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.opacity = "1")}
                    onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.opacity = "0.75")}
                  >
                    {t.nav[key]}
                  </a>
                </li>
              ))}
            </ul>

            {/* Right cluster — language toggle + CTA */}
            <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
              {renderLangToggle()}
              <button
                style={{
                  background: "var(--purple-dark)",
                  color: "var(--white)",
                  padding: "0.625rem 1.375rem",
                  borderRadius: "100px",
                  fontSize: "0.75rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  fontFamily: "var(--font-primary)",
                  border: "none",
                  fontWeight: 700,
                  transition: "transform 0.2s, background 0.2s",
                }}
                onMouseEnter={(e) => {
                  const btn = e.currentTarget;
                  btn.style.background = "#a030aa";
                  btn.style.transform = "scale(1.04)";
                }}
                onMouseLeave={(e) => {
                  const btn = e.currentTarget;
                  btn.style.background = "var(--purple-dark)";
                  btn.style.transform = "scale(1)";
                }}
                onClick={() => goTo("#cta")}
              >
                {t.nav.cta}
              </button>
            </div>
          </>
        )}
      </nav>

      {/* Mobile slide-out menu */}
      {isMobile && (
        <>
          {/* Backdrop — dims the page and closes the menu on tap */}
          <div
            aria-hidden
            onClick={() => setMenuOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 199,
              background: "rgba(0, 0, 0, 0.45)",
              opacity: menuOpen ? 1 : 0,
              pointerEvents: menuOpen ? "auto" : "none",
              transition: "opacity 0.35s ease",
            }}
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-hidden={!menuOpen}
            style={{
              position: "fixed",
              top: "0.5rem",
              right: "0.5rem",
              bottom: "0.5rem",
              width: "65%",
              zIndex: 200,
              background: "var(--dark)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "1.75rem",
              padding: "1.75rem 1.5rem 1.5rem",
              display: "flex",
              flexDirection: "column",
              transform: menuOpen ? "translateX(0)" : "translateX(110%)",
              opacity: menuOpen ? 1 : 0,
              pointerEvents: menuOpen ? "auto" : "none",
              transition:
                "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease",
            }}
          >
          {/* Close button */}
          <button
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            style={{
              position: "absolute",
              top: "1.25rem",
              right: "1.25rem",
              width: "2.75rem",
              height: "2.75rem",
              borderRadius: "50%",
              background: "var(--purple-dark)",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 3L13 13M13 3L3 13" stroke="var(--white)" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>

          {/* Links */}
          <nav style={{ marginTop: "5rem", display: "flex", flexDirection: "column" }}>
            {LINKS.map(({ href, key }) => (
              <button
                key={href}
                onClick={() => goTo(href)}
                style={{
                  background: "none",
                  border: "none",
                  textAlign: "left",
                  padding: "0 0 1rem",
                  marginBottom: "1.5rem",
                  borderBottom: "1px solid rgba(255,255,255,0.2)",
                  color: "var(--white)",
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  fontFamily: "var(--font-primary)",
                }}
              >
                {t.nav[key]}
              </button>
            ))}
          </nav>

          {/* Pushes language + CTA to the bottom */}
          <div style={{ flex: 1 }} />

          {/* Language toggle */}
          <div style={{ marginBottom: "1.25rem", display: "flex" }}>{renderLangToggle(true)}</div>

          {/* CTA */}
          <button
            onClick={() => goTo("#cta")}
            style={{
              width: "100%",
              background: "var(--purple-dark)",
              color: "var(--white)",
              padding: "1rem",
              borderRadius: "100px",
              fontSize: "0.875rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontFamily: "var(--font-primary)",
              border: "none",
              fontWeight: 700,
            }}
          >
            {t.nav.cta}
          </button>
          </div>
        </>
      )}
    </>
  );
}
