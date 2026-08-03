"use client";

import { useEffect, useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { useLang } from "./LanguageProvider";
import { getServiceDetail } from "@/lib/serviceContent";
import { localizedHref } from "@/lib/routing";
import type { ServiceSlug } from "@/lib/i18n";
import { useMediaQuery, MOBILE_QUERY, TABLET_QUERY, SHORT_QUERY, WIDE_QUERY, HUGE_QUERY } from "@/lib/useMediaQuery";
import { SERVICE_ASSETS } from "./servicesConfig";

// Loop / repeat mark — the "turn" indicator shown on each service card.
function RepeatIcon({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#1A0512"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m17 2 4 4-4 4" />
      <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
      <path d="m7 22-4-4 4-4" />
      <path d="M21 13v1a4 4 0 0 1-4 4H3" />
    </svg>
  );
}

function ServiceCard({
  slug,
  name,
  sub,
  icon,
  delay,
}: {
  slug: ServiceSlug;
  name: string;
  sub: string;
  icon: StaticImageData;
  delay: number;
}) {
  const { t, lang } = useLang();
  const p = t.servicesPage;
  // Short annotation per service (its one-line intro) + optional price.
  const detail = getServiceDetail(slug, lang);
  const annotation = detail?.intro || p.lorem;
  const price = detail?.price ?? "";
  const ref = useRef<HTMLDivElement>(null);
  const visible = true;
  const [flipped, setFlipped] = useState(false);
  const isMobile = useMediaQuery(MOBILE_QUERY);
  const isShort = useMediaQuery(SHORT_QUERY);
  const isWide = useMediaQuery(WIDE_QUERY);
  const isHuge = useMediaQuery(HUGE_QUERY);

  // isHuge height uses vh so tall ultra-wide screens fill vertically. At ~1000px
  // tall it resolves to ~35rem (matching the previous wide size), growing taller
  // as the viewport does. isShort still wins on short screens.
  const width = isMobile ? "11.5rem" : isShort ? "18.3125rem" : isHuge ? "24rem" : isWide ? "22rem" : "18.3125rem";
  const height = isMobile ? "17rem" : isShort ? "21rem" : isHuge ? "clamp(35rem, 57vh, 54rem)" : isWide ? "35rem" : "30rem";
  const padding = isMobile ? "1.25rem 1rem 1rem" : isHuge ? "2.5rem 2rem 2rem" : isWide ? "2rem 1.75rem 1.75rem" : "1.5rem 1.25rem 1.25rem";

  // Shared styles for the two faces of the flip card.
  const face: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    background: "#FFEFAB",
    borderRadius: "1.25rem",
    padding,
    display: "flex",
    flexDirection: "column",
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
    overflow: "hidden",
  };

  return (
    <div
      ref={ref}
      style={{
        flexShrink: 0,
        width,
        height,
        position: "relative",
        perspective: "1400px",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(2rem)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
        cursor: "none",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-0.375rem)";
        (e.currentTarget as HTMLDivElement).style.transition = "transform 0.25s ease";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "none";
        (e.currentTarget as HTMLDivElement).style.transition = "transform 0.25s ease";
      }}
    >
      {/* Rotating inner — front + back live on opposite faces */}
      <div
        role="button"
        tabIndex={0}
        aria-pressed={flipped}
        aria-label={`${name}${sub ? " " + sub : ""} — ${p.clickToOpen}`}
        onClick={() => setFlipped((f) => !f)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setFlipped((f) => !f);
          }
        }}
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1)",
          transform: flipped ? "rotateY(180deg)" : "none",
        }}
      >
        {/* FRONT */}
        <div style={{ ...face, alignItems: "center", textAlign: "center" }}>
          {/* Icon */}
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Image
              src={icon}
              alt={name}
              // Icons vary in aspect ratio (some 244x244, some 244x254). Cap the
              // footprint and keep width/height auto so the ratio is preserved
              // (forcing a square tripped Next's aspect-ratio warning).
              style={{
                width: "auto",
                height: "auto",
                maxWidth: isMobile ? 78 : isShort ? 92 : isHuge ? 180 : isWide ? 150 : 120,
                maxHeight: isMobile ? 78 : isShort ? 92 : isHuge ? 180 : isWide ? 150 : 120,
                objectFit: "contain",
              }}
            />
          </div>

          {/* Service name */}
          <div
            style={{
              color: "var(--orange)",
              fontSize: isMobile ? "0.875rem" : isHuge ? "1.25rem" : "1.0625rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontFamily: "var(--font-primary)",
              lineHeight: 1.15,
              marginBottom: "0.35rem",
            }}
          >
            {name}
          </div>

          {/* Subtitle — always rendered so every card reserves the same height
              here. Services with no sub get a blank line instead of collapsing,
              which would otherwise drop their name a line lower than the rest
              (the icon above is flex:1, so this block is bottom-anchored). */}
          <div
            aria-hidden={sub ? undefined : true}
            style={{
              color: "var(--orange)",
              fontSize: isMobile ? "0.6875rem" : isHuge ? "0.875rem" : "0.75rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              fontFamily: "var(--font-primary)",
              opacity: 0.85,
            }}
          >
            {sub || "\u00A0"}
          </div>

          {/* Turn / flip logo — bottom centre */}
          <div style={{ marginTop: isMobile ? "0.85rem" : "1.35rem", display: "flex", justifyContent: "center" }}>
            <RepeatIcon size={isMobile ? 18 : 22} />
          </div>
        </div>

        {/* BACK */}
        <div style={{ ...face, transform: "rotateY(180deg)" }}>
          <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
            {/* Name */}
            <div
              style={{
                color: "var(--orange)",
                fontSize: "0.8125rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontFamily: "var(--font-primary)",
                lineHeight: 1.2,
                marginBottom: "0.75rem",
              }}
            >
              {name}{sub ? " " + sub : ""}
            </div>

            {/* Description */}
            <p
              style={{
                color: "rgba(26,5,18,0.8)",
                fontSize: isMobile ? "0.625rem" : "0.75rem",
                lineHeight: 1.6,
                fontFamily: "var(--font-primary)",
                marginBottom: "1rem",
                display: "-webkit-box",
                WebkitLineClamp: isMobile ? 5 : isWide ? 10 : 7,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              } as React.CSSProperties}
            >
              {annotation}
            </p>

            {/* Bottom: optional price + "see more" link to the service page */}
            <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "0.85rem", alignItems: "flex-start" }}>
              {price && (
                <div>
                  <div
                    style={{
                      fontSize: "0.5625rem",
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: "rgba(26,5,18,0.45)",
                      fontFamily: "var(--font-primary)",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {p.startingFrom}
                  </div>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: isMobile ? "1.25rem" : "1.75rem", color: "var(--dark)", lineHeight: 1 }}>
                    {price}
                  </div>
                </div>
              )}
              <a
                href={localizedHref(`/services/${slug}`, lang)}
                onClick={(e) => e.stopPropagation()}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  background: "var(--purple-dark)",
                  color: "var(--white)",
                  padding: isMobile ? "0.4rem 0.75rem" : "0.5rem 0.9rem",
                  borderRadius: "100px",
                  fontSize: isMobile ? "0.5625rem" : "0.625rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  fontFamily: "var(--font-primary)",
                  textDecoration: "none",
                }}
              >
                {p.seeMore} →
              </a>
            </div>
          </div>

          {/* Turn / flip logo — bottom right */}
          <div style={{ position: "absolute", bottom: "1.25rem", right: "1.25rem" }}>
            <RepeatIcon size={20} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const { t } = useLang();
  // Scroll-jacked horizontal track is desktop-only. On tablet/mobile we render
  // a normal vertical wrapping grid (see the early return below).
  const isTablet = useMediaQuery(TABLET_QUERY);
  const isHuge = useMediaQuery(HUGE_QUERY);
  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isTablet) return;
    const outer = outerRef.current;
    const track = trackRef.current;
    if (!outer || !track) return;

    const update = () => {
      const rect = outer.getBoundingClientRect();
      const progress = Math.max(
        0,
        Math.min(1, -rect.top / (rect.height - window.innerHeight))
      );
      const containerStyle = getComputedStyle(track.parentElement!);
      const paddingLeft = parseFloat(containerStyle.paddingLeft) || 0;
      const paddingRight = parseFloat(containerStyle.paddingRight) || 0;
      const maxShift = track.scrollWidth - window.innerWidth + paddingLeft + paddingRight;
      track.style.transform = `translateX(-${progress * maxShift}px)`;
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, [isTablet]);

  const cards = SERVICE_ASSETS.map((s, i) => {
    const card = t.services.cards[s.id];
    return <ServiceCard key={s.id} slug={s.id} name={card.name} sub={card.sub} icon={s.icon} delay={i * 0.05} />;
  });

  // Tablet / mobile: same single-row layout, but natively swipeable left/right
  // instead of hijacking vertical scroll.
  if (isTablet) {
    return (
      <section
        id="services"
        style={{
          background: "#10030a",
          overflow: "hidden",
          padding: "clamp(4rem, 8vh, 6rem) 0 clamp(4rem, 8vh, 6rem)",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(2rem, 6vw, 3.5rem)",
            fontWeight: 900,
            textTransform: "uppercase",
            letterSpacing: "-0.02em",
            color: "var(--orange)",
            fontFamily: "var(--font-heading)",
            margin: "0 clamp(1.5rem, 5vw, 3rem) 2.5rem",
          }}
        >
          {t.services.heading}
        </h2>
        <div
          className="hide-scrollbar"
          style={{
            overflowX: "auto",
            overflowY: "hidden",
            WebkitOverflowScrolling: "touch",
            padding: "0 clamp(1.5rem, 5vw, 3rem)",
          }}
        >
          <div style={{ display: "flex", gap: "1rem", width: "max-content" }}>
            {cards}
          </div>
        </div>
      </section>
    );
  }

  return (
    <div ref={outerRef} style={{ height: "400vh", position: "relative" }}>
      <section
        id="services"
        style={{
          background: "#10030a",
          overflow: "hidden",
          position: "sticky",
          top: 0,
          height: "100vh",
        }}
      >
        {/* Heading */}
        <div style={{ padding: "clamp(5rem, 9vh, 7.5rem) clamp(3rem, 7.6vw, 6.875rem) 3rem" }}>
          <h2
            style={{
              fontSize: "clamp(2rem, 4.44vw, 4rem)",
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "-0.02em",
              color: "var(--orange)",
              fontFamily: "var(--font-heading)",
            }}
          >
            {t.services.heading}
          </h2>
        </div>

        {/* Cards track */}
        <div style={{ padding: "0 clamp(3rem, 7.6vw, 6.875rem)", overflow: "visible" }}>
          <div
            ref={trackRef}
            style={{
              display: "flex",
              gap: isHuge ? "1.75rem" : "1rem",
              willChange: "transform",
              transition: "transform 0.05s linear",
            }}
          >
            {cards}
          </div>
        </div>
      </section>
    </div>
  );
}
