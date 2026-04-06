"use client";

import { useEffect, useRef, useState } from "react";

const STEPS = [
  {
    num: "01 —",
    title: "Discover",
    desc: "We start with listening. Deep dives into your brand, your audience, your mess — no judgment, just clarity-seeking.",
  },
  {
    num: "02 —",
    title: "Untangle",
    desc: "We strip away the noise. Identify what's working, what's not, and where the real opportunity lives.",
  },
  {
    num: "03 —",
    title: "Strategize",
    desc: "A clear roadmap built specifically for your brand. No generic templates, no one-size-fits-all playbooks.",
  },
  {
    num: "04 —",
    title: "Grow",
    desc: "Execute, measure, iterate. We're in it with you — every campaign, every post, every pivot.",
  },
];

function ProcessItem({
  step,
  delay,
}: {
  step: (typeof STEPS)[0];
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

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
    <div
      ref={ref}
      className="process-item"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "40px",
        padding: "40px 0",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateX(-30px)",
        transition: `all 0.7s ease ${delay}s`,
      }}
    >
      <div
        style={{
          fontSize: "11px",
          letterSpacing: "0.3em",
          opacity: 0.3,
          minWidth: "60px",
          color: hovered ? "var(--orange)" : undefined,
          transition: "color 0.3s",
        }}
      >
        {step.num}
      </div>
      <div
        style={{
          fontSize: "clamp(20px, 3vw, 40px)",
          fontWeight: 700,
          textTransform: "uppercase",
          fontFamily: "'Arial Black', sans-serif",
          flex: 1,
          lineHeight: 1,
          letterSpacing: hovered ? "0.1em" : undefined,
          transition: "letter-spacing 0.3s",
        }}
      >
        {step.title}
      </div>
      <div
        style={{
          fontSize: "12px",
          lineHeight: 1.8,
          opacity: 0.4,
          maxWidth: "280px",
          paddingTop: "4px",
        }}
      >
        {step.desc}
      </div>
    </div>
  );
}

export default function Process() {
  return (
    <section
      id="process"
      style={{
        minHeight: "80vh",
        padding: "100px 40px",
        background: "var(--dark)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: "60px",
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
          How We
          <br />
          <span style={{ color: "var(--orange)" }}>Work.</span>
        </h2>
        <span
          style={{ fontSize: "11px", letterSpacing: "0.2em", opacity: 0.3 }}
        >
          04 / Process
        </span>
      </div>

      <div>
        {STEPS.map((step, i) => (
          <ProcessItem key={step.num} step={step} delay={i * 0.1} />
        ))}
      </div>
    </section>
  );
}
