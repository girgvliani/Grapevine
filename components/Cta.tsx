"use client";

import { useEffect, useRef, useState } from "react";

export default function Cta() {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [btnVisible, setBtnVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const el = btnRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setBtnVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="cta"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "100px 40px",
        background: "var(--orange)",
        color: "var(--dark)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background watermark */}
      <div
        style={{
          position: "absolute",
          fontSize: "30vw",
          fontWeight: 900,
          textTransform: "uppercase",
          fontFamily: "'Arial Black', sans-serif",
          opacity: 0.06,
          lineHeight: 1,
          pointerEvents: "none",
          whiteSpace: "nowrap",
          bottom: "-5vw",
          right: "-5vw",
          letterSpacing: "-0.05em",
          color: "var(--dark)",
        }}
      >
        GROW
      </div>

      {/* Decorative tangle */}
      <svg
        className="animate-float"
        style={{
          position: "absolute",
          bottom: "40px",
          right: "40px",
          opacity: 0.3,
        }}
        width="160"
        height="160"
        viewBox="0 0 160 160"
        fill="none"
      >
        <path
          d="M30,80 C30,50 55,30 80,50 C105,70 80,100 100,80 C120,60 140,80 120,100 C100,120 80,100 90,120 C100,140 70,150 60,130"
          stroke="#1A0512"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
      </svg>

      <div style={{ position: "relative", zIndex: 1 }}>
        <div
          style={{
            fontSize: "11px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            opacity: 0.6,
            marginBottom: "24px",
          }}
        >
          — Ready to untangle?
        </div>

        <h2
          style={{
            fontSize: "clamp(40px, 8vw, 110px)",
            fontWeight: 900,
            textTransform: "uppercase",
            lineHeight: 0.9,
            fontFamily: "'Arial Black', sans-serif",
            letterSpacing: "-0.04em",
            marginBottom: "48px",
          }}
        >
          Let's Talk
          <br />
          <span style={{ color: "var(--dark)", opacity: 0.25 }}>Mess.</span>
        </h2>

        <button
          ref={btnRef}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "16px",
            padding: "20px 40px",
            background: hovered ? "var(--purple-dark)" : "var(--dark)",
            color: "var(--white)",
            fontSize: "13px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            borderRadius: "100px",
            border: "none",
            fontFamily: "inherit",
            fontWeight: 700,
            opacity: btnVisible ? 1 : 0,
            transform: btnVisible
              ? hovered
                ? "scale(1.05)"
                : "none"
              : "translateY(30px)",
            transition: "opacity 0.7s, transform 0.3s, background 0.3s",
          }}
          onClick={() => {
            window.location.href = "mailto:hello@grapevine.ge";
          }}
        >
          Start Growing
          <div
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              background: "var(--orange)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
              transform: hovered ? "rotate(45deg)" : "none",
              transition: "transform 0.3s",
            }}
          >
            →
          </div>
        </button>

        <div style={{ marginTop: "60px", opacity: 0.6, fontSize: "12px" }}>
          <p>
            Or reach us directly at{" "}
            <a
              href="mailto:hello@grapevine.ge"
              style={{
                color: "var(--dark)",
                textDecoration: "none",
                borderBottom: "1px solid currentColor",
              }}
            >
              hello@grapevine.ge
            </a>
          </p>
          <p style={{ marginTop: "8px" }}>
            I.Chavchavadze St. 13 · Tbilisi, Georgia ·{" "}
            <a
              href="tel:+9955991701888"
              style={{
                color: "var(--dark)",
                textDecoration: "none",
                borderBottom: "1px solid currentColor",
              }}
            >
              +995 599 170 188
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
