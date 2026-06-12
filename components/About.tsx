"use client";

import { useEffect, useRef, useState } from "react";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

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
        background: "var(--dark)",
        color: "var(--white)",
        padding: "100px 40px 120px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative purple arc — top right */}
      <svg
        style={{
          position: "absolute",
          top: "-80px",
          right: "-120px",
          pointerEvents: "none",
          opacity: 0.25,
        }}
        width="500"
        height="500"
        viewBox="0 0 500 500"
        fill="none"
      >
        <circle cx="350" cy="150" r="220" stroke="#902793" strokeWidth="2" fill="none" />
        <circle cx="350" cy="150" r="170" stroke="#AFA9FF" strokeWidth="1.5" fill="none" />
      </svg>

      {/* Eyebrow */}
      <div
        style={{
          fontSize: "11px",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: "var(--white)",
          opacity: visible ? 0.55 : 0,
          transform: visible ? "none" : "translateX(-16px)",
          transition: "all 0.6s ease",
          marginBottom: "28px",
          fontFamily: "var(--font-primary)",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span>→</span>
        <span>ვინ ვართ ჩვენ</span>
      </div>

      {/* Heading */}
      <h2
        style={{
          fontSize: "clamp(48px, 8vw, 96px)",
          fontWeight: 900,
          lineHeight: 1,
          letterSpacing: "-0.02em",
          fontFamily: "var(--font-heading)",
          textTransform: "uppercase",
          marginBottom: "40px",
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(24px)",
          transition: "all 0.8s ease 0.1s",
        }}
      >
        ჩვენ შესახებ
      </h2>

      {/* Body */}
      <p
        style={{
          maxWidth: "560px",
          fontSize: "clamp(15px, 2vw, 18px)",
          lineHeight: 1.75,
          fontFamily: "var(--font-primary)",
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(20px)",
          transition: "all 0.8s ease 0.2s",
          marginBottom: "32px",
        }}
      >
        <span style={{ color: "var(--orange)", fontWeight: 700 }}>Grapevine</span>
        {" "}არის სტრატეგიული და ციფრული პარტნიორი ბრენდებისთვის,
        რომელსაც სურთ ზრდა იყოს{" "}
        <span style={{ color: "var(--orange)" }}>
          სტრუქტურირებული გრძელვადიანი და ლოგიკური
        </span>
      </p>

      {/* See more link */}
      <div
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(10px)",
          transition: "all 0.8s ease 0.35s",
        }}
      >
        <a
          href="#about-full"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            color: "var(--orange)",
            fontSize: "12px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            textDecoration: "none",
            fontFamily: "var(--font-primary)",
            transition: "gap 0.2s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.gap = "10px";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.gap = "6px";
          }}
        >
          მეტის ნახვა
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 2L6 10M2 7L6 11L10 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </section>
  );
}
