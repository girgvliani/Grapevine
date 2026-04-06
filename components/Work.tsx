"use client";

import { useEffect, useRef } from "react";

const CARDS = [
  {
    cls: "wc1",
    bg: "var(--orange)",
    placeholderBg: "rgba(0,0,0,0.15)",
    tag: "Branding · 2024",
    title: "Brand X",
    sub: "From Tangle to Triumph",
    icon: (
      <svg width="80" height="80" viewBox="0 0 80 80">
        <path d="M10,40 L40,10 L70,40 L40,70 Z" fill="rgba(0,0,0,0.4)" />
        <circle cx="40" cy="40" r="12" fill="rgba(0,0,0,0.3)" />
      </svg>
    ),
  },
  {
    cls: "wc2",
    bg: "#2a2a2a",
    placeholderBg: "var(--purple-light)",
    tag: "Strategy · 2024",
    title: "Nova Studio",
    sub: "From Space to Scale",
    icon: (
      <svg width="80" height="80" viewBox="0 0 80 80">
        <circle cx="40" cy="40" r="28" stroke="#AFA9FF" strokeWidth="4" fill="none" />
        <circle cx="40" cy="40" r="16" fill="#AFA9FF" fillOpacity="0.3" />
      </svg>
    ),
  },
  {
    cls: "wc3",
    bg: "var(--dark)",
    placeholderBg: "var(--cream)",
    tag: "Content · 2023",
    title: "Mager Co.",
    sub: "Clarity Through Chaos",
    icon: (
      <svg width="80" height="80" viewBox="0 0 80 80">
        <path d="M20,60 L40,20 L60,60 Z" fill="var(--orange)" />
      </svg>
    ),
  },
  {
    cls: "wc4",
    bg: "#3a1a4a",
    placeholderBg: "rgba(175,169,255,0.3)",
    tag: "SEO · 2023",
    title: "Equity Lab",
    sub: "Found, Seen, Chosen",
    icon: (
      <svg width="80" height="80" viewBox="0 0 80 80">
        <rect x="15" y="15" width="50" height="50" rx="10" fill="none" stroke="#AFA9FF" strokeWidth="3" />
        <rect x="25" y="25" width="30" height="30" rx="5" fill="#AFA9FF" fillOpacity="0.3" />
      </svg>
    ),
  },
  {
    cls: "wc5",
    bg: "#1a2a1a",
    placeholderBg: "var(--cream)",
    tag: "Campaign · 2023",
    title: "GreenFlow",
    sub: "Growth Rooted in Purpose",
    icon: (
      <svg width="80" height="80" viewBox="0 0 80 80">
        <path d="M15,40 C15,28 28,15 40,15 C52,15 65,28 65,40" stroke="var(--orange)" strokeWidth="3" fill="none" />
        <path d="M15,40 C15,52 28,65 40,65" stroke="#1A0512" strokeWidth="3" fill="none" />
      </svg>
    ),
  },
];

export default function Work() {
  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Scroll-driven horizontal pan
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
      const maxShift = track.scrollWidth - window.innerWidth + 80;
      track.style.transform = `translateX(-${progress * maxShift}px)`;
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  // Drag-to-scroll
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let isDragging = false;
    let startX = 0;
    let startShift = 0;
    let currentShift = 0;

    const getMaxShift = () => track.scrollWidth - window.innerWidth + 80;

    const onDown = (e: MouseEvent) => {
      isDragging = true;
      startX = e.pageX;
      startShift = currentShift;
      track.style.transition = "none";
    };

    const onMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.pageX - startX;
      currentShift = Math.max(0, Math.min(getMaxShift(), startShift - dx));
      track.style.transform = `translateX(-${currentShift}px)`;
    };

    const onUp = () => {
      isDragging = false;
      track.style.transition = "";
    };

    track.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);

    return () => {
      track.removeEventListener("mousedown", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  return (
    <div ref={outerRef} id="work-outer" style={{ height: "300vh", position: "relative" }}>
      <section
        id="work"
        style={{
          background: "var(--purple-light)",
          color: "var(--dark)",
          overflow: "hidden",
          position: "sticky",
          top: 0,
          height: "100vh",
        }}
      >
        {/* Title area */}
        <div
          style={{
            position: "absolute",
            top: "60px",
            left: "40px",
            zIndex: 10,
          }}
        >
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 52px)",
              fontWeight: 900,
              textTransform: "uppercase",
              fontFamily: "'Arial Black', sans-serif",
              letterSpacing: "-0.02em",
            }}
          >
            Our Untangled
            <br />
            <span style={{ color: "var(--orange)" }}>Brands.</span>
          </h2>
          <p
            style={{
              fontSize: "11px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              opacity: 0.5,
              marginTop: "8px",
            }}
          >
            Drag or scroll →
          </p>
        </div>

        {/* Track */}
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            padding: "0 40px",
            paddingTop: "140px",
          }}
        >
          <div
            ref={trackRef}
            style={{
              display: "flex",
              gap: "24px",
              willChange: "transform",
            }}
          >
            {CARDS.map((card) => (
              <div
                key={card.title}
                className="work-card"
                style={{
                  flexShrink: 0,
                  width: "340px",
                  height: "420px",
                  background: card.bg,
                  borderRadius: "16px",
                  overflow: "hidden",
                  position: "relative",
                  transition: "transform 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.02) translateY(-8px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "";
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "65%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: card.placeholderBg,
                  }}
                >
                  {card.icon}
                </div>
                <div style={{ padding: "24px" }}>
                  <div
                    style={{
                      fontSize: "9px",
                      letterSpacing: "0.3em",
                      textTransform: "uppercase",
                      color: "var(--orange)",
                      marginBottom: "8px",
                    }}
                  >
                    {card.tag}
                  </div>
                  <div
                    style={{
                      fontSize: "16px",
                      fontWeight: 700,
                      color: "var(--white)",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {card.title}
                  </div>
                  <div
                    style={{
                      fontSize: "11px",
                      opacity: 0.4,
                      marginTop: "4px",
                      color: "var(--white)",
                    }}
                  >
                    {card.sub}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
