import { type StaticImageData } from "next/image";

// Shared client / partner logos, used by both the Partners section and the
// Portfolio ("brands we've worked with"). Files live in assets/partnerlogos/.
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

export type ClientLogo = { src: StaticImageData; alt: string };

export const CLIENT_LOGOS: ClientLogo[] = [
  { src: l01, alt: "ICF Sakartvelo Chapter" },
  { src: l02, alt: "GEO GPS" },
  { src: l03, alt: "Family Kids Kindergarten" },
  { src: l04, alt: "Blits Dental" },
  { src: l05, alt: "Client logo" },
  { src: l06, alt: "Client logo" },
  { src: l07, alt: "Hera XXI" },
  { src: l08, alt: "Smart Store" },
  { src: l09, alt: "FINO Audit & Accounting" },
  { src: l10, alt: "Bariatric & Metabolic Medicine Center" },
  { src: l11, alt: "European Language Institute Georgia" },
  { src: l12, alt: "Fermino" },
  { src: l13, alt: "American Hospital Tbilisi" },
  { src: l14, alt: "Komuna" },
  { src: l15, alt: "DAC Components" },
  { src: l16, alt: "Client logo" },
  { src: l17, alt: "Client logo" },
  { src: l18, alt: "4Hospitals Medical Company" },
];