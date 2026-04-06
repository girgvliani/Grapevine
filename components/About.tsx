"use client";

import { useEffect, useRef, useState } from "react";

const TEXT = [
  { word: "Grapevine", accent: false },
  { word: "believes", accent: true },
  { word: "in", accent: false },
  { word: "clarity.", accent: false },
  { word: "We", accent: false },
  { word: "find", accent: false },
  { word: "the", accent: false },
  { word: "core", accent: true },
  { word: "thread", accent: true },
  { word: "of", accent: false },
  { word: "your", accent: false },
  { word: "brand", accent: false },
  { word: "and", accent: false },
  { word: "help", accent: false },
  { word: "you", accent: false },
  { word: "grow", accent: true },
  { word: "it,", accent: false },
  { word: "free", accent: false },
  { word: "of", accent: false },
  { word: "mess.", accent: true },
];

const STATS = [
  { target: 300, suffix: "%", label: "Average growth" },
  { target: 120, suffix: "+", label: "Brands untangled" },
  { target: 5, suffix: "", label: "Years of clarity" },
];

function useCountUp(target: number, active: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const duration = 1800;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 4);
      setValue(Math.floor(ease * target));
      if (p < 1) requestAnimationFrame(step);
      else setValue(target);
    };
    requestAnimationFrame(step);
  }, [active, target]);
  return value;
}

function StatItem({
  target,
  suffix,
  label,
  delay,
}: {
  target: number;
  suffix: string;
  label: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [counted, setCounted] = useState(false);
  const count = useCountUp(target, counted);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          setTimeout(() => setCounted(true), delay * 1000);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(30px)",
        transition: `all 0.7s ease ${delay}s`,
      }}
    >
      <div
        style={{
          fontSize: "clamp(40px, 6vw, 72px)",
          fontWeight: 900,
          lineHeight: 1,
          color: "var(--orange)",
          fontFamily: "'Arial Black', sans-serif",
        }}
      >
        {count}
        {suffix}
      </div>
      <div
        style={{
          fontSize: "11px",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          opacity: 0.5,
          marginTop: "8px",
        }}
      >
        {label}
      </div>
    </div>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const [eyebrowVisible, setEyebrowVisible] = useState(false);
  const [litCount, setLitCount] = useState(0);

  // Eyebrow visibility
  useEffect(() => {
    const el = eyebrowRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setEyebrowVisible(true);
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Word reveal on scroll
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const progress = Math.max(
        0,
        Math.min(
          1,
          (window.innerHeight - rect.top) / (window.innerHeight + rect.height * 0.5)
        )
      );
      setLitCount(Math.floor(progress * TEXT.length * 1.5));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        minHeight: "100vh",
        padding: "100px 40px",
        display: "flex",
        alignItems: "center",
        background: "var(--white)",
        color: "var(--dark)",
      }}
    >
      <div style={{ maxWidth: "900px" }}>
        {/* Eyebrow */}
        <div
          ref={eyebrowRef}
          style={{
            fontSize: "10px",
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: "var(--orange)",
            marginBottom: "48px",
            opacity: eyebrowVisible ? 1 : 0,
            transform: eyebrowVisible ? "none" : "translateX(-20px)",
            transition: "all 0.7s ease",
          }}
        >
          — Who we are
        </div>

        {/* Animated text */}
        <p
          style={{
            fontSize: "clamp(22px, 3.5vw, 44px)",
            lineHeight: 1.3,
            fontWeight: 400,
            fontFamily: "Arial, sans-serif",
          }}
        >
          {TEXT.map((item, i) => (
            <span
              key={i}
              style={{
                display: "inline-block",
                opacity: i < litCount ? 1 : 0.15,
                color: item.accent && i < litCount ? "var(--orange)" : undefined,
                transition: "opacity 0.4s ease, color 0.4s ease",
                marginRight: "0.25em",
              }}
            >
              {item.word}
            </span>
          ))}
        </p>

        {/* Stats */}
        <div
          style={{
            marginTop: "80px",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "40px",
          }}
        >
          {STATS.map((s, i) => (
            <StatItem
              key={s.label}
              target={s.target}
              suffix={s.suffix}
              label={s.label}
              delay={i * 0.15}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
