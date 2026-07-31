import { type StaticImageData } from "next/image";
import img01 from "./assets/portfolioProjects/image01.png";
import img02 from "./assets/portfolioProjects/image02.png";
import img03 from "./assets/portfolioProjects/image03.png";
import img04 from "./assets/portfolioProjects/image04.png";
import img05 from "./assets/portfolioProjects/image05.png";
import img06 from "./assets/portfolioProjects/image06.png";
import img07 from "./assets/portfolioProjects/image07.png";
import img08 from "./assets/portfolioProjects/image08.png";
import img09 from "./assets/portfolioProjects/image09.png";
import img10 from "./assets/portfolioProjects/image10.png";

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
};

// Real projects from საიტისთვის.md. `id` keys the name/description in i18n
// (t.portfolio.projects). Order follows the source document.
export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  { id: "nodi",                category: "full",     bg: "#4E7CF6", image: img01 },
  { id: "komuna",              category: "full",     bg: "#1F5C4D", image: img02 },
  { id: "dac",                 category: "digital",  bg: "#C0392B", image: img03 },
  { id: "blits-dental",        category: "digital",  bg: "#2AA9B5", image: img04 },
  { id: "american-hospital",   category: "content",  bg: "#2C3E7A", image: img05 },
  { id: "diplomat",            category: "content",  bg: "#8E44AD" },
  { id: "tbilisi-book-capital", category: "campaign", bg: "#E8541A" },
  { id: "fino",                category: "campaign", bg: "#16A085", image: img06 },
  { id: "chita",               category: "branding", bg: "#E67E22", image: img07 },
  { id: "smart-store",         category: "branding", bg: "#2C3E50", image: img08 },
  { id: "samery",              category: "branding", bg: "#902793" },
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