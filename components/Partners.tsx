"use client";

import { useEffect, useRef } from "react";

const ROW_TOP = [
  { id: 1, name: "Municipal Seal", abbr: "⊙" },
  { id: 2, name: "Georgia", abbr: "🇬🇪" },
  { id: 3, name: "Headvice Academy", abbr: "H" },
  { id: 4, name: "8000 Vintages", abbr: "8000\nvintages" },
  { id: 5, name: "ნეო", abbr: "ნეო" },
  { id: 6, name: "კასა", abbr: "კასა" },
];

const ROW_BOTTOM = [
  { id: 7, name: "HiPP", abbr: "HiPP" },
  { id: 8, name: "Käro", abbr: "KÄR" },
  { id: 9, name: "ახბა", abbr: "ახბა" },
  { id: 10, name: "Nera XXI", abbr: "NERA\nXXI" },
  { id: 11, name: "Partner 11", abbr: "★" },
  { id: 12, name: "Partner 12", abbr: "◆" },
];

export default function Partners() {
  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

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
    <div ref={outerRef} style={{ height: "250vh", position: "relative" }}>
      <section
        id="partners"
        style={{
          background: "var(--dark)",
          overflow: "hidden",
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {/* Heading */}
        <div style={{ padding: "0 40px 48px" }}>
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
            პარტნიორები
          </h2>
        </div>

        {/* Logo track — 2 rows */}
        <div style={{ padding: "0 40px", overflow: "visible" }}>
          <div
            ref={trackRef}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              willChange: "transform",
              transition: "transform 0.05s linear",
            }}
          >
            {[ROW_TOP, ROW_BOTTOM].map((row, rowIdx) => (
              <div key={rowIdx} style={{ display: "flex", gap: "20px" }}>
                {row.map((logo) => (
                  <div
                    key={logo.id}
                    style={{
                      flexShrink: 0,
                      width: "160px",
                      height: "90px",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "16px",
                      transition: "border-color 0.2s, background 0.2s",
                      cursor: "none",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(239,88,58,0.4)";
                      (e.currentTarget as HTMLDivElement).style.background = "rgba(239,88,58,0.06)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.08)";
                      (e.currentTarget as HTMLDivElement).style.background = "transparent";
                    }}
                  >
                    <span
                      style={{
                        color: "rgba(255,255,255,0.55)",
                        fontSize: "14px",
                        fontFamily: "var(--font-primary)",
                        fontWeight: 700,
                        textAlign: "center",
                        whiteSpace: "pre-line",
                        letterSpacing: "0.05em",
                        lineHeight: 1.3,
                      }}
                    >
                      {logo.abbr}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
