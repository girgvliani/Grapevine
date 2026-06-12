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
        background: "#10030a",
        color: "var(--white)",
        padding: "clamp(4rem, 8vh, 6.25rem) clamp(1.5rem, 5vw, 2.5rem) clamp(5rem, 10vh, 7.5rem)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative purple arc — top right */}
      <svg
        style={{
          position: "absolute",
          top: "-5rem",
          right: "-7.5rem",
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
          fontSize: "0.6875rem",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: "var(--white)",
          opacity: visible ? 0.55 : 0,
          transform: visible ? "none" : "translateX(-1rem)",
          transition: "all 0.6s ease",
          marginBottom: "1.75rem",
          fontFamily: "var(--font-primary)",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <span>→</span>
        <span>ვინ ვართ ჩვენ</span>
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
        ჩვენ შესახებ
      </h2>

      {/* Body */}
      <p
        style={{
          maxWidth: "35rem",
          fontSize: "clamp(0.9375rem, 2vw, 1.125rem)",
          lineHeight: 1.75,
          fontFamily: "var(--font-primary)",
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(1.25rem)",
          transition: "all 0.8s ease 0.2s",
          marginBottom: "2rem",
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
          transform: visible ? "none" : "translateY(0.625rem)",
          transition: "all 0.8s ease 0.35s",
        }}
      >
        <a
          href="#about-full"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.375rem",
            color: "var(--orange)",
            fontSize: "0.75rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            textDecoration: "none",
            fontFamily: "var(--font-primary)",
            transition: "gap 0.2s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.gap = "0.625rem";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.gap = "0.375rem";
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
