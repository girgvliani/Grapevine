import { type StaticImageData } from "next/image";
import img01 from "./assets/portfolioProjects/image01-rounded.png";
import img02 from "./assets/portfolioProjects/image02-rounded.png";
import img03 from "./assets/portfolioProjects/image03-rounded.png";
import img04 from "./assets/portfolioProjects/image04-rounded.png";
import img05 from "./assets/portfolioProjects/image05-rounded.png";
import img06 from "./assets/portfolioProjects/image06-rounded.png";
import img07 from "./assets/portfolioProjects/image07-rounded.png";
import img08 from "./assets/portfolioProjects/image08-rounded.png";
import img09 from "./assets/portfolioProjects/image09-rounded.png";
import img10 from "./assets/portfolioProjects/image10-rounded.png";
import diplomatImg from "./assets/portfolio/diplomat-rounded.png";
import bookImg from "./assets/portfolio/book-rounded.png";
import sameriImg from "./assets/portfolio/sameri-rounded.png";

export type PortfolioCategory =
  | "full"
  | "digital"
  | "content"
  | "campaign"
  | "branding"
  | "web";

export type PortfolioProject = {
  id: string;
  category: PortfolioCategory;
  bg: string; // card colour (also the background for text-only cards)
  image?: StaticImageData; // undefined = text-only card until a logo is supplied
  // Full case study on the agency's Behance profile, where one has been
  // published. Only these cards are clickable — the rest have no case study to
  // send anyone to, so they deliberately carry no link and no arrow badge.
  behanceUrl?: string;
};

// Real projects from საიტისთვის.md. `id` keys the name/description in i18n
// (t.portfolio.projects). Order follows the source document.
export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  { id: "nodi",                category: "full",     bg: "#4E7CF6", image: img01, behanceUrl: "https://www.behance.net/gallery/252053691/NODI-Branding-Social-media" },
  { id: "komuna",              category: "full",     bg: "#1F5C4D", image: img02, behanceUrl: "https://www.behance.net/gallery/167859519/Komunn-Branding" },
  { id: "dac",                 category: "digital",  bg: "#C0392B", image: img03 },
  { id: "blits-dental",        category: "digital",  bg: "#2AA9B5", image: img04 },
  { id: "american-hospital",   category: "content",  bg: "#2C3E7A", image: img05 },
  { id: "diplomat",            category: "content",  bg: "#8E44AD", image: diplomatImg },
  { id: "tbilisi-book-capital", category: "campaign", bg: "#E8541A", image: bookImg },
  { id: "fino",                category: "campaign", bg: "#16A085", image: img06, behanceUrl: "https://www.behance.net/gallery/249986571/Fino-13-Years-Campaign" },
  { id: "chita",               category: "branding", bg: "#E67E22", image: img07, behanceUrl: "https://www.behance.net/gallery/185733195/Chita-Branding" },
  { id: "smart-store",         category: "branding", bg: "#2C3E50", image: img08, behanceUrl: "https://www.behance.net/gallery/250534073/Smart-Store-Branding" },
  { id: "samery",              category: "branding", bg: "#902793", image: sameriImg, behanceUrl: "https://www.behance.net/gallery/168127165/Sameri-Branding" },
  { id: "eli",                 category: "web",      bg: "#2B6CB0", image: img09 },
  { id: "veronika",            category: "web",      bg: "#D35400" },
  { id: "geogps",              category: "web",      bg: "#111111", image: img10 },
];

// Filter order for the category chips.
export const PORTFOLIO_CATEGORY_ORDER: PortfolioCategory[] = [
  "full",
  "digital",
  "content",
  "campaign",
  "branding",
  "web",
];