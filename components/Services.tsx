"use client";

import { useEffect, useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { useLang } from "./LanguageProvider";
import { useMediaQuery, MOBILE_QUERY, SHORT_QUERY, WIDE_QUERY } from "@/lib/useMediaQuery";
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
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
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

  return (
    <div
      ref={ref}
      style={{
        flexShrink: 0,
        width: isMobile ? "11.5rem" : isShort ? "18.3125rem" : isWide ? "22rem" : "18.3125rem",
        minHeight: isMobile ? "17rem" : isShort ? "21rem" : isWide ? "35rem" : "30rem",
        background: "#FFEFAB",
        borderRadius: "1.25rem",
        padding: isMobile ? "1.25rem 1rem 1rem" : isWide ? "2rem 1.75rem 1.75rem" : "1.5rem 1.25rem 1.25rem",
        display: "flex",
        flexDirection: "column",
        position: "relative",
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
      {/* Icon */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image src={icon} alt={name} width={isMobile ? 78 : isShort ? 92 : isWide ? 150 : 120} height={isMobile ? 78 : isShort ? 92 : isWide ? 150 : 120} style={{ objectFit: "contain" }} />
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
            marginBottom: "0.75rem",
          }}
        >
          {sub}
        </div>
      )}

      {/* Arrow — bottom right */}
      <div
        style={{
          position: "absolute",
          bottom: "1.25rem",
          right: "1.25rem",
          width: "1.75rem",
          height: "1.75rem",
          border: "1.5px solid rgba(26,5,18,0.2)",
          borderRadius: "0.375rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path
            d="M2 10L10 2M10 2H4M10 2V8"
            stroke="#1A0512"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.5"
          />
        </svg>
      </div>
    </div>
  );
}

export default function Services() {
  const { t } = useLang();
  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
  }, []);

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
            {SERVICE_ASSETS.map((s, i) => {
              const card = t.services.cards[s.id];
              return (
                <ServiceCard key={s.id} name={card.name} sub={card.sub} icon={s.icon} delay={i * 0.05} />
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
