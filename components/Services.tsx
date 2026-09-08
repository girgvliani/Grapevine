"use client";

import { useEffect, useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useLang } from "./LanguageProvider";
import { getServiceDetail } from "@/lib/serviceContent";
import { localizedHref } from "@/lib/routing";
import { type ServiceSlug, mtavruli } from "@/lib/i18n";
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
  fillHeight = false,
}: {
  slug: ServiceSlug;
  name: string;
  sub: string;
  icon: StaticImageData;
  delay: number;
  // Set by the pinned desktop track, whose height is whatever the viewport
  // leaves under the heading. See `height` below.
  fillHeight?: boolean;
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
  const designHeight = isMobile ? "17rem" : isShort ? "21rem" : isHuge ? "clamp(35rem, 57vh, 54rem)" : isWide ? "35rem" : "30rem";
  // In the pinned desktop section the design height alone isn't safe: a wide
  // but short viewport (1536×768, 1920×720 …) leaves less room under the
  // heading than the card wants, and the section's `overflow: hidden` then
  // slices the bottom off. Capping at the track's own height makes the card
  // shrink to whatever is actually free instead. Everywhere else the section
  // scrolls normally, so the design height stands.
  const height = fillHeight ? `min(${designHeight}, 100%)` : designHeight;
  const padding = isMobile ? "1.25rem 1rem 1rem" : isHuge ? "2.5rem 2rem 2rem" : isWide ? "2rem 1.75rem 1.75rem" : "1.5rem 1.25rem 1.25rem";
  const iconCap = isMobile ? 78 : isShort ? 92 : isHuge ? 180 : isWide ? 150 : 120;

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
        // No hover movement — the card's only motion is the flip on press,
        // handled by the rotating inner below.
        transform: visible ? "none" : "translateY(2rem)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
        cursor: "none",
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
          <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Image
              src={icon}
              alt={name}
              // Icons vary in aspect ratio (some 244x244, some 244x254). Cap the
              // footprint and keep width/height auto so the ratio is preserved
              // (forcing a square tripped Next's aspect-ratio warning).
              style={{
                width: "auto",
                height: "auto",
                maxWidth: iconCap,
                // `100%` keeps the icon inside its slot once the card shrinks on
                // a short viewport — without it the fixed cap wins and the face's
                // `overflow: hidden` clips the artwork.
                maxHeight: `min(${iconCap}px, 100%)`,
                objectFit: "contain",
              }}
            />
          </div>

          {/* Service name — name and sub are one label on one line, in one
              weight and size. They used to be stacked, with the sub sitting
              under the name smaller and faded, which read as a subtitle rather
              than as part of the same name. */}
          <div
            style={{
              color: "var(--orange)",
              fontSize: isMobile ? "0.875rem" : isHuge ? "1.25rem" : "1.0625rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontFamily: "var(--font-primary)",
              lineHeight: 1.15,
            }}
          >
            {name}
            {sub ? ` ${sub}` : ""}
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
              <Link
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
              </Link>
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

  // `fillHeight` only applies to the pinned desktop track, where the available
  // height is finite; the tablet/mobile section just scrolls.
  const renderCards = (fillHeight: boolean) =>
    SERVICE_ASSETS.map((s, i) => {
      const card = t.services.cards[s.id];
      return (
        <ServiceCard
          key={s.id}
          slug={s.id}
          name={card.name}
          sub={card.sub}
          icon={s.icon}
          delay={i * 0.05}
          fillHeight={fillHeight}
        />
      );
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
            letterSpacing: "-0.02em",
            color: "var(--orange)",
            fontFamily: "var(--font-heading)",
            margin: "0 clamp(1.5rem, 5vw, 3rem) 2.5rem",
          }}
        >
          {mtavruli(t.services.heading)}
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
            {renderCards(false)}
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
          // Column flex so the track below gets exactly the height the heading
          // leaves over, instead of both being laid out blind against 100vh.
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Heading. The min of the top padding has to clear the fixed 85px nav
            that floats over this section — at 9vh it only does so above a
            ~944px-tall viewport, which is why the heading used to sit sliced in
            half behind the bar on ordinary laptop screens. */}
        <div style={{ flex: "0 0 auto", padding: "clamp(7rem, 9vh, 7.5rem) clamp(3rem, 7.6vw, 6.875rem) 3rem" }}>
          <h2
            style={{
              fontSize: "clamp(2rem, 4.44vw, 4rem)",
              fontWeight: 900,
              letterSpacing: "-0.02em",
              color: "var(--orange)",
              fontFamily: "var(--font-heading)",
            }}
          >
            {mtavruli(t.services.heading)}
          </h2>
        </div>

        {/* Cards track — takes the remaining height and pins the cards to the
            top of it, so any spare room falls below them rather than pushing
            them up under the heading. */}
        <div
          style={{
            flex: "1 1 auto",
            minHeight: 0,
            padding: "0 clamp(3rem, 7.6vw, 6.875rem) clamp(1.5rem, 4vh, 3rem)",
            display: "flex",
            alignItems: "flex-start",
          }}
        >
          <div
            ref={trackRef}
            style={{
              display: "flex",
              alignItems: "flex-start",
              height: "100%",
              gap: isHuge ? "1.75rem" : "1rem",
              willChange: "transform",
              transition: "transform 0.05s linear",
            }}
          >
            {renderCards(true)}
          </div>
        </div>
      </section>
    </div>
  );
}
