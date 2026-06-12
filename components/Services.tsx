"use client";

import { useEffect, useRef, useState } from "react";

const SERVICES = [
  {
    id: "social-media-audit",
    name: "Social Media",
    sub: "Audit",
    icon: (
      <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
        {/* Bar chart */}
        <rect x="10" y="50" width="14" height="28" rx="3" fill="#1A0512" />
        <rect x="30" y="34" width="14" height="44" rx="3" fill="#1A0512" />
        <rect x="50" y="20" width="14" height="58" rx="3" fill="#1A0512" />
        {/* Heart on tallest bar */}
        <path
          d="M57 14 C57 11 55 8 52 8 C49 8 47 10 47 13 C47 10 45 8 42 8 C39 8 37 11 37 14 C37 18 47 24 47 24 C47 24 57 18 57 14Z"
          fill="#1A0512"
        />
        {/* Cursor */}
        <path
          d="M68 58 L68 72 L71 68 L75 75 L77 74 L73 67 L78 66 Z"
          fill="#1A0512"
        />
      </svg>
    ),
  },
  {
    id: "seo",
    name: "SEO",
    sub: "Optimisation",
    icon: (
      <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
        {/* Magnifying glass */}
        <circle cx="38" cy="38" r="22" stroke="#1A0512" strokeWidth="6" fill="none" />
        <line x1="54" y1="54" x2="76" y2="76" stroke="#1A0512" strokeWidth="6" strokeLinecap="round" />
        {/* Dots inside */}
        <circle cx="30" cy="38" r="4" fill="#1A0512" />
        <circle cx="43" cy="38" r="4" fill="#1A0512" />
        <circle cx="38" cy="28" r="3" fill="#1A0512" />
      </svg>
    ),
  },
  {
    id: "social-media",
    name: "Social",
    sub: "Media",
    icon: (
      <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
        {/* Phone outline */}
        <rect x="22" y="8" width="46" height="74" rx="8" stroke="#1A0512" strokeWidth="5" fill="none" />
        <rect x="28" y="16" width="34" height="54" rx="4" fill="#1A0512" opacity="0.08" />
        {/* Home bar */}
        <rect x="35" y="72" width="20" height="3" rx="1.5" fill="#1A0512" />
        {/* Heart on screen */}
        <path
          d="M45 46 C45 42 42 38 38 38 C34 38 31 41 31 45 C31 50 45 58 45 58 C45 58 59 50 59 45 C59 41 56 38 52 38 C48 38 45 42 45 46Z"
          fill="#1A0512"
        />
      </svg>
    ),
  },
  {
    id: "strategy",
    name: "Strategy",
    sub: "",
    icon: (
      <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
        {/* Bar chart vertical */}
        <rect x="8" y="55" width="16" height="25" rx="3" fill="#1A0512" />
        <rect x="30" y="38" width="16" height="42" rx="3" fill="#1A0512" />
        <rect x="52" y="22" width="16" height="58" rx="3" fill="#1A0512" />
        {/* Upward line */}
        <path
          d="M8 55 L30 38 L52 22"
          stroke="#1A0512"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.3"
        />
        {/* Cross / axis mark on last bar */}
        <line x1="68" y1="18" x2="76" y2="26" stroke="#1A0512" strokeWidth="3" strokeLinecap="round" />
        <line x1="76" y1="18" x2="68" y2="26" stroke="#1A0512" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
  },
];

function ServiceCard({
  service,
  delay,
}: {
  service: (typeof SERVICES)[0];
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
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
        background: "var(--cream)",
        borderRadius: "20px",
        padding: "28px 24px 24px",
        display: "flex",
        flexDirection: "column",
        minWidth: "253px",
        minHeight: "334px",
        position: "relative",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(32px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
        cursor: "none",
        flexShrink: 0,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-6px)";
        (e.currentTarget as HTMLDivElement).style.transition = "transform 0.25s ease";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "none";
        (e.currentTarget as HTMLDivElement).style.transition = "transform 0.25s ease";
      }}
    >
      {/* Icon */}
      <div style={{ marginBottom: "auto", paddingBottom: "16px" }}>
        {service.icon}
      </div>

      {/* Service name */}
      <div
        style={{
          color: "var(--orange)",
          fontSize: "13px",
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          fontFamily: "var(--font-primary)",
          lineHeight: 1.2,
          marginBottom: service.sub ? "4px" : "0",
        }}
      >
        {service.name}
      </div>

      {/* Subtitle */}
      {service.sub && (
        <div
          style={{
            color: "var(--dark)",
            fontSize: "10px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontFamily: "var(--font-primary)",
            opacity: 0.6,
            marginBottom: "12px",
          }}
        >
          {service.sub}
        </div>
      )}

      {/* Arrow icon — bottom right */}
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          right: "20px",
          width: "28px",
          height: "28px",
          border: "1.5px solid rgba(26,5,18,0.2)",
          borderRadius: "6px",
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
  return (
    <section
      id="services"
      style={{
        background: "var(--dark)",
        padding: "80px 0 100px",
      }}
    >
      {/* Heading */}
      <h2
        style={{
          fontSize: "clamp(40px, 7vw, 80px)",
          fontWeight: 900,
          textTransform: "uppercase",
          letterSpacing: "-0.02em",
          color: "var(--orange)",
          fontFamily: "var(--font-heading)",
          padding: "0 40px",
          marginBottom: "48px",
        }}
      >
        სერვისები
      </h2>

      {/* Cards row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "16px",
          paddingLeft: "40px",
          paddingRight: "40px",
        }}
      >
        {SERVICES.map((s, i) => (
          <ServiceCard key={s.id} service={s} delay={i * 0.08} />
        ))}
      </div>
    </section>
  );
}
