"use client";

import { useEffect, useRef, useState } from "react";

const SERVICES = [
  {
    num: "01",
    name: "Strategy",
    desc: "Strategy starts as data before it becomes direction. We map your market, audience and competition — then chart the clearest path to growth.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="3" fill="currentColor" />
        <line x1="5" y1="10" x2="20" y2="20" stroke="currentColor" strokeWidth="1.5" />
        <line x1="35" y1="8" x2="20" y2="20" stroke="currentColor" strokeWidth="1.5" />
        <line x1="8" y1="32" x2="20" y2="20" stroke="currentColor" strokeWidth="1.5" />
        <line x1="32" y1="30" x2="20" y2="20" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="5" cy="10" r="2.5" fill="var(--orange)" />
        <circle cx="35" cy="8" r="2.5" fill="var(--orange)" />
        <circle cx="8" cy="32" r="2.5" fill="var(--orange)" />
        <circle cx="32" cy="30" r="2.5" fill="var(--orange)" />
      </svg>
    ),
  },
  {
    num: "02",
    name: "Branding",
    desc: "Branding is the promise you make before saying a word. We build visual identities so consistent and compelling, your audience feels it instantly.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path d="M8,20 C8,14 12,8 20,8 C28,8 32,14 32,20" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M8,20 C8,26 14,32 20,32" stroke="var(--orange)" strokeWidth="2.5" fill="none" />
        <circle cx="20" cy="8" r="3" fill="currentColor" />
      </svg>
    ),
  },
  {
    num: "03",
    name: "Content",
    desc: "Content creation that converts — from scroll-stopping visuals to narratives that resonate. We make sure your story lands every time.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect x="6" y="8" width="28" height="20" rx="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <line x1="6" y1="14" x2="34" y2="14" stroke="currentColor" strokeWidth="1" />
        <line x1="12" y1="20" x2="28" y2="20" stroke="var(--orange)" strokeWidth="1.5" />
        <line x1="12" y1="24" x2="22" y2="24" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <path d="M18,32 L22,28 M18,32 L14,28" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    num: "04",
    name: "Performance",
    desc: "SEO, campaigns, paid media — we run the numbers so your brand doesn't just look good, it grows measurably, predictably, relentlessly.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path d="M20,6 L20,34 M6,20 L34,20" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="20" cy="20" r="6" stroke="var(--orange)" strokeWidth="2" fill="none" />
        <circle cx="20" cy="20" r="13" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.3" />
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
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

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
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x, y });
  };

  const cardTransform = hovered
    ? `perspective(1000px) rotateY(${tilt.x * 6}deg) rotateX(${-tilt.y * 6}deg) translateY(-4px)`
    : visible
    ? "none"
    : "translateY(40px)";

  return (
    <div
      ref={ref}
      className="service-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setTilt({ x: 0, y: 0 });
      }}
      onMouseMove={handleMouseMove}
      style={{
        padding: "48px 40px",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.06)",
        position: "relative",
        overflow: "hidden",
        opacity: visible ? 1 : 0,
        transform: cardTransform,
        transition: hovered
          ? "transform 0.15s ease"
          : `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {/* Hover fill */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "var(--orange)",
          transform: hovered ? "translateY(0)" : "translateY(101%)",
          transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />

      {/* Content */}
      <div
        style={{
          fontSize: "11px",
          letterSpacing: "0.2em",
          opacity: hovered ? 0.3 : 0.2,
          position: "absolute",
          top: "40px",
          right: "40px",
          zIndex: 1,
          color: hovered ? "rgba(0,0,0,0.3)" : undefined,
          transition: "color 0.4s",
        }}
      >
        {service.num}
      </div>

      <div
        style={{
          fontSize: "32px",
          position: "relative",
          zIndex: 1,
          marginBottom: "24px",
          color: hovered ? "var(--dark)" : "var(--white)",
          transition: "color 0.4s",
        }}
      >
        {service.icon}
      </div>

      <div
        style={{
          fontSize: "22px",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          marginBottom: "16px",
          fontFamily: "'Arial Black', sans-serif",
          position: "relative",
          zIndex: 1,
          color: hovered ? "var(--dark)" : "var(--white)",
          transition: "color 0.4s",
        }}
      >
        {service.name}
      </div>

      <div
        style={{
          fontSize: "12px",
          lineHeight: 1.8,
          opacity: hovered ? 1 : 0.5,
          position: "relative",
          zIndex: 1,
          color: hovered ? "var(--dark)" : undefined,
          transition: "color 0.4s, opacity 0.4s",
        }}
      >
        {service.desc}
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <section
      id="services"
      style={{
        minHeight: "100vh",
        padding: "100px 40px",
        background: "var(--dark)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: "80px",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(36px, 6vw, 80px)",
            textTransform: "uppercase",
            fontWeight: 900,
            fontFamily: "'Arial Black', sans-serif",
            lineHeight: 0.95,
            letterSpacing: "-0.02em",
          }}
        >
          What We
          <br />
          <span style={{ color: "var(--orange)" }}>Do.</span>
        </h2>
        <span
          style={{ fontSize: "11px", letterSpacing: "0.2em", opacity: 0.3 }}
        >
          02 / Services
        </span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "2px",
        }}
      >
        {SERVICES.map((s, i) => (
          <ServiceCard key={s.num} service={s} delay={(i + 1) * 0.1} />
        ))}
      </div>
    </section>
  );
}
