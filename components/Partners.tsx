
"use client";

import Image from "next/image";
import FastMarquee from "react-fast-marquee";
import { useLang } from "./LanguageProvider";
import { useMediaQuery, MOBILE_QUERY, TABLET_QUERY, SHORT_QUERY, WIDE_QUERY } from "@/lib/useMediaQuery";
import { CLIENT_LOGOS, type ClientLogo } from "./assets/clientLogos";
import { mtavruli } from "@/lib/i18n";

// Where a tile sits in the scattered grid. Purely positional — a slot knows
// nothing about which logo lands in it, so reordering CLIENT_LOGOS leaves
// the composition intact.
type Slot = {
  col: number;   // 1-based grid column
  row: number;   // 1-based grid row (1=top, 2=mid, 3=bottom)
  dx?: number;   // horizontal nudge for asymmetry
  dy?: number;   // vertical nudge for asymmetry
};

type LogoEntry = ClientLogo & Slot;

// Grid constants
const COL_W      = 225;  // px per grid column
const ROW_H      = 160;  // px per row — extra breathing room between logos
const GRID_COLS  = 8;
const LOGO_BOOST = 1.15; // enlarge each logo tile ~15% (box size — logo art itself is boosted via LOGO_PADDING below)
const TRACK_GAP   = 96;  // px gap between repeated copies of the scattered block

// Scattered placements (col/row set the grid cell; dx/dy nudge within the cell).
// The 18 client logos are zipped onto these slots in order.
const POSITIONS: Slot[] = [
  { col: 2, row: 1, dx:  20, dy: -25 },
  { col: 1, row: 2, dx: -10, dy:   5 },
  { col: 2, row: 3, dx:  35, dy:  15 },
  { col: 2, row: 2, dx:  25, dy: -15 },
  { col: 3, row: 1, dx: -25, dy: -20 },
  { col: 3, row: 2, dx:  10, dy:  10 },
  { col: 3, row: 3, dx: -15, dy:  10 },
  { col: 4, row: 1, dx:  20, dy: -20 },
  { col: 4, row: 2, dx: -15, dy:  15 },
  { col: 5, row: 1, dx: -20, dy: -25 },
  { col: 5, row: 2, dx:  15, dy:  20 },
  { col: 6, row: 1, dx: -15, dy: -20 },
  { col: 6, row: 2, dx:  20, dy:  10 },
  { col: 6, row: 3, dx: -10, dy:  15 },
  { col: 7, row: 1, dx:  15, dy: -15 },
  { col: 7, row: 2, dx: -20, dy:   5 },
  { col: 7, row: 3, dx:  10, dy:  10 },
  { col: 8, row: 2, dx: -10, dy:  -5 },
];

const LOGOS: LogoEntry[] = POSITIONS.map((pos, i) => ({
  ...CLIENT_LOGOS[i],
  ...pos,
}));

function LogoTile({ logo, scale }: { logo: ClientLogo; scale: number }) {
  return (
    <div
      style={{
        background: logo.bg,
        borderRadius: "0.9rem",
        padding: `${4 * scale}px ${6 * scale}px`,
        width: `${logo.w * scale * LOGO_BOOST}px`,
        height: `${(logo.maxH ?? 92) * scale * LOGO_BOOST}px`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 0.5rem 1.25rem -0.75rem rgba(0,0,0,0.35)",
      }}
    >
      <Image
        src={logo.src}
        alt={logo.alt}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          transform: logo.imageScale ? `scale(${logo.imageScale})` : undefined,
        }}
      />
    </div>
  );
}

export default function Partners() {
  const { t } = useLang();
  // Tablet/mobile: logos flow in a static centered wrap. Desktop: the
  // original scattered-grid composition auto-scrolls as a single repeating
  // block, heading stays put above it.
  const isTablet = useMediaQuery(TABLET_QUERY);
  const isMobile = useMediaQuery(MOBILE_QUERY);
  const isShort = useMediaQuery(SHORT_QUERY);
  const isWide = useMediaQuery(WIDE_QUERY);

  // On short viewports, shrink the logos + grid spacing so the section fits.
  // On wide screens, enlarge just the logos (keep the grid spacing) so nothing overflows.
  const gridScale = isShort ? 0.68 : isWide ? 1.2 : 1;
  const logoScale = isShort ? 0.68 : isWide ? 1.2 : 1;
  const colW = COL_W * gridScale;
  const rowH = ROW_H * gridScale;
  const trackW = GRID_COLS * colW;
  const trackH = 3 * rowH;

  const heading = (
    <h2
      style={{
        fontSize: "clamp(2.5rem, 7vw, 4rem)",
        fontWeight: 900,
        letterSpacing: "-0.02em",
        color: "var(--orange)",
        fontFamily: "var(--font-heading)",
        lineHeight: 1,
        marginBottom: "2.5rem",
      }}
    >
      {mtavruli(t.partners.heading)}
    </h2>
  );

  // Tablet / mobile: static centered wrap, no scrolling.
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
        {heading}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: isMobile ? "1rem" : "1.25rem",
          }}
        >
          {CLIENT_LOGOS.map((logo, i) => (
            <LogoTile key={i} logo={logo} scale={logoScaleStatic} />
          ))}
        </div>
      </section>
    );
  }

  // Desktop: heading stays fixed on top; the whole scattered-grid block
  // below auto-scrolls, repeating itself seamlessly (autoFill duplicates
  // this single block as many times as needed to fill and loop).
  return (
    <section
      id="partners"
      style={{
        background: "var(--dark)",
        overflow: "hidden",
        padding: isShort ? "5rem 0 3rem" : "6.0625rem 0",
      }}
    >
      <div style={{ padding: "0 3rem" }}>{heading}</div>
      <FastMarquee autoFill speed={50} gradient={false}>
        <div style={{ position: "relative", width: `${trackW}px`, height: `${trackH}px`, marginRight: `${TRACK_GAP}px` }}>
          {LOGOS.map((logo, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: `${(logo.col - 1) * colW}px`,
                top: `${(logo.row - 1) * rowH}px`,
                width: `${colW}px`,
                height: `${rowH}px`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: `translate(${(logo.dx ?? 0) * gridScale}px, ${(logo.dy ?? 0) * gridScale}px)`,
              }}
            >
              <LogoTile logo={logo} scale={logoScale} />
            </div>
          ))}
        </div>
      </FastMarquee>
    </section>
  );
}
