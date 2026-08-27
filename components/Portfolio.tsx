"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import FastMarquee from "react-fast-marquee";
import { useLang } from "./LanguageProvider";
import { useMediaQuery, TABLET_QUERY, WIDE_QUERY, HUGE_QUERY } from "@/lib/useMediaQuery";
import { PORTFOLIO_PROJECTS, type PortfolioProject } from "./portfolioConfig";
import { mtavruli } from "@/lib/i18n";
import { localizedHref } from "@/lib/routing";

function ProjectCard({
  project,
  title,
  desc,
  tag,
  delay,
  variant,
  lang,
}: {
  project: PortfolioProject;
  title: string;
  desc: string;
  tag: string;
  delay: number;
  variant: "desktop" | "tablet";
  lang: "ka" | "en";
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const visible = true;
  const isWide = useMediaQuery(WIDE_QUERY);
  const isHuge = useMediaQuery(HUGE_QUERY);
  const hasImage = Boolean(project.image);
  // Clicking a card takes you to its full write-up on the /portfolio page,
  // scrolled straight to that project's card there.
  const href = `${localizedHref("/portfolio", lang)}#${project.id}`;

  // Tablet: horizontal card — visual on the left, cream text panel on the right.
  if (variant === "tablet") {
    return (
      <Link
        href={href}
        ref={ref}
        style={{
          display: "flex",
          width: "17rem",
          height: "7.75rem",
          borderRadius: "1rem",
          overflow: "hidden",
          textDecoration: "none",
          background: "var(--cream)",
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(20px)",
          transition: `opacity 0.6s ease ${delay}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
        }}
      >
        {/* Visual side: logo on white, or the name on the brand colour. The card
            clips the outer corners; the inner ones are rounded here so the panel
            reads as a rounded tile rather than a half-round slab. */}
        <div style={{ flex: "0 0 45%", background: hasImage ? "#fff" : project.bg, borderRadius: "0 1rem 1rem 0", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", padding: "0.6rem" }}>
          {hasImage ? (
            <Image src={project.image!} alt={title} sizes="180px" style={{ width: "auto", height: "auto", maxWidth: "100%", maxHeight: "100%", objectFit: "contain", borderRadius: "0.5rem" }} />
          ) : (
            <span style={{ color: "#fff", fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "0.8125rem", textTransform: "uppercase", textAlign: "center", lineHeight: 1.1 }}>{title}</span>
          )}
        </div>

        {/* Text side */}
        <div style={{ flex: 1, minWidth: 0, background: "var(--cream)", padding: "0.75rem 0.875rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--dark)", fontFamily: "var(--font-primary)", lineHeight: 1.2, marginBottom: "0.4rem" }}>
            {title}
          </div>
          <div
            style={{
              fontSize: "0.6875rem",
              color: "rgba(26,5,18,0.55)",
              fontFamily: "var(--font-primary)",
              lineHeight: 1.5,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            } as React.CSSProperties}
          >
            {desc}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      ref={ref}
      style={{
        display: "block",
        flexShrink: 0,
        width: isHuge ? "36rem" : isWide ? "30rem" : "25.5625rem",
        height: isHuge ? "clamp(33rem, 58vh, 46rem)" : isWide ? "30.75rem" : "26.3125rem",
        marginRight: "1rem",
        borderRadius: "2.1rem",
        overflow: "hidden",
        position: "relative",
        textDecoration: "none",
        background: project.bg,
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(24px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
        cursor: "none",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-6px)";
        (e.currentTarget as HTMLAnchorElement).style.transition = "transform 0.25s ease";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.transform = "none";
        (e.currentTarget as HTMLAnchorElement).style.transition = "transform 0.3s ease";
      }}
    >
      {/* Visual area — logo on white, or the name centred on the brand colour.
          The card clips the top corners; the bottom pair is rounded here so the
          panel is rounded on all four rather than just the two up top. */}
      <div style={{ height: isHuge ? "clamp(23rem, 40vh, 32rem)" : isWide ? "20rem" : "16.9375rem", background: hasImage ? "#fff" : project.bg, borderRadius: "0 0 2.1rem 2.1rem", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", padding: "2.5rem" }}>
        {hasImage ? (
          <Image src={project.image!} alt={title} sizes="(max-width: 640px) 90vw, 480px" style={{ width: "auto", height: "auto", maxWidth: "100%", maxHeight: "100%", objectFit: "contain", borderRadius: "1.25rem" }} />
        ) : (
          <span style={{ color: "#fff", fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(1.5rem,3vw,2.25rem)", textTransform: "uppercase", textAlign: "center", letterSpacing: "-0.01em", padding: "1.5rem", lineHeight: 1.05 }}>{title}</span>
        )}
      </div>

      {/* Text overlay */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1.25rem", background: "linear-gradient(to top, rgba(0,0,0,0.78) 0%, transparent 100%)" }}>
        <div style={{ fontSize: "0.5625rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", marginBottom: "0.4rem", fontFamily: "var(--font-primary)" }}>
          {tag}
        </div>
        <div style={{ fontSize: "1rem", fontWeight: 700, color: "#fff", fontFamily: "var(--font-primary)", marginBottom: "0.35rem", letterSpacing: "0.02em" }}>
          {title}
        </div>
        <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.72)", fontFamily: "var(--font-primary)", lineHeight: 1.55, maxWidth: "24rem" }}>
          {desc}
        </div>
      </div>
    </Link>
  );
}

export default function Portfolio() {
  const { t, lang } = useLang();
  const isTablet = useMediaQuery(TABLET_QUERY);

  const projText = (p: PortfolioProject) =>
    t.portfolio.projects[p.id as keyof typeof t.portfolio.projects];
  const catLabel = (p: PortfolioProject) => t.portfolioPage.categories[p.category];

  const heading = (
    <div style={{ padding: "5.25rem clamp(3rem, 7.6vw, 6.875rem) 2.5rem" }}>
      <h2 style={{ fontSize: "clamp(2rem, 4.44vw, 4rem)", fontWeight: 900, letterSpacing: "0", color: "var(--orange)", fontFamily: "var(--font-heading)" }}>
        {mtavruli(t.portfolio.heading)}
      </h2>
    </div>
  );

  if (isTablet) {
    return (
      <section id="work" style={{ background: "var(--dark)", overflow: "hidden", paddingBottom: "3rem" }}>
        {heading}
        <div className="hide-scrollbar" style={{ overflowX: "auto", overflowY: "hidden", WebkitOverflowScrolling: "touch", padding: "0 clamp(1.5rem, 5vw, 3rem)" }}>
          <div style={{ display: "grid", gridTemplateRows: "repeat(3, 7.75rem)", gridAutoFlow: "column", gridAutoColumns: "17rem", gap: "1rem", width: "max-content" }}>
            {PORTFOLIO_PROJECTS.map((p, i) => (
              <ProjectCard key={p.id} project={p} title={projText(p).name} desc={projText(p).desc} tag={catLabel(p)} delay={i * 0.05} variant="tablet" lang={lang} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="work" style={{ background: "var(--dark)", overflow: "hidden", paddingBottom: "5rem" }}>
      {heading}
      <FastMarquee autoFill pauseOnHover speed={50} gradient={false}>
        {PORTFOLIO_PROJECTS.map((p) => (
          <ProjectCard key={p.id} project={p} title={projText(p).name} desc={projText(p).desc} tag={catLabel(p)} delay={0} variant="desktop" lang={lang} />
        ))}
      </FastMarquee>
    </section>
  );
}