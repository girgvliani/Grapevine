"use client";

import { useEffect, useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { useLang } from "./LanguageProvider";
import { useMediaQuery, TABLET_QUERY, WIDE_QUERY } from "@/lib/useMediaQuery";

import img01 from "./assets/portfolio/Frame 13.png";
import img02 from "./assets/portfolio/Frame 13 (1).png";
import img03 from "./assets/portfolio/Frame 13 (2).png";
import img04 from "./assets/portfolio/Frame 13 (3).png";
import img05 from "./assets/portfolio/Frame 13 (4).png";
import img06 from "./assets/portfolio/Frame 13 (5).png";
import img07 from "./assets/portfolio/Frame 13 (6).png";
import img08 from "./assets/portfolio/Frame 13 (7).png";
import img09 from "./assets/portfolio/Frame 13 (8).png";
import img10 from "./assets/portfolio/Frame 13 (9).png";
import img11 from "./assets/portfolio/Frame 13 (10).png";
import img12 from "./assets/portfolio/Frame 13 (11).png";

type Project = {
  id: number;
  bg: string;
  image: StaticImageData;
};

// Order + colors + images live here; titles/description come from the i18n file.
const PROJECTS: Project[] = [
  { id: 1,  bg: "#E8541A", image: img01 },
  { id: 2,  bg: "#2B6CB0", image: img02 },
  { id: 3,  bg: "#111111", image: img03 },
  { id: 4,  bg: "#902793", image: img04 },
  { id: 5,  bg: "#1A5C3A", image: img05 },
  { id: 6,  bg: "#C0392B", image: img06 },
  { id: 7,  bg: "#2C3E50", image: img07 },
  { id: 8,  bg: "#E67E22", image: img08 },
  { id: 9,  bg: "#AFA9FF", image: img09 },
  { id: 10, bg: "#16A085", image: img10 },
  { id: 11, bg: "#8E44AD", image: img11 },
  { id: 12, bg: "#D35400", image: img12 },
];

function ProjectCard({
  project,
  title,
  desc,
  delay,
  variant,
}: {
  project: Project;
  title: string;
  desc: string;
  delay: number;
  variant: "desktop" | "tablet";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const isWide = useMediaQuery(WIDE_QUERY);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Tablet: horizontal card — image on the left, cream text panel on the right.
  if (variant === "tablet") {
    return (
      <div
        ref={ref}
        style={{
          width: "17rem",
          height: "7.75rem",
          borderRadius: "1rem",
          overflow: "hidden",
          display: "flex",
          background: "var(--cream)",
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(20px)",
          transition: `opacity 0.6s ease ${delay}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
        }}
      >
        {/* Image side */}
        <div style={{ flex: "0 0 45%", position: "relative", background: project.bg }}>
          <Image src={project.image} alt={title} fill style={{ objectFit: "cover" }} />
        </div>

        {/* Text side */}
        <div
          style={{
            flex: 1,
            minWidth: 0,
            background: "var(--cream)",
            padding: "0.75rem 0.875rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontSize: "0.8125rem",
              fontWeight: 700,
              fontStyle: "italic",
              color: "var(--dark)",
              fontFamily: "var(--font-primary)",
              lineHeight: 1.2,
              marginBottom: "0.5rem",
            }}
          >
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
            &ldquo;{desc}&rdquo;
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      style={{
        flexShrink: 0,
        width: isWide ? "30rem" : "25.5625rem",
        height: isWide ? "30.75rem" : "26.3125rem",
        borderRadius: "2.1rem",
        overflow: "hidden",
        position: "relative",
        background: project.bg,
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(24px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
        cursor: "none",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-6px)";
        (e.currentTarget as HTMLDivElement).style.transition = "transform 0.25s ease";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "none";
        (e.currentTarget as HTMLDivElement).style.transition = "transform 0.3s ease";
      }}
    >
      {/* Visual area */}
      <div style={{ height: isWide ? "20rem" : "16.9375rem", position: "relative" }}>
        <Image src={project.image} alt={title} fill style={{ objectFit: "cover" }} />
      </div>

      {/* Text overlay */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "1.25rem",
          background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)",
        }}
      >
        <div
          style={{
            fontSize: "13px",
            fontWeight: 700,
            color: "#fff",
            fontFamily: "var(--font-primary)",
            marginBottom: "6px",
            letterSpacing: "0.02em",
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: "11px",
            color: "rgba(255,255,255,0.65)",
            fontFamily: "var(--font-primary)",
            lineHeight: 1.6,
          }}
        >
          {desc}
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const { t } = useLang();
  const isTablet = useMediaQuery(TABLET_QUERY);
  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [outerHeight, setOuterHeight] = useState("350vh");

  useEffect(() => {
    const outer = outerRef.current;
    const track = trackRef.current;
    if (!outer || !track) return;

    const getMaxShift = () => {
      const containerStyle = getComputedStyle(track.parentElement!);
      const paddingLeft = parseFloat(containerStyle.paddingLeft) || 0;
      const paddingRight = parseFloat(containerStyle.paddingRight) || 0;
      return Math.max(0, track.scrollWidth - window.innerWidth + paddingLeft + paddingRight);
    };

    const computeHeight = () => {
      const maxShift = getMaxShift();
      setOuterHeight(`${maxShift + window.innerHeight + 200}px`);
    };

    const update = () => {
      const rect = outer.getBoundingClientRect();
      const scrollRange = rect.height - window.innerHeight;
      if (scrollRange <= 0) return;
      const maxShift = getMaxShift();
      const progress = Math.max(0, Math.min(1, -rect.top / scrollRange));
      track.style.transform = `translateX(-${progress * maxShift}px)`;
    };

    // Defer to next frame so track.scrollWidth is fully laid out
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
    // Re-measure when the layout switches between desktop (1 row) and tablet (3 rows)
  }, [isTablet]);

  return (
    <div ref={outerRef} style={{ height: outerHeight, position: "relative" }}>
      <section
        id="work"
        style={{
          background: "var(--dark)",
          overflow: "hidden",
          position: "sticky",
          top: 0,
          height: isTablet ? "37rem" : "48.625rem",
        }}
      >
        {/* Heading */}
        <div style={{ padding: "5.25rem clamp(3rem, 7.6vw, 6.875rem) 2.5rem" }}>
          <h2
            style={{
              fontSize: "clamp(2rem, 4.44vw, 4rem)",
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "0",
              color: "var(--orange)",
              fontFamily: "var(--font-heading)",
            }}
          >
            {t.portfolio.heading}
          </h2>
        </div>

        {/* Cards track */}
        <div
          style={{
            padding: "0 clamp(3rem, 7.6vw, 6.875rem)",
            overflow: "visible",
          }}
        >
          <div
            ref={trackRef}
            style={
              isTablet
                ? {
                    display: "grid",
                    gridTemplateRows: "repeat(3, 7.75rem)",
                    gridAutoFlow: "column",
                    gridAutoColumns: "17rem",
                    gap: "1rem",
                    willChange: "transform",
                    transition: "transform 0.05s linear",
                  }
                : {
                    display: "flex",
                    gap: "1rem",
                    willChange: "transform",
                    transition: "transform 0.05s linear",
                  }
            }
          >
            {PROJECTS.map((p, i) => (
              <ProjectCard
                key={p.id}
                project={p}
                title={t.portfolio.projects[p.id as keyof typeof t.portfolio.projects]}
                desc={t.portfolio.desc}
                delay={i * 0.08}
                variant={isTablet ? "tablet" : "desktop"}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
