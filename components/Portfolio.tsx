"use client";

import { useEffect, useRef, useState } from "react";

const PROJECTS = [
  {
    id: 1,
    title: "Fino 13 Years Campaign",
    desc: "The prerequisites for growth; the opening of new opportunities and events.",
    bg: "#E8541A",
    visual: (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", gap: "10px", flexWrap: "wrap", padding: "24px" }}>
        {["🟠", "🔵", "🟡", "🔴"].map((c, i) => (
          <div key={i} style={{ width: "48px", height: "48px", borderRadius: "50%", background: "rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px" }}>{c}</div>
        ))}
      </div>
    ),
  },
  {
    id: 2,
    title: "Fino 13 Years Campaign",
    desc: "The prerequisites for growth; the opening of new opportunities and events.",
    bg: "#2B6CB0",
    visual: (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: "24px" }}>
        <div style={{ color: "#fff", fontSize: "32px", fontWeight: 900, letterSpacing: "-0.02em", fontFamily: "Arial Black, sans-serif" }}>FINO</div>
        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "10px", letterSpacing: "0.2em", marginTop: "6px", textTransform: "uppercase" }}>Audit & Accounting</div>
      </div>
    ),
  },
  {
    id: 3,
    title: "Fino 13 Years Campaign",
    desc: "The prerequisites for growth; the opening of new opportunities and events.",
    bg: "#111111",
    visual: (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: "24px" }}>
        <div style={{ color: "#fff", fontSize: "28px", fontWeight: 900, letterSpacing: "0.08em", fontFamily: "Arial Black, sans-serif", textAlign: "center", lineHeight: 1 }}>
          N|W<br />
          <span style={{ fontSize: "12px", letterSpacing: "0.3em", fontWeight: 400 }}>NEW WORD</span>
        </div>
      </div>
    ),
  },
  {
    id: 4,
    title: "Brand Identity",
    desc: "The prerequisites for growth; the opening of new opportunities and events.",
    bg: "#902793",
    visual: (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", padding: "24px" }}>
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <circle cx="40" cy="40" r="30" stroke="rgba(255,255,255,0.4)" strokeWidth="2" fill="none" />
          <circle cx="40" cy="40" r="18" stroke="rgba(255,255,255,0.6)" strokeWidth="2" fill="none" />
          <circle cx="40" cy="40" r="6" fill="white" />
        </svg>
      </div>
    ),
  },
  {
    id: 5,
    title: "Digital Campaign",
    desc: "The prerequisites for growth; the opening of new opportunities and events.",
    bg: "#1A5C3A",
    visual: (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", padding: "24px" }}>
        <svg width="80" height="60" viewBox="0 0 80 60" fill="none">
          <path d="M10 50 L25 20 L40 35 L55 10 L70 30" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <circle cx="70" cy="30" r="4" fill="white" />
        </svg>
      </div>
    ),
  },
  {
    id: 6,
    title: "Social Media Strategy",
    desc: "The prerequisites for growth; the opening of new opportunities and events.",
    bg: "#C0392B",
    visual: (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", padding: "24px", gap: "14px" }}>
        {[40, 60, 45, 70, 35].map((h, i) => (
          <div key={i} style={{ width: "16px", height: `${h}px`, background: "rgba(255,255,255,0.5)", borderRadius: "4px" }} />
        ))}
      </div>
    ),
  },
  {
    id: 7,
    title: "SEO Optimisation",
    desc: "The prerequisites for growth; the opening of new opportunities and events.",
    bg: "#2C3E50",
    visual: (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", padding: "24px" }}>
        <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
          <circle cx="38" cy="38" r="22" stroke="rgba(255,255,255,0.6)" strokeWidth="4" fill="none" />
          <line x1="54" y1="54" x2="76" y2="76" stroke="rgba(255,255,255,0.6)" strokeWidth="4" strokeLinecap="round" />
          <circle cx="30" cy="38" r="3" fill="rgba(255,255,255,0.8)" />
          <circle cx="43" cy="38" r="3" fill="rgba(255,255,255,0.8)" />
        </svg>
      </div>
    ),
  },
  {
    id: 8,
    title: "Web Development",
    desc: "The prerequisites for growth; the opening of new opportunities and events.",
    bg: "#E67E22",
    visual: (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: "24px", gap: "8px" }}>
        {["</>", "{ }", "[ ]"].map((sym, i) => (
          <div key={i} style={{ color: "rgba(255,255,255,0.7)", fontSize: "22px", fontFamily: "monospace", fontWeight: 700 }}>{sym}</div>
        ))}
      </div>
    ),
  },
  {
    id: 9,
    title: "Visual Identity",
    desc: "The prerequisites for growth; the opening of new opportunities and events.",
    bg: "#AFA9FF",
    visual: (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", padding: "24px" }}>
        <svg width="100" height="80" viewBox="0 0 100 80" fill="none">
          <rect x="10" y="10" width="35" height="35" rx="4" fill="rgba(26,5,18,0.3)" />
          <rect x="55" y="10" width="35" height="35" rx="4" fill="rgba(26,5,18,0.2)" />
          <rect x="10" y="50" width="35" height="22" rx="4" fill="rgba(26,5,18,0.2)" />
          <rect x="55" y="50" width="35" height="22" rx="4" fill="rgba(26,5,18,0.3)" />
        </svg>
      </div>
    ),
  },
];

function ProjectCard({ project, delay }: { project: typeof PROJECTS[0]; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        flexShrink: 0,
        width: "280px",
        height: "360px",
        borderRadius: "16px",
        overflow: "hidden",
        position: "relative",
        background: project.bg,
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(24px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
        cursor: "none",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-6px)";
        (e.currentTarget as HTMLDivElement).style.transition = "transform 0.25s ease";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "none";
        (e.currentTarget as HTMLDivElement).style.transition = "transform 0.3s ease";
      }}
    >
      {/* Visual area */}
      <div style={{ height: "68%", position: "relative" }}>
        {project.visual}
      </div>

      {/* Text overlay */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "20px",
          background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)",
        }}
      >
        <div
          style={{
            fontSize: "13px",
            fontWeight: 700,
            color: "#fff",
            fontFamily: "var(--font-primary)",
            marginBottom: "6px",
            letterSpacing: "0.02em",
          }}
        >
          {project.title}
        </div>
        <div
          style={{
            fontSize: "11px",
            color: "rgba(255,255,255,0.65)",
            fontFamily: "var(--font-primary)",
            lineHeight: 1.6,
          }}
        >
          {project.desc}
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
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

  return (
    <div ref={outerRef} style={{ height: "350vh", position: "relative" }}>
      <section
        id="work"
        style={{
          background: "var(--dark)",
          overflow: "hidden",
          position: "sticky",
          top: 0,
          height: "100vh",
        }}
      >
        {/* Heading */}
        <div style={{ padding: "60px 40px 40px" }}>
          <h2
            style={{
              fontSize: "clamp(40px, 7vw, 80px)",
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "-0.02em",
              color: "var(--orange)",
              fontFamily: "var(--font-heading)",
            }}
          >
            პორტფოლიო
          </h2>
        </div>

        {/* Cards track */}
        <div
          style={{
            padding: "0 40px",
            overflow: "visible",
          }}
        >
          <div
            ref={trackRef}
            style={{
              display: "flex",
              gap: "16px",
              willChange: "transform",
              transition: "transform 0.05s linear",
            }}
          >
            {PROJECTS.map((p, i) => (
              <ProjectCard key={p.id} project={p} delay={i * 0.08} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
