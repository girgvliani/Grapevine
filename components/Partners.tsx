"use client";

import { useEffect, useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { useLang } from "./LanguageProvider";
import { useMediaQuery, SHORT_QUERY, WIDE_QUERY } from "@/lib/useMediaQuery";

import logo01 from "./assets/partnerlogos/Frame 1597883296.png";
import logo02 from "./assets/partnerlogos/Rectangle.png";
import logo03 from "./assets/partnerlogos/Vector (1).png";
import logo04 from "./assets/partnerlogos/Rectangle (1).png";
import logo05 from "./assets/partnerlogos/Group.png";
import logo06 from "./assets/partnerlogos/Frame 1597883297.png";
import logo07 from "./assets/partnerlogos/Isolation_Mode.png";
import logo08 from "./assets/partnerlogos/Isolation_Mode (1).png";
import logo09 from "./assets/partnerlogos/Frame 1597883298.png";
import logo10 from "./assets/partnerlogos/Frame 1597883298 (1).png";
import logo11 from "./assets/partnerlogos/Isolation_Mode (2).png";
import logo12 from "./assets/partnerlogos/Isolation_Mode (3).png";
import logo13 from "./assets/partnerlogos/Isolation_Mode (4).png";
import logo14 from "./assets/partnerlogos/Frame 1597883299.png";
import logo15 from "./assets/partnerlogos/Isolation_Mode (5).png";
import logo16 from "./assets/partnerlogos/Frame 1597883304.png";
import logo17 from "./assets/partnerlogos/Frame 1597883301.png";
import logo18 from "./assets/partnerlogos/Frame 1597883305.png";
import logo19 from "./assets/partnerlogos/Group (1).png";
import logo20 from "./assets/partnerlogos/Frame 1597883303.png";

type LogoEntry = {
  src: StaticImageData;
  alt: string;
  col: number;   // 1-based grid column
  row: number;   // 1-based grid row (1=top, 2=mid, 3=bottom)
  w: number;     // logo render width in px
  dx?: number;   // horizontal nudge for asymmetry
  dy?: number;   // vertical nudge for asymmetry
  maxH?: number; // max height cap in px (for tall/narrow logos)
};

// Grid constants
const GRID_LEFT  = 280;  // px from track left where logo grid starts (heading lives here)
const COL_W      = 225;  // px per grid column
const ROW_H      = 160;  // px per row — extra breathing room between logos
const GRID_COLS  = 8;    // 5 visible + 3 scrollable cols (all filled with logos)

// Logos: col/row set the grid cell, dx/dy nudge within the cell for scattered look.
// Identified from screenshot:
//   logo01 = Ministry of Foreign Affairs circle
//   logo02 = Tbilisi State University circle
//   logo03 = Headvice Academy (tall H — constrained with maxH)
//   logo04 = Hera XXI
//   logo05 = 8000 Vintages
//   logo06 = ჭინჭა
//   logo07 = ნრომი
//   logo08 = HiPP
//   logo09 = APA (alt version)
//   logo10 = APA Agency of Protected Areas
//   logo11 = Kärcher
//   logo12 = ALTA / ალბა
const LOGOS: LogoEntry[] = [
  // ── Visible columns 1-5 ──────────────────────────────────────────
  // Col 1 — two circles + Hera XXI
  { src: logo02, alt: "Tbilisi State University",   col: 2, row: 1, w: 125, dx:  20, dy: -25 },
  { src: logo01, alt: "Ministry of Foreign Affairs", col: 1, row: 2, w: 115, dx: -10, dy:   5 },
  { src: logo04, alt: "Hera XXI",                    col: 2, row: 3, w: 110, dx:  35, dy:  15 },
  // Col 2 — Headvice only (mid row)
  { src: logo03, alt: "Headvice Academy",            col: 2, row: 2, w: 90,  dx:  25, dy: -15, maxH: 88 },
  // Col 3 — 8000 Vintages / ჭინჭა / APA
  { src: logo05, alt: "8000 Vintages",               col: 3, row: 1, w: 125, dx: -25, dy: -20 },
  { src: logo06, alt: "ჭინჭა",                      col: 3, row: 2, w: 150, dx:  10, dy:  10 },
  { src: logo10, alt: "Agency of Protected Areas",   col: 3, row: 3, w: 150, dx: -15, dy:  10 },
  // Col 4 — ნრომი / HiPP
  { src: logo07, alt: "ნრომი",                      col: 4, row: 1, w: 150, dx:  20, dy: -20 },
  { src: logo08, alt: "HiPP",                        col: 4, row: 2, w: 125, dx: -15, dy:  15 },
  // Col 5 — Kärcher / ALTA
  { src: logo11, alt: "Kärcher",                     col: 5, row: 1, w: 180, dx: -20, dy: -25 },
  { src: logo12, alt: "ALTA",                        col: 5, row: 2, w: 145, dx:  15, dy:  20 },

  // ── Scrollable columns 6-9 ───────────────────────────────────────
  { src: logo09, alt: "Partner", col: 6, row: 1, w: 120, dx: -15, dy: -20 },
  { src: logo13, alt: "Partner", col: 6, row: 2, w: 135, dx:  20, dy:  10 },
  { src: logo14, alt: "Partner", col: 6, row: 3, w: 110, dx: -10, dy:  15 },
  { src: logo15, alt: "Partner", col: 7, row: 1, w: 125, dx:  15, dy: -15 },
  { src: logo16, alt: "Partner", col: 7, row: 2, w: 120, dx: -20, dy:   5 },
  { src: logo17, alt: "Partner", col: 7, row: 3, w: 110, dx:  10, dy:  10 },
  { src: logo18, alt: "Partner", col: 8, row: 1, w:  90, dx: -10, dy: -20 },
  { src: logo19, alt: "Partner", col: 8, row: 2, w: 130, dx:  20, dy:  15 },
  { src: logo20, alt: "Partner", col: 8, row: 3, w:  80, dx: -20, dy:   5 },
];

export default function Partners() {
  const { t } = useLang();
  const isShort = useMediaQuery(SHORT_QUERY);
  const isWide = useMediaQuery(WIDE_QUERY);
  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [outerHeight, setOuterHeight] = useState("300vh");

  // On short viewports, shrink the logos + grid spacing so the section fits.
  // On wide screens, enlarge just the logos (keep the grid spacing) so nothing overflows.
  const gridScale = isShort ? 0.68 : isWide ? 1.2 : 1;
  const logoScale = isShort ? 0.68 : isWide ? 1.2 : 1;
  const colW = COL_W * gridScale;
  const rowH = ROW_H * gridScale;
  const gridLeft = GRID_LEFT * gridScale;
  const gridTop = 76 * gridScale; // 4.75rem ≈ 76px
  const trackW = gridLeft + GRID_COLS * colW;

  useEffect(() => {
    const outer = outerRef.current;
    const track = trackRef.current;
    if (!outer || !track) return;

    const getMaxShift = () => Math.max(0, trackW - window.innerWidth);

    const computeHeight = () => {
      setOuterHeight(`${getMaxShift() + window.innerHeight + 200}px`);
    };

    const update = () => {
      const rect = outer.getBoundingClientRect();
      const scrollRange = rect.height - window.innerHeight;
      if (scrollRange <= 0) return;
      const progress = Math.max(0, Math.min(1, -rect.top / scrollRange));
      track.style.transform = `translateX(-${progress * getMaxShift()}px)`;
    };

    const raf = requestAnimationFrame(() => {
      computeHeight();
      update();
    });

    window.addEventListener("resize", computeHeight);
    window.addEventListener("scroll", update, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", computeHeight);
      window.removeEventListener("scroll", update);
    };
  }, [trackW]);

  return (
    <div ref={outerRef} style={{ height: outerHeight, position: "relative" }}>
      <section
        id="partners"
        style={{
          background: "var(--dark)",
          overflow: "hidden",
          position: "sticky",
          top: 0,
          height: isShort ? "31rem" : isWide ? "54rem" : "41.0625rem", // 657px — grown to fit taller rows without clipping
        }}
      >
        {/* Centre the content area vertically inside the section */}
        <div style={{ paddingTop: isShort ? "5rem" : "6.0625rem", paddingBottom: isShort ? "3rem" : "6.0625rem" }}>
          <div
            ref={trackRef}
            style={{
              position: "relative",
              width: `${trackW}px`,
              height: isShort ? "23rem" : isWide ? "42rem" : "34.75rem", // 556px (grid offset + 3 taller rows)
              willChange: "transform",
              transition: "transform 0.05s linear",
            }}
          >
            {/* Heading — scrolls with logos */}
            <h2
              style={{
                position: "absolute",
                left: "3rem",
                top: "0.5rem",
                fontSize: "clamp(2.5rem, 5.5vw, 5rem)",
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "-0.02em",
                color: "var(--orange)",
                fontFamily: "var(--font-heading)",
                whiteSpace: "nowrap",
                lineHeight: 1,
              }}
            >
              {t.partners.heading}
            </h2>

            {/* Logo grid — CSS grid for placement, transform for asymmetry */}
            <div
              style={{
                position: "absolute",
                left: `${gridLeft}px`,
                top: `${gridTop}px`,
                display: "grid",
                gridTemplateColumns: `repeat(${GRID_COLS}, ${colW}px)`,
                gridTemplateRows: `repeat(3, ${rowH}px)`,
              }}
            >
              {LOGOS.map((logo, i) => (
                <div
                  key={i}
                  style={{
                    gridColumn: `${logo.col}`,
                    gridRow: `${logo.row}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transform: `translate(${(logo.dx ?? 0) * gridScale}px, ${(logo.dy ?? 0) * gridScale}px)`,
                  }}
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    style={{
                      width: `${logo.w * logoScale}px`,
                      height: "auto",
                      objectFit: "contain",
                      maxHeight: logo.maxH ? `${logo.maxH * logoScale}px` : undefined,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
