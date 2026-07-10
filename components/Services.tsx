"use client";

import { useEffect, useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { useLang } from "./LanguageProvider";
import { useMediaQuery, MOBILE_QUERY, TABLET_QUERY, SHORT_QUERY, WIDE_QUERY } from "@/lib/useMediaQuery";
import iconSocMedia    from "./assets/servicesIcons/socmedia.png";
import iconSeo         from "./assets/servicesIcons/seo.png";
import iconSocial      from "./assets/servicesIcons/social.png";
import iconStrategy    from "./assets/servicesIcons/strategy.png";
import iconCampaigns   from "./assets/servicesIcons/campaigns.png";
import iconProduction  from "./assets/servicesIcons/production.png";
import iconPrServices  from "./assets/servicesIcons/Prservices.png";
import iconCrm         from "./assets/servicesIcons/CRM.png";
import iconBranding    from "./assets/servicesIcons/branding.png";
import iconMobileApp   from "./assets/servicesIcons/mobileapp.png";
import iconDigital     from "./assets/servicesIcons/digital.png";
import iconWeb         from "./assets/servicesIcons/web.png";

// Order + icons live here; the names/subtitles come from the i18n file.
const SERVICE_ASSETS = [
  { id: "social-media-audit",  icon: iconSocMedia   },
  { id: "seo",                 icon: iconSeo        },
  { id: "social-media",        icon: iconSocial     },
  { id: "strategy",            icon: iconStrategy   },
  { id: "campaigns",           icon: iconCampaigns  },
  { id: "production",          icon: iconProduction },
  { id: "pr-services",         icon: iconPrServices },
  { id: "crm-systems",         icon: iconCrm        },
  { id: "branding",            icon: iconBranding   },
  { id: "mobile-app",          icon: iconMobileApp  },
  { id: "digital-advertising", icon: iconDigital    },
  { id: "web-development",      icon: iconWeb        },
] as const;

function FlipArrow({ flipped }: { flipped: boolean }) {
  return (
    <div
      style={{
        width: "1.75rem",
        height: "1.75rem",
        border: `1.5px solid ${flipped ? "var(--dark)" : "rgba(26,5,18,0.2)"}`,
        background: flipped ? "var(--dark)" : "transparent",
        borderRadius: "0.375rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "background 0.25s, border-color 0.25s, transform 0.4s cubic-bezier(0.16,1,0.3,1)",
        transform: flipped ? "rotate(180deg)" : "none",
      }}
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path
          d="M2 10L10 2M10 2H4M10 2V8"
          stroke={flipped ? "#FFEFAB" : "#1A0512"}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={flipped ? 1 : 0.5}
        />
      </svg>
    </div>
  );
}

function ServiceCard({
  name,
  sub,
  icon,
  delay,
}: {
  name: string;
  sub: string;
  icon: StaticImageData;
  delay: number;
}) {
  const { t } = useLang();
  const p = t.servicesPage;
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const isMobile = useMediaQuery(MOBILE_QUERY);
  const isShort = useMediaQuery(SHORT_QUERY);
  const isWide = useMediaQuery(WIDE_QUERY);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); io.disconnect(); }
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const width = isMobile ? "11.5rem" : isShort ? "18.3125rem" : isWide ? "22rem" : "18.3125rem";
  const height = isMobile ? "17rem" : isShort ? "21rem" : isWide ? "35rem" : "30rem";
  const padding = isMobile ? "1.25rem 1rem 1rem" : isWide ? "2rem 1.75rem 1.75rem" : "1.5rem 1.25rem 1.25rem";

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
        <div style={face}>
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
                maxWidth: isMobile ? 78 : isShort ? 92 : isWide ? 150 : 120,
                maxHeight: isMobile ? 78 : isShort ? 92 : isWide ? 150 : 120,
                objectFit: "contain",
              }}
            />
          </div>

          {/* Service name */}
          <div
            style={{
              color: "var(--orange)",
              fontSize: "0.8125rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontFamily: "var(--font-primary)",
              lineHeight: 1.2,
              marginBottom: sub ? "0.25rem" : "0",
            }}
          >
            {name}
          </div>

          {/* Subtitle */}
          {sub && (
            <div
              style={{
                color: "var(--dark)",
                fontSize: "0.625rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                fontFamily: "var(--font-primary)",
                opacity: 0.6,
                marginBottom: "0.5rem",
              }}
            >
              {sub}
            </div>
          )}

          {/* Flip hint */}
          <div
            style={{
              fontSize: "0.5625rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "rgba(26,5,18,0.42)",
              fontFamily: "var(--font-primary)",
            }}
          >
            {p.clickToOpen}
          </div>

          {/* Arrow — bottom right */}
          <div style={{ position: "absolute", bottom: "1.25rem", right: "1.25rem" }}>
            <FlipArrow flipped={false} />
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
              {p.lorem}
            </p>

            {/* Price */}
            <div style={{ marginTop: "auto" }}>
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
                {p.priceValue}
              </div>
            </div>
          </div>

          {/* Arrow — bottom right (active) */}
          <div style={{ position: "absolute", bottom: "1.25rem", right: "1.25rem" }}>
            <FlipArrow flipped={true} />
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
    return <ServiceCard key={s.id} name={card.name} sub={card.sub} icon={s.icon} delay={i * 0.05} />;
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
              gap: "1rem",
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
