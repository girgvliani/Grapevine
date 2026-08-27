import { type StaticImageData } from "next/image";

// Shared client / partner logos, consumed by the Partners section.
// Files live in assets/partnerlogos/.
// Alt text uses the brand name where legible, otherwise a generic label.
import l01 from "./partnerlogos/image00001-Photoroom.png";
import l02 from "./partnerlogos/image00002-Photoroom.png";
import l03 from "./partnerlogos/image00003-Photoroom.png";
import l04 from "./partnerlogos/image00004-Photoroom.png";
import l05 from "./partnerlogos/image00005-Photoroom.png";
import l06 from "./partnerlogos/image00006-Photoroom.png";
import l07 from "./partnerlogos/image00007-Photoroom.png";
import l08 from "./partnerlogos/image00008-Photoroom.png";
import l09 from "./partnerlogos/image00009-Photoroom.png";
import l10 from "./partnerlogos/image00010-Photoroom.png";
import l11 from "./partnerlogos/image00011-Photoroom.png";
import l12 from "./partnerlogos/image00012-Photoroom.png";
import l13 from "./partnerlogos/image00013-Photoroom.png";
import l14 from "./partnerlogos/image00014-Photoroom.png";
import l15 from "./partnerlogos/image00015-Photoroom.png";
import l16 from "./partnerlogos/image00016-Photoroom.png";
import l17 from "./partnerlogos/image00017-Photoroom.png";
import l18 from "./partnerlogos/IMG_5695-Photoroom.png";

export type ClientLogo = {
  src: StaticImageData;
  alt: string;
  bg: string;    // tile background colour
  w: number;     // logo render width in px
  maxH?: number; // max height cap in px (for tall/narrow logos)
  imageScale?: number; // visually enlarges the logo art within its tile without
                        // resizing the tile itself (default 1 = no change)
};

// `bg` = the tile colour behind each (transparent) logo. Brand-aligned soft
// pastels for dark/colourful logos; deeper tones for the white/light logos
// (Blits, Smart Store, Fermino, l17) so they stay legible.
//
// `bg` and `w` are per-logo and travel with the entry, so reordering this array
// reorders the section without disturbing any logo's colour or render size.
// Grid placement (column/row/nudge) lives separately in Partners.tsx.
export const CLIENT_LOGOS: ClientLogo[] = [
  { src: l11, alt: "American Hospital Tbilisi", bg: "#FFD8C7", w: 145 },
  { src: l04, alt: "Blits Dental", bg: "#7C4DBE", w: 90 },
  { src: l17, alt: "Client logo", bg: "#3E5AA8", w: 110 },
  { src: l15, alt: "DAC Components", bg: "#D2E3F7", w: 125 },
  { src: l14, alt: "Komuna", bg: "#FFF0BD", w: 110 },
  { src: l16, alt: "Client logo", bg: "#D8D4FF", w: 120 },
  { src: l07, alt: "Hera XXI", bg: "#D8D4FF", w: 150 },
  { src: l09, alt: "FINO Audit & Accounting", bg: "#FFF0BD", w: 125 },
  { src: l10, alt: "Bariatric & Metabolic Medicine Center", bg: "#CDEBDA", w: 160, imageScale: 1.3 },
  { src: l06, alt: "Client logo", bg: "#D2E3F7", w: 150 },
  { src: l03, alt: "Family Kids Kindergarten", bg: "#CDEBDA", w: 110 },
  { src: l02, alt: "GEO GPS", bg: "#FFF0BD", w: 115 },
  { src: l05, alt: "Client logo", bg: "#FFD8C7", w: 125 },
  { src: l12, alt: "Fermino", bg: "#2E6B4A", w: 120 },
  { src: l13, alt: "European Language Institute Georgia", bg: "#D8D4FF", w: 135 },
  { src: l18, alt: "4Hospitals Medical Company", bg: "#FFD8C7", w: 120 },
  { src: l01, alt: "ICF Sakartvelo Chapter", bg: "#D8D4FF", w: 125 },
  { src: l08, alt: "Smart Store", bg: "#2E3A6E", w: 150 },
];
