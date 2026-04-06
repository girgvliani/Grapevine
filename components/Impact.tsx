"use client";

import { useEffect, useRef, useState } from "react";

const ITEMS = [
  {
    count: 300,
    suffix: "+",
    label: "% avg. growth",
    desc: "Brands that work with us grow measurably in the first 90 days.",
  },
  {
    count: 120,
    suffix: "+",
    label: "Brands untangled",
    desc: "From startups to established players, every story matters.",
  },
  {
    count: 98,
    suffix: "%",
    label: "Client retention",
    desc: "We don't just win projects — we build long-term growth partners.",
  },
  {
    count: 5,
    suffix: "",
    label: "Years of clarity",
    desc: "Half a decade of untangling brands across industries.",
  },
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

function ImpactItem({
  item,
  delay,
}: {
  item: (typeof ITEMS)[0];
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [counted, setCounted] = useState(false);
  const count = useCountUp(item.count, counted);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          setCounted(true);
          io.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        padding: "48px 32px",
        borderRight: "1px solid rgba(0,0,0,0.1)",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(30px)",
        transition: `all 0.7s ease ${delay}s`,
      }}
    >
      <div
        style={{
          fontSize: "clamp(40px, 5vw, 64px)",
          fontWeight: 900,
          lineHeight: 1,
          fontFamily: "'Arial Black', sans-serif",
          color: "var(--orange)",
        }}
      >
        {count}
        {item.suffix}
      </div>
      <div
        style={{
          fontSize: "11px",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          opacity: 0.5,
          marginTop: "12px",
        }}
      >
        {item.label}
      </div>
      <div
        style={{
          fontSize: "12px",
          opacity: 0.6,
          marginTop: "8px",
          lineHeight: 1.7,
        }}
      >
        {item.desc}
      </div>
    </div>
  );
}

export default function Impact() {
  return (
    <section
      id="impact"
      style={{
        minHeight: "100vh",
        padding: "100px 40px",
        background: "var(--cream)",
        color: "var(--dark)",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div style={{ width: "100%" }}>
        <h2
          style={{
            fontSize: "clamp(40px, 7vw, 100px)",
            fontWeight: 900,
            textTransform: "uppercase",
            fontFamily: "'Arial Black', sans-serif",
            lineHeight: 0.9,
            letterSpacing: "-0.03em",
            marginBottom: "80px",
            maxWidth: "800px",
          }}
        >
          Results
          <br />
          <span style={{ color: "var(--orange)" }}>Speak.</span>
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            borderTop: "2px solid var(--dark)",
          }}
        >
          {ITEMS.map((item, i) => (
            <ImpactItem key={item.label} item={item} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
