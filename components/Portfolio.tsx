"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLang } from "./LanguageProvider";
import { useMediaQuery, MOBILE_QUERY, WIDE_QUERY, HUGE_QUERY } from "@/lib/useMediaQuery";
import { PORTFOLIO_PROJECTS, type PortfolioProject } from "./portfolioConfig";
import { CarouselControls } from "./ui/carousel-controls";
import { mtavruli } from "@/lib/i18n";
import { localizedHref } from "@/lib/routing";

type CardSize = { width: string; height: string; visual: string };

function ProjectCard({
  project,
  title,
  desc,
  tag,
  size,
  lang,
}: {
  project: PortfolioProject;
  title: string;
  desc: string;
  tag: string;
  size: CardSize;
  lang: "ka" | "en";
}) {
  const hasImage = Boolean(project.image);
  // Clicking a card takes you to its full write-up on the /portfolio page,
  // scrolled straight to that project's card there.
  const href = `${localizedHref("/portfolio", lang)}#${project.id}`;

  return (
    <Link
      href={href}
      data-card
      style={{
        display: "block",
        flexShrink: 0,
        width: size.width,
        height: size.height,
        borderRadius: "2.1rem",
        overflow: "hidden",
        position: "relative",
        textDecoration: "none",
        background: project.bg,
        cursor: "none",
        transition: "transform 0.3s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-6px)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
    >
      {/* Visual area — logo on white, or the name centred on the brand colour.
          The card clips the top corners; the bottom pair is rounded here so the
          panel is rounded on all four rather than just the two up top. */}
      <div style={{ height: size.visual, background: hasImage ? (project.imageBg ?? "#fff") : project.bg, borderRadius: "0 0 2.1rem 2.1rem", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", padding: "2.5rem" }}>
        {hasImage ? (
          <Image src={project.image!} alt={title} sizes="(max-width: 640px) 80vw, 480px" style={{ width: "auto", height: "auto", maxWidth: "100%", maxHeight: "100%", objectFit: "contain", borderRadius: "1.25rem" }} />
        ) : (
          <span style={{ color: "#fff", fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(1.5rem,3vw,2.25rem)", textTransform: "uppercase", textAlign: "center", letterSpacing: "-0.01em", padding: "1.5rem", lineHeight: 1.05, whiteSpace: "pre-line" }}>{title.replace(/\s+/g, "\n")}</span>
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

// Homepage portfolio: a row of project cards that never scrolls on its own and
// can't be scrolled/dragged — it only moves when the arrows are pressed (or on
// a swipe on touch screens), one card per step, wrapping at both ends like the
// services fan. Arrows + dots are the same component as the services section.
// Replaced the auto-scrolling marquee (desktop) and swipe grid (tablet).
export default function Portfolio() {
  const { t, lang } = useLang();
  const isMobile = useMediaQuery(MOBILE_QUERY);
  const isWide = useMediaQuery(WIDE_QUERY);
  const isHuge = useMediaQuery(HUGE_QUERY);

  const size: CardSize = isMobile
    ? { width: "min(20rem, 80vw)", height: "23rem", visual: "14rem" }
    : isHuge
    ? { width: "36rem", height: "clamp(33rem, 58vh, 46rem)", visual: "clamp(23rem, 40vh, 32rem)" }
    : isWide
    ? { width: "30rem", height: "30.75rem", visual: "20rem" }
    : { width: "25.5625rem", height: "26.3125rem", visual: "16.9375rem" };

  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  // Card start positions and the furthest the track may shift, so the last
  // step lines the final card up with the right edge instead of leaving a gap.
  const [layout, setLayout] = useState({ offsets: [0], maxShift: 0 });

  const measure = useCallback(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;
    const cards = Array.from(track.querySelectorAll<HTMLElement>("[data-card]"));
    const style = getComputedStyle(viewport);
    const inner = viewport.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
    setLayout({
      offsets: cards.map((c) => c.offsetLeft),
      maxShift: Math.max(0, track.scrollWidth - inner),
    });
  }, []);

  useLayoutEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure, isMobile, isWide, isHuge]);

  // Positions = every card start up to the first one that reaches maxShift.
  const lastIndex = Math.max(0, layout.offsets.findIndex((o) => o >= layout.maxShift));
  const positions = layout.maxShift > 0 ? (lastIndex || layout.offsets.length - 1) + 1 : 1;
  const current = Math.min(index, positions - 1);
  const shift = Math.min(layout.offsets[current] ?? 0, layout.maxShift);

  const step = useCallback(
    (dir: 1 | -1) => setIndex((i) => (Math.min(i, positions - 1) + dir + positions) % positions),
    [positions]
  );

  // Swipe on touch screens.
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    let startX = 0;
    let startY = 0;
    const onStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };
    const onEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - startX;
      const dy = e.changedTouches[0].clientY - startY;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.5) step(dx < 0 ? 1 : -1);
    };
    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchend", onEnd);
    };
  }, [step]);

  // Tabbing onto an off-screen card makes the browser scroll this
  // overflow-hidden box to reveal it, which would fight the transform. Undo
  // that scroll and move the carousel to the focused card instead.
  const onFocusCapture = (e: React.FocusEvent) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    viewport.scrollLeft = 0;
    const cards = Array.from(trackRef.current?.querySelectorAll("[data-card]") ?? []);
    const focused = cards.indexOf(e.target as Element);
    if (focused >= 0) setIndex(Math.min(focused, positions - 1));
  };

  const projText = (p: PortfolioProject) =>
    t.portfolio.projects[p.id as keyof typeof t.portfolio.projects];
  const catLabel = (p: PortfolioProject) => t.portfolioPage.categories[p.category];

  return (
    <section id="work" style={{ background: "var(--dark)", overflow: "hidden", paddingBottom: "5rem" }}>
      <div style={{ padding: "5.25rem clamp(1.5rem, 7.6vw, 6.875rem) 2.5rem" }}>
        <h2 style={{ fontSize: "clamp(2rem, 4.44vw, 4rem)", fontWeight: 900, letterSpacing: "0", color: "var(--orange)", fontFamily: "var(--font-heading)" }}>
          {mtavruli(t.portfolio.heading)}
        </h2>
      </div>

      <div
        ref={viewportRef}
        onFocusCapture={onFocusCapture}
        style={{ overflow: "hidden", padding: "0.5rem clamp(1.5rem, 7.6vw, 6.875rem) 0.5rem" }}
      >
        <div
          ref={trackRef}
          className="portfolio-track"
          style={{
            display: "flex",
            gap: "1rem",
            width: "max-content",
            transform: `translateX(-${shift}px)`,
          }}
        >
          {PORTFOLIO_PROJECTS.map((p) => (
            <ProjectCard key={p.id} project={p} title={projText(p).name} desc={projText(p).desc} tag={catLabel(p)} size={size} lang={lang} />
          ))}
        </div>
      </div>

      {positions > 1 && (
        <CarouselControls
          className="mt-8"
          count={positions}
          active={current}
          labels={{ previous: t.portfolio.previous, next: t.portfolio.next }}
          onPrev={() => step(-1)}
          onNext={() => step(1)}
        />
      )}
    </section>
  );
}
