"use client";

import { useEffect, useRef, useState } from "react";

function WireTangle() {
  return (
    <svg width="180" height="140" viewBox="0 0 180 140" fill="none">
      <path
        d="M90 70 C70 40 40 50 50 75 C60 100 100 95 110 70 C120 45 95 25 75 40 C55 55 55 90 75 100 C95 110 125 95 130 75 C135 55 115 35 95 45"
        stroke="#AFA9FF"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M60 55 C80 30 120 40 115 70 C110 100 75 105 60 85 C45 65 60 40 80 35 C100 30 125 50 120 75"
        stroke="#AFA9FF"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        opacity="0.7"
      />
      <path
        d="M100 45 C130 55 135 85 115 95 C95 105 65 95 60 75 C55 55 75 40 95 50 C115 60 120 85 105 95"
        stroke="#AFA9FF"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
      {/* Loose wire tail */}
      <path
        d="M115 75 C130 72 150 68 170 70"
        stroke="#AFA9FF"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export default function Quote() {
  const ref = useRef<HTMLElement>(null);
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
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      style={{
        background: "var(--cream)",
        padding: "60px 40px 80px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "60px",
        }}
      >
        {/* Left — orange card */}
        <div
          style={{
            flex: "0 0 46%",
            background: "var(--orange)",
            borderRadius: "28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "60px 40px",
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateX(-24px)",
            transition: "opacity 0.7s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <WireTangle />
        </div>

        {/* Right — quote */}
        <blockquote
          style={{
            flex: 1,
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateX(24px)",
            transition: "opacity 0.7s ease 0.15s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.15s",
          }}
        >
          <p
            style={{
              fontSize: "clamp(13px, 1.4vw, 16px)",
              lineHeight: 1.85,
              color: "var(--orange)",
              fontFamily: "var(--font-primary)",
              marginBottom: "20px",
            }}
          >
            &ldquo;Engineers and designers simultaneously know too much and too
            little. They know too much about technology and too little about how
            other people live their lives and do their activities&rdquo;
          </p>
          <cite
            style={{
              fontSize: "11px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--orange)",
              fontFamily: "var(--font-primary)",
              fontStyle: "normal",
              opacity: 0.6,
            }}
          >
            — Donald Norman
          </cite>
        </blockquote>
      </div>
    </section>
  );
}
