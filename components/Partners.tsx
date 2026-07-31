"use client";

import { useEffect, useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { useLang } from "./LanguageProvider";
import { useMediaQuery, MOBILE_QUERY, TABLET_QUERY, SHORT_QUERY, WIDE_QUERY } from "@/lib/useMediaQuery";
import { CLIENT_LOGOS } from "./assets/clientLogos";

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
const COL_W      = 225;  // px per grid column
const ROW_H      = 160;  // px per row — extra breathing room between logos
const GRID_LEFT  = 280;  // px from track left where logo grid starts (heading lives here)
const GRID_COLS  = 8;    // 5 visible + 3 scrollable cols (all filled with logos)

// Scattered placements (col/row set the grid cell; dx/dy nudge within the cell).
// The 18 client logos are zipped onto these slots in order.
const POSITIONS: Omit<LogoEntry, "src" | "alt">[] = [
  { col: 2, row: 1, w: 125, dx:  20, dy: -25 },
  { col: 1, row: 2, w: 115, dx: -10, dy:   5 },
  { col: 2, row: 3, w: 110, dx:  35, dy:  15 },
  { col: 2, row: 2, w: 90,  dx:  25, dy: -15 },
  { col: 3, row: 1, w: 125, dx: -25, dy: -20 },
  { col: 3, row: 2, w: 150, dx:  10, dy:  10 },
  { col: 3, row: 3, w: 150, dx: -15, dy:  10 },
  { col: 4, row: 1, w: 150, dx:  20, dy: -20 },
  { col: 4, row: 2, w: 125, dx: -15, dy:  15 },
  { col: 5, row: 1, w: 160, dx: -20, dy: -25 },
  { col: 5, row: 2, w: 145, dx:  15, dy:  20 },
  { col: 6, row: 1, w: 120, dx: -15, dy: -20 },
  { col: 6, row: 2, w: 135, dx:  20, dy:  10 },
  { col: 6, row: 3, w: 110, dx: -10, dy:  15 },
  { col: 7, row: 1, w: 125, dx:  15, dy: -15 },
  { col: 7, row: 2, w: 120, dx: -20, dy:   5 },
  { col: 7, row: 3, w: 110, dx:  10, dy:  10 },
  { col: 8, row: 2, w: 120, dx: -10, dy:  -5 },
];

const LOGOS: LogoEntry[] = POSITIONS.map((pos, i) => ({
  ...pos,
  src: CLIENT_LOGOS[i].src,
  alt: CLIENT_LOGOS[i].alt,
}));

export default function Partners() {
  const { t } = useLang();
  // Scroll-jacked horizontal track is desktop-only. On tablet/mobile the logos
  // flow in a normal centered wrap (see the early return below).
  const isTablet = useMediaQuery(TABLET_QUERY);
  const isMobile = useMediaQuery(MOBILE_QUERY);
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
    if (isTablet) return;
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
  }, [trackW, isTablet]);

  // Tablet / mobile: no scroll-jacking — heading on top, logos in a centered wrap.
  if (isTablet) {
    const logoScaleStatic = isMobile ? 0.7 : 0.85;
    return (
      <section
        id="partners"
        style={{
          background: "var(--dark)",
          overflow: "hidden",
          padding: "clamp(4rem, 8vh, 6rem) clamp(1.5rem, 5vw, 3rem)",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(2.5rem, 7vw, 4rem)",
            fontWeight: 900,
            textTransform: "uppercase",
            letterSpacing: "-0.02em",
            color: "var(--orange)",
            fontFamily: "var(--font-heading)",
            lineHeight: 1,
            marginBottom: "2.5rem",
          }}
        >
          {t.partners.heading}
        </h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: isMobile ? "1rem" : "1.25rem",
          }}
        >
          {LOGOS.map((logo, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: `${logo.w * logoScaleStatic}px`,
              }}
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "contain",
                  maxHeight: logo.maxH ? `${logo.maxH * logoScaleStatic}px` : undefined,
                }}
              />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <div ref={outerRef} style={{ height: outerHeight, position: "relative" }}>
      <section
        id="partners"
        style={{
          background: "var(--dark)",
          overflow: "hidden",
          position: "sticky",
          top: 0,
          height: isShort ? "31rem" : isWide ? "54rem" : "41.0625rem",
        }}
      >
        <div style={{ paddingTop: isShort ? "5rem" : "6.0625rem", paddingBottom: isShort ? "3rem" : "6.0625rem" }}>
          <div
            ref={trackRef}
            style={{
              position: "relative",
              width: `${trackW}px`,
              height: isShort ? "23rem" : isWide ? "42rem" : "34.75rem",
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