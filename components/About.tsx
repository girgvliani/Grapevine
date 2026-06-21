"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import vectorImg from "./assets/Vector.png";
import logoOrange from "./assets/logo_orange.png";
import { useLang } from "./LanguageProvider";

export default function About() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
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
    <section
      id="about"
      ref={sectionRef}
      style={{
        background: "#10030a",
        color: "var(--white)",
        padding: "clamp(5rem, 11.8vh, 10.625rem) clamp(3rem, 7.6vw, 6.875rem) clamp(6rem, 14.5vh, 13.0625rem)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative vector — top right */}
      <div
        style={{
          position: "absolute",
          top: "-10.8125rem",
          left: "26.97vw",
          width: "79.22vw",
          pointerEvents: "none",
          transform: "rotate(9.19deg)",
          transformOrigin: "center center",
        }}
      >
        <Image src={vectorImg} alt="" style={{ width: "100%", height: "auto" }} />
      </div>

      <div className="container-cap" style={{ position: "relative", zIndex: 1 }}>
      {/* Eyebrow */}
      <div
        style={{
          fontSize: "1rem",
          textTransform: "uppercase",
          color: "rgba(239, 88, 58, 0.5)",
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateX(-1rem)",
          transition: "all 0.6s ease",
          marginBottom: "1.75rem",
          fontFamily: "var(--font-primary)",
          display: "inline-flex",
          alignItems: "center",
          gap: "1rem",
          letterSpacing: "0.2em",
        }}
      >
        <span style={{ display: "block", width: "12px", height: "2px", background: "rgba(239, 88, 58, 0.5)", flexShrink: 0 }} />
        <span>{t.about.eyebrow}</span>
      </div>

      {/* Heading */}
      <h2
        style={{
          fontSize: "clamp(3rem, 8vw, 6rem)",
          fontWeight: 900,
          lineHeight: 1,
          letterSpacing: "-0.02em",
          fontFamily: "var(--font-heading)",
          textTransform: "uppercase",
          marginBottom: "2.5rem",
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(1.5rem)",
          transition: "all 0.8s ease 0.1s",
        }}
      >
        {t.about.heading}
      </h2>

      {/* Body */}
      <p
        style={{
          fontSize: "clamp(1.25rem, 2.2vw, 2rem)",
          lineHeight: "3.5rem",
          letterSpacing: "0",
          fontFamily: "var(--font-primary)",
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(1.25rem)",
          transition: "all 0.8s ease 0.2s",
          marginBottom: "2rem",
        }}
      >
        <span style={{ color: "var(--orange)", fontWeight: 700 }}>Grapevine</span>
        {" "}{t.about.bodyMid}{" "}
        <span style={{ color: "var(--orange)" }}>
          {t.about.bodyHighlight}
        </span>
      </p>

      {/* Expandable extra text */}
      <div
        style={{
          display: "grid",
          gridTemplateRows: expanded ? "1fr" : "0fr",
          transition: "grid-template-rows 0.5s ease",
        }}
      >
        <div style={{ overflow: "hidden", minHeight: 0 }}>
          <div style={{ display: "flex", gap: "clamp(1.5rem, 4vw, 3rem)", alignItems: "center" }}>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: "1.25rem", lineHeight: 1.6, fontFamily: "var(--font-primary)", marginBottom: "1.25rem" }}>
                {t.about.para1}
              </p>
              <p style={{ fontSize: "1.25rem", lineHeight: 1.6, fontFamily: "var(--font-primary)", marginBottom: "1.25rem" }}>
                {t.about.para2}
              </p>
              <p style={{ fontSize: "1.25rem", lineHeight: 1.6, fontFamily: "var(--font-primary)", marginBottom: "1.25rem" }}>
                {t.about.para3}
              </p>
            </div>
            <div style={{ flexShrink: 0, width: "clamp(9rem, 14vw, 13.75rem)" }}>
              <Image src={logoOrange} alt="Grapevine" style={{ width: "100%", height: "auto" }} />
            </div>
          </div>
        </div>
      </div>

      {/* See more / see less toggle */}
      <div
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(0.625rem)",
          transition: "all 0.8s ease 0.35s",
        }}
      >
        <button
          onClick={() => setExpanded((e) => !e)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.375rem",
            color: "#902793",
            fontSize: "clamp(1rem, 1.7vw, 1.5625rem)",
            letterSpacing: "0",
            textTransform: "uppercase",
            textDecoration: "none",
            fontFamily: "var(--font-primary)",
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
          }}
        >
          {expanded ? t.about.seeLess : t.about.seeMore}
          <svg
            width="20.67"
            height="11.33"
            viewBox="0 0 20.67 11.33"
            fill="none"
            style={{
              transform: expanded ? "rotate(180deg)" : "none",
              transition: "transform 0.3s ease",
            }}
          >
            <path d="M1 1L10.335 10.33L19.67 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      </div>
    </section>
  );
}
