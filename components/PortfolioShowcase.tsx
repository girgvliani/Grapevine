"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLang } from "./LanguageProvider";
import { localizedHref } from "@/lib/routing";
import {
  PORTFOLIO_PROJECTS,
  PORTFOLIO_CATEGORY_ORDER,
  type PortfolioCategory,
  type PortfolioProject,
} from "./portfolioConfig";
import BehanceLink from "./BehanceLink";

function ExpandArrow() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ProjectCard({
  project,
  title,
  desc,
  tag,
  hidden,
  delay,
}: {
  project: PortfolioProject;
  title: string;
  desc: string;
  tag: string;
  hidden: boolean;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);
  const hasImage = Boolean(project.image);

  if (hidden) return null;

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        borderRadius: "2rem",
        overflow: "hidden",
        position: "relative",
        height: "26rem",
        background: project.bg,
        transform: hover ? "translateY(-0.5rem)" : "none",
        transition: `transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}s, box-shadow 0.25s ease`,
        boxShadow: hover ? "0 1.75rem 3rem -1rem rgba(0,0,0,0.6)" : "0 0.75rem 1.5rem -0.75rem rgba(0,0,0,0.5)",
      }}
    >
      {/* Visual area — logo on white, or the name centred on the brand colour */}
      <div style={{ height: "64%", position: "relative", overflow: "hidden", background: hasImage ? "#fff" : project.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {hasImage ? (
          <Image
            src={project.image!}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            style={{ objectFit: "contain", padding: "2rem", transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)", transform: hover ? "scale(1.06)" : "none" }}
          />
        ) : (
          <span style={{ color: "#fff", fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(1.5rem,3vw,2.25rem)", textTransform: "uppercase", textAlign: "center", letterSpacing: "-0.01em", padding: "1.5rem", lineHeight: 1.05 }}>{title}</span>
        )}
      </div>

      {/* Corner badge */}
      <div
        style={{
          position: "absolute",
          top: "1.25rem",
          right: "1.25rem",
          width: "2.25rem",
          height: "2.25rem",
          borderRadius: "50%",
          background: hover ? "#fff" : "rgba(255,255,255,0.15)",
          backdropFilter: "blur(6px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: hover ? "var(--dark)" : "#fff",
          transform: hover ? "rotate(45deg)" : "none",
          transition: "background 0.25s, color 0.25s, transform 0.35s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <ExpandArrow />
      </div>

      {/* Meta overlay */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "36%", padding: "1.25rem 1.5rem", display: "flex", flexDirection: "column", justifyContent: "flex-end", background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)" }}>
        <div style={{ fontSize: "0.5625rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.72)", marginBottom: "0.5rem", fontFamily: "var(--font-primary)" }}>
          {tag}
        </div>
        <div style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "1.375rem", lineHeight: 1.05, color: "#fff", textTransform: "uppercase", letterSpacing: "-0.01em" }}>
          {title}
        </div>
        <div style={{ fontSize: "0.75rem", lineHeight: 1.55, color: "rgba(255,255,255,0.82)", marginTop: "0.5rem", maxWidth: "24rem", fontFamily: "var(--font-primary)", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" } as React.CSSProperties}>
          {desc}
        </div>
      </div>
    </div>
  );
}

export default function PortfolioShowcase() {
  const { t, lang } = useLang();
  const p = t.portfolioPage;
  const [filter, setFilter] = useState<PortfolioCategory | "all">("all");

  const chips: (PortfolioCategory | "all")[] = ["all", ...PORTFOLIO_CATEGORY_ORDER];
  const projText = (proj: PortfolioProject) =>
    t.portfolio.projects[proj.id as keyof typeof t.portfolio.projects];

  return (
    <>
      {/* Header */}
      <header style={{ padding: "11rem clamp(1.5rem,7.6vw,6.875rem) 2.5rem", position: "relative", overflow: "hidden" }}>
        <div style={{ marginBottom: "1.5rem" }}>
          <BehanceLink />
        </div>
        <div style={{ color: "var(--orange)", fontSize: "0.75rem", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "1.25rem", fontFamily: "var(--font-primary)" }}>
          {p.eyebrow}
        </div>
        <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(2.75rem,7vw,6rem)", lineHeight: 0.95, textTransform: "uppercase", letterSpacing: "-0.02em", color: "var(--orange)" }}>
          {t.portfolio.heading}
        </h1>
        <p style={{ maxWidth: "34rem", marginTop: "1.5rem", fontSize: "0.95rem", lineHeight: 1.8, color: "rgba(255,250,236,0.72)", fontFamily: "var(--font-primary)" }}>
          {p.intro}
        </p>
      </header>

      {/* Filter chips */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", padding: "0.5rem clamp(1.5rem,7.6vw,6.875rem) 1.5rem" }}>
        {chips.map((c) => {
          const active = filter === c;
          const label = c === "all" ? p.filterAll : p.categories[c];
          return (
            <button
              key={c}
              onClick={() => setFilter(c)}
              style={{
                background: active ? "var(--cream)" : "transparent",
                border: `1px solid ${active ? "var(--cream)" : "rgba(255,250,236,0.25)"}`,
                color: active ? "var(--dark)" : "rgba(255,250,236,0.7)",
                padding: "0.5rem 1.125rem",
                borderRadius: "100px",
                fontFamily: "var(--font-primary)",
                fontSize: "0.6875rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontWeight: 700,
                transition: "background 0.2s, color 0.2s, border-color 0.2s",
              }}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div style={{ padding: "1rem clamp(1.5rem,7.6vw,6.875rem) 5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(20rem, 1fr))", gap: "1.25rem" }}>
          {PORTFOLIO_PROJECTS.map((proj, i) => {
            const shown = filter === "all" || proj.category === filter;
            return (
              <ProjectCard
                key={proj.id}
                project={proj}
                title={projText(proj).name}
                desc={projText(proj).desc}
                tag={p.categories[proj.category]}
                hidden={!shown}
                delay={(i % 6) * 0.05}
              />
            );
          })}
        </div>
      </div>

      {/* CTA band */}
      <section style={{ padding: "4rem clamp(1.5rem,7.6vw,6.875rem) 5rem", textAlign: "center" }}>
        <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(2rem,5vw,3.75rem)", textTransform: "uppercase", letterSpacing: "-0.02em", lineHeight: 1, marginBottom: "1.5rem" }}>
          {p.bandPre}
          <span style={{ color: "var(--orange)" }}>{p.bandAccent}</span>
        </h2>
        <p style={{ color: "rgba(255,250,236,0.65)", maxWidth: "30rem", margin: "0 auto 2rem", fontSize: "0.9rem", lineHeight: 1.8, fontFamily: "var(--font-primary)" }}>
          {p.bandDesc}
        </p>
        <Link
          href={localizedHref("/contact", lang)}
          style={{ display: "inline-block", background: "var(--purple-dark)", color: "var(--white)", padding: "0.75rem 1.5rem", borderRadius: "100px", fontSize: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "var(--font-primary)", fontWeight: 700, textDecoration: "none" }}
        >
          {p.bandCta}
        </Link>
      </section>
    </>
  );
}