"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import logo from "./assets/logopurple.svg";
import logoBlack from "./assets/logoblack.svg";
import { useLang } from "./LanguageProvider";
import { LANGUAGES, mtavruli } from "@/lib/i18n";
import { localizedHref, stripLocale } from "@/lib/routing";
import { useMediaQuery, MOBILE_QUERY } from "@/lib/useMediaQuery";

const LINKS = [
  { href: "/services", key: "services" as const },
  { href: "/portfolio", key: "portfolio" as const },
  { href: "/blog", key: "blog" as const },
];

// Routes with a light (cream) background need dark nav text + black logo.
const LIGHT_ROUTES = ["/contact"];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, setLang, t } = useLang();
  const isMobile = useMediaQuery(MOBILE_QUERY);
  const pathname = usePathname();
  const router = useRouter();
  // Path without its leading locale segment, so route checks are locale-agnostic.
  const routePath = stripLocale(pathname);
  const light = LIGHT_ROUTES.includes(routePath);
  // Localize internal route links (bare for ka, /en-prefixed for en); leave
  // in-page hashes untouched.
  const withLocale = (href: string) => localizedHref(href, lang);

  // Colour tokens that flip between the dark (default) and light page themes.
  const fg = light ? "var(--dark)" : "var(--white)";
  const toggleBorder = light ? "rgba(26,5,18,0.25)" : "rgba(255,255,255,0.25)";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Freeze the page behind the open mobile menu.
  //
  // `overflow: hidden` on body/html is not enough — iOS Safari keeps touch-
  // scrolling the page regardless. Pinning the body with `position: fixed` at a
  // negative top offset is what actually holds it, and we restore the exact
  // scroll position on close so the page doesn't jump back to the top.
  //
  // The same effect flags <body>, which is how SupportWidget knows to get out of
  // the way (see the `[data-menu-open]` rule in globals.css) — it renders as a
  // sibling of the menu at a much higher z-index, so it would otherwise float
  // on top of the panel.
  useEffect(() => {
    if (!menuOpen) return;

    const body = document.body;
    const scrollY = window.scrollY;
    const previous = {
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      overflow: body.style.overflow,
    };

    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    body.style.overflow = "hidden";
    body.dataset.menuOpen = "true";

    return () => {
      body.style.position = previous.position;
      body.style.top = previous.top;
      body.style.width = previous.width;
      body.style.overflow = previous.overflow;
      delete body.dataset.menuOpen;
      // Instant, not smooth — the scroll-jacked sections read window.scrollY.
      window.scrollTo(0, scrollY);
    };
  }, [menuOpen]);

  // Close the menu if the viewport grows past the mobile breakpoint.
  useEffect(() => {
    if (!isMobile) setMenuOpen(false);
  }, [isMobile]);

  const goTo = (href: string) => {
    setMenuOpen(false);
    // Route paths navigate client-side, which keeps the layout — and the support
    // chat iframe living in it — mounted across the navigation. In-page anchors
    // smooth-scroll instead.
    if (href.startsWith("/")) {
      router.push(href);
      return;
    }
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  // Reusable language toggle pill. `compact` shrinks it for the mobile menu.
  const renderLangToggle = (compact = false) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.125rem",
        border: `1px solid ${toggleBorder}`,
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
              background: active ? (light ? "var(--dark)" : "var(--white)") : "transparent",
              color: active ? (light ? "var(--cream)" : "var(--dark)") : fg,
              border: "none",
              borderRadius: "100px",
              padding: compact ? "0.1875rem 0.5rem" : "0.25rem 0.625rem",
              fontSize: compact ? "0.5625rem" : "0.6875rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              fontFamily: "var(--font-primary)",
              lineHeight: 1,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: active ? 1 : 0.7,
              transition: "background 0.2s, color 0.2s, opacity 0.2s",
            }}
          >
            <span style={{ position: "relative", top: "0.1em" }}>{mtavruli(label)}</span>
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
          padding: "0.84rem clamp(1.5rem, 5vw, 2.5rem)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          transition: "background 0.3s ease",
          background: scrolled
            ? light
              ? "rgba(255, 250, 236, 0.85)"
              : "rgba(26, 5, 18, 0.85)"
            : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
        }}
      >
        {/* Logo — returns to the home page */}
        <Link href={withLocale("/")} aria-label="Grapevine — home" style={{ display: "inline-flex" }}>
          <Image src={light ? logoBlack : logo} alt="Grapevine" style={{ width: "7.5rem", height: "auto" }} loading="eager" />
        </Link>

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
              <path d="M4 8H24M4 14H24M4 20H24" stroke={fg} strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        ) : (
          <>
            {/* Links — centred on wide screens, normal flow below 889px. The
                centre↔left switch lives in CSS (.nav-links) so it applies on the
                first paint and doesn't jump on reload. */}
            <ul className="nav-links">
              {LINKS.map(({ href, key }, i) => {
                const lastIdx = LINKS.length - 1;
                // Edge links (Services, Blog) each carry a hidden copy of the
                // *other* edge's word, stacked in the same grid cell. That
                // makes both slots reserve exactly max(width(Services),
                // width(Blog)) — identical on both sides, in either language,
                // with no hand-guessed width — so Portfolio (the middle link)
                // always lands at the true centre instead of drifting toward
                // whichever word happens to be shorter.
                const mirrorKey = i === 0 ? LINKS[lastIdx].key : i === lastIdx ? LINKS[0].key : null;
                const textStyle = {
                  fontSize: "0.75rem",
                  letterSpacing: "0.12em",
                  fontFamily: "var(--font-primary)",
                } as const;
                return (
                  // Every item shares the same grid box model — mirror or not —
                  // so Portfolio's text sits at exactly the same vertical
                  // position as Services/Blog instead of following plain
                  // inline-flow rules that render a hair off from the grid items.
                  <li key={href} style={{ display: "grid", alignItems: "center" }}>
                    <Link
                      href={withLocale(href)}
                      style={{
                        ...textStyle,
                        gridArea: "1 / 1",
                        justifySelf: i === 0 ? "end" : i === lastIdx ? "start" : undefined,
                        color: fg,
                        textDecoration: "none",
                        opacity: 0.75,
                        transition: "opacity 0.2s",
                      }}
                      onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.opacity = "1")}
                      onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.opacity = "0.75")}
                    >
                      {mtavruli(t.nav[key])}
                    </Link>
                    {mirrorKey && (
                      <span aria-hidden="true" style={{ ...textStyle, gridArea: "1 / 1", visibility: "hidden" }}>
                        {mtavruli(t.nav[mirrorKey])}
                      </span>
                    )}
                  </li>
                );
              })}
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
                  fontFamily: "var(--font-primary)",
                  border: "none",
                  fontWeight: 700,
                  whiteSpace: "pre-line",
                  textAlign: "center",
                  lineHeight: 1.3,
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
                onClick={() => goTo(withLocale("/contact"))}
              >
                {mtavruli(t.nav.cta)}
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
                onClick={() => goTo(withLocale(href))}
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
            onClick={() => goTo(withLocale("/contact"))}
            style={{
              width: "100%",
              background: "var(--purple-dark)",
              color: "var(--white)",
              padding: "1rem",
              borderRadius: "100px",
              fontSize: "0.875rem",
              letterSpacing: "0.08em",
              fontFamily: "var(--font-primary)",
              border: "none",
              fontWeight: 700,
              whiteSpace: "pre-line",
              lineHeight: 1.3,
            }}
          >
            {mtavruli(t.nav.cta)}
          </button>
          </div>
        </>
      )}
    </>
  );
}
