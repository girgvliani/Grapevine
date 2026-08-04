"use client";

import { useEffect, useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useLang } from "./LanguageProvider";
import { useMediaQuery, MOBILE_QUERY } from "@/lib/useMediaQuery";
import { localizedHref, stripLocale } from "@/lib/routing";
import { getServiceDetail } from "@/lib/serviceContent";
import { caps, type ServiceSlug } from "@/lib/i18n";
import BehanceLink from "./BehanceLink";
import { SERVICE_ASSETS } from "./servicesConfig";

// Cards stack vertically (icon over detail) below this width.
const STACK_QUERY = "(max-width: 820px)";

function ExpandArrow({ open }: { open: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      style={{ transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1)", transform: open ? "rotate(45deg)" : "none" }}
    >
      <path
        d="M2 10L10 2M10 2H4M10 2V8"
        stroke={open ? "#FFEFAB" : "#1A0512"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={open ? 1 : 0.5}
      />
    </svg>
  );
}

function ServiceCard({
  slug,
  name,
  sub,
  icon,
  delay,
  open,
  onToggle,
}: {
  slug: ServiceSlug;
  name: string;
  sub: string;
  icon: StaticImageData;
  delay: number;
  open: boolean;
  onToggle: () => void;
}) {
  const { t, lang } = useLang();
  const p = t.servicesPage;
  const [hover, setHover] = useState(false);
  const stack = useMediaQuery(STACK_QUERY);

  // Real per-service copy when available; otherwise the generic shared text
  // (used by the not-yet-written services).
  const detail = getServiceDetail(slug, lang);
  const bodyParagraphs = (detail?.body || p.lorem).split("\n\n");
  const included = detail?.included?.length ? detail.included : p.included;
  const price = detail?.price ?? "";
  const arrowActive = open || hover;

  return (
    <div
      data-slug={slug}
      onClick={open ? undefined : onToggle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        gridColumn: open ? "1 / -1" : "auto",
        background: "#FFEFAB",
        borderRadius: "1.25rem",
        padding: open ? "clamp(1.75rem,3vw,2.75rem)" : "1.75rem 1.5rem 1.5rem",
        minHeight: open ? "0" : "15rem",
        position: "relative",
        cursor: "none",
        display: "flex",
        flexDirection: open ? (stack ? "column" : "row") : "column",
        alignItems: open ? (stack ? "center" : "stretch") : "center",
        textAlign: open && !stack ? "left" : "center",
        gap: open ? "clamp(1.5rem,4vw,3.5rem)" : "0",
        transform: hover && !open ? "translateY(-0.375rem)" : "none",
        transition: `opacity 0.55s ease ${delay}s, transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s ease, padding 0.4s cubic-bezier(0.16,1,0.3,1), gap 0.4s cubic-bezier(0.16,1,0.3,1)`,
        boxShadow: open
          ? "0 1.75rem 3rem -1.25rem rgba(16,3,10,0.45)"
          : hover
          ? "0 1.25rem 2.25rem -1rem rgba(16,3,10,0.4)"
          : "0 0.5rem 1.25rem -0.75rem rgba(16,3,10,0.22)",
      }}
    >
      {/* Left column: icon, name, (price when open) */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: open && !stack ? "flex-start" : "center",
          flex: open ? `0 0 ${stack ? "auto" : "clamp(9rem,18%,13rem)"}` : "1",
          minHeight: 0,
        }}
      >
        <div
          style={{
            flex: open ? "0 0 auto" : "1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: open ? "0" : "1rem",
            minHeight: 0,
          }}
        >
          <Image
            src={icon}
            alt={name}
            width={open ? 150 : 120}
            height={open ? 150 : 120}
            style={{
              width: open ? "clamp(96px,10vw,150px)" : "120px",
              height: open ? "clamp(96px,10vw,150px)" : "120px",
              objectFit: "contain",
              transition: "transform 0.3s, width 0.4s cubic-bezier(0.16,1,0.3,1), height 0.4s cubic-bezier(0.16,1,0.3,1)",
              transform: hover && !open ? "scale(1.05) rotate(-3deg)" : "none",
              animation: open ? "svcPop 0.45s cubic-bezier(0.16,1,0.3,1) both" : undefined,
            }}
          />
        </div>

        <div
          style={{
            color: "var(--orange)",
            fontSize: open ? "1rem" : "0.875rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            fontFamily: "var(--font-primary)",
            lineHeight: 1.2,
          }}
        >
          {name}
        </div>

        {sub && (
          <div
            style={{
              color: "var(--dark)",
              fontSize: "0.625rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontFamily: "var(--font-primary)",
              opacity: 0.6,
              marginTop: "0.25rem",
            }}
          >
            {sub}
          </div>
        )}

        {/* Collapsed hint */}
        {!open && (
          <div
            style={{
              fontSize: "0.5625rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "rgba(26,5,18,0.42)",
              marginTop: "0.6rem",
              fontFamily: "var(--font-primary)",
            }}
          >
            {p.clickToOpen}
          </div>
        )}

        {/* Price (open only, when set) */}
        {open && price && (
          <div style={{ marginTop: "1.25rem", animation: "svcRise 0.5s 0.16s cubic-bezier(0.16,1,0.3,1) both" }}>
            <div style={{ fontSize: "0.5625rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(26,5,18,0.45)", marginBottom: "0.25rem", fontFamily: "var(--font-primary)" }}>
              {p.startingFrom}
            </div>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "1.75rem", color: "var(--dark)", lineHeight: 1 }}>
              {price}
            </div>
          </div>
        )}
      </div>

      {/* Detail (open only) */}
      {open && (
        <div
          style={{
            flex: 1,
            borderLeft: stack ? "none" : "1px solid rgba(26,5,18,0.14)",
            borderTop: stack ? "1px solid rgba(26,5,18,0.14)" : "none",
            paddingLeft: stack ? "0" : "clamp(1.5rem,4vw,3.5rem)",
            paddingTop: stack ? "1.5rem" : "0",
            marginTop: stack ? "1.25rem" : "0",
            width: stack ? "100%" : "auto",
            textAlign: stack ? "center" : "left",
          }}
        >
          <h4 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "1.25rem", textTransform: "uppercase", letterSpacing: "-0.01em", color: "var(--dark)", marginBottom: "0.75rem", animation: "svcRise 0.5s 0.14s cubic-bezier(0.16,1,0.3,1) both" }}>
            {name}{sub ? " " + sub : ""}
          </h4>

          {bodyParagraphs.map((para, i) => (
            <p
              key={i}
              style={{
                fontSize: "0.9375rem",
                lineHeight: 1.7,
                color: "rgba(26,5,18,0.8)",
                maxWidth: "46rem",
                marginBottom: "1rem",
                fontFamily: "var(--font-primary)",
                animation: `svcRise 0.5s ${0.2 + i * 0.05}s cubic-bezier(0.16,1,0.3,1) both`,
              }}
            >
              {para}
            </p>
          ))}

          <div style={{ fontSize: "0.5625rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--orange)", margin: "1.25rem 0 0.75rem", fontFamily: "var(--font-primary)", animation: "svcRise 0.5s 0.26s cubic-bezier(0.16,1,0.3,1) both" }}>
            {p.includedLabel}
          </div>
          <ul
            style={{
              listStyle: "none",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(13rem, 1fr))",
              gap: "0.6rem 1.5rem",
              textAlign: stack ? "left" : "inherit",
            }}
          >
            {included.map((item, i) => (
              <li
                key={i}
                style={{
                  fontSize: "0.8125rem",
                  lineHeight: 1.5,
                  color: "rgba(26,5,18,0.78)",
                  paddingLeft: "1.25rem",
                  position: "relative",
                  fontFamily: "var(--font-primary)",
                  animation: `svcRise 0.45s ${0.3 + i * 0.05}s cubic-bezier(0.16,1,0.3,1) both`,
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "0.5rem",
                    width: "0.4rem",
                    height: "0.4rem",
                    borderRadius: "50%",
                    background: "var(--orange)",
                  }}
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Arrow badge — top-right. Always toggles: opens a closed card and
          closes an open one. stopPropagation prevents the card's own onClick
          from also firing (which would immediately re-toggle). */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        style={{
          position: "absolute",
          top: "1.25rem",
          right: "1.25rem",
          width: "1.875rem",
          height: "1.875rem",
          border: `1.5px solid ${arrowActive ? "var(--dark)" : "rgba(26,5,18,0.2)"}`,
          background: arrowActive ? "var(--dark)" : "transparent",
          borderRadius: "0.375rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background 0.25s, border-color 0.25s",
        }}
      >
        <ExpandArrow open={open} />
      </div>
    </div>
  );
}

export default function ServicesShowcase({
  initialOpen = null,
}: {
  initialOpen?: string | null;
}) {
  const { t, lang } = useLang();
  const p = t.servicesPage;
  const isMobile = useMediaQuery(MOBILE_QUERY);
  const [openId, setOpenId] = useState<string | null>(initialOpen);
  const gridRef = useRef<HTMLDivElement>(null);

  // Reflect the open card in the URL as a path slug (/services/<slug>) without a
  // full navigation, and sync when the user presses back/forward. A direct visit
  // to /services/<slug> server-renders this page with that card already open.
  const openService = (id: string | null) => {
    setOpenId(id);
    const url = id
      ? localizedHref(`/services/${id}`, lang)
      : localizedHref("/services", lang);
    window.history.pushState(null, "", url);
  };

  useEffect(() => {
    const sync = () => {
      const m = stripLocale(window.location.pathname).match(/^\/services\/(.+)$/);
      setOpenId(m ? decodeURIComponent(m[1]) : null);
    };
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  // Deep-linked open: scroll the expanded card into view on first render.
  useEffect(() => {
    if (!initialOpen) return;
    gridRef.current
      ?.querySelector<HTMLElement>(`[data-slug="${initialOpen}"]`)
      ?.scrollIntoView({ block: "center" });
  }, [initialOpen]);

  return (
    <>
      {/* Header */}
      <header
        style={{
          padding: "11rem clamp(1.5rem,7.6vw,6.875rem) 3rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ marginBottom: "1.5rem" }}>
          <BehanceLink />
        </div>
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
          {p.eyebrow}
        </div>
        <h1
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 900,
            fontSize: "clamp(2.75rem,7vw,6rem)",
            lineHeight: 0.95,
            textTransform: "uppercase",
            letterSpacing: "-0.02em",
            color: "var(--orange)",
          }}
        >
          {caps(t.services.heading)}
          <span
            style={{
              display: "block",
              color: "var(--white)",
              fontSize: "clamp(1rem,1.8vw,1.6rem)",
              letterSpacing: "0.02em",
              marginTop: "1rem",
              fontWeight: 700,
            }}
          >
            {p.tagline}
          </span>
        </h1>
        <p
          style={{
            maxWidth: "34rem",
            marginTop: "1.75rem",
            fontSize: "0.95rem",
            lineHeight: 1.8,
            color: "rgba(255,250,236,0.72)",
            fontFamily: "var(--font-primary)",
          }}
        >
          {p.intro}
        </p>
      </header>

      {/* Grid */}
      <div style={{ padding: "1.5rem clamp(1.5rem,7.6vw,6.875rem) 5rem" }}>
        <div
          ref={gridRef}
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr"
              : "repeat(auto-fill, minmax(17rem, 1fr))",
            gap: "1rem",
            alignItems: "start",
          }}
        >
          {SERVICE_ASSETS.map((s, i) => {
            const card = t.services.cards[s.id];
            return (
              <ServiceCard
                key={s.id}
                slug={s.id}
                name={card.name}
                sub={card.sub}
                icon={s.icon}
                delay={i * 0.045}
                open={openId === s.id}
                onToggle={() => openService(openId === s.id ? null : s.id)}
              />
            );
          })}
        </div>
      </div>

      {/* CTA band */}
      <section style={{ padding: "5rem clamp(1.5rem,7.6vw,6.875rem)", textAlign: "center" }}>
        <h2
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 900,
            fontSize: "clamp(2rem,5vw,3.75rem)",
            textTransform: "uppercase",
            letterSpacing: "-0.02em",
            lineHeight: 1,
            marginBottom: "1.5rem",
          }}
        >
          {caps(p.bandPre)}
          <span style={{ color: "var(--orange)" }}>{caps(p.bandAccent)}</span>
        </h2>
        <p
          style={{
            color: "rgba(255,250,236,0.65)",
            maxWidth: "30rem",
            margin: "0 auto 2rem",
            fontSize: "0.9rem",
            lineHeight: 1.8,
            fontFamily: "var(--font-primary)",
          }}
        >
          {p.bandDesc}
        </p>
        <Link
          href={localizedHref("/contact", lang)}
          style={{
            display: "inline-block",
            background: "var(--purple-dark)",
            color: "var(--white)",
            padding: "0.75rem 1.5rem",
            borderRadius: "100px",
            fontSize: "0.75rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            fontFamily: "var(--font-primary)",
            fontWeight: 700,
            textDecoration: "none",
          }}
        >
          {p.bandCta}
        </Link>
      </section>
    </>
  );
}