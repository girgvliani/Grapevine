"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import birdImg from "./assets/Component 9.png";
import { useLang } from "./LanguageProvider";
import { useMediaQuery, MOBILE_QUERY } from "@/lib/useMediaQuery";
import { mtavruli } from "@/lib/i18n";

function StepButton({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-current={active}
      style={{
        width: active ? "0.625rem" : "2.75rem",
        height: active ? "0.625rem" : "0.375rem",
        borderRadius: active ? "50%" : "999px",
        background: active ? "var(--orange)" : "transparent",
        border: active ? "none" : "1.5px solid var(--orange)",
        transition: "background 0.4s ease, width 0.3s ease, height 0.3s ease, border-radius 0.3s ease",
        padding: 0,
        cursor: "pointer",
      }}
    />
  );
}

export default function Process() {
  const { t } = useLang();
  const isMobile = useMediaQuery(MOBILE_QUERY);
  // Tablet range (~iPad widths). The two-column layout gets cramped here — the
  // big heading collides with the steps, worse in Georgian — so scale the whole
  // section down a notch.
  const isTablet = useMediaQuery("(min-width: 641px) and (max-width: 900px)");
  const [panel, setPanel] = useState(0);
  const [fading, setFading] = useState(false);
  const [lockedHeight, setLockedHeight] = useState<number | undefined>(undefined);
  const contentRef = useRef<HTMLDivElement>(null);

  // Lock height to panel 0's natural height before first switch
  useEffect(() => {
    if (contentRef.current && lockedHeight === undefined) {
      setLockedHeight(contentRef.current.offsetHeight);
    }
  }, [lockedHeight]);

  function switchPanel(target: number) {
    if (target === panel || fading) return;
    setFading(true);
    setTimeout(() => {
      setPanel(target);
      setFading(false);
    }, 300);
  }

  // Mobile: only the bird + title, steps/benefits hidden (per the mobile design).
  if (isMobile) {
    return (
      <section
        id="process"
        style={{
          background: "var(--cream)",
          padding: "4.5rem clamp(1.5rem, 5vw, 2.5rem) 4.5rem",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}>
          <div style={{ position: "relative", width: "55%", aspectRatio: "1 / 1.05" }}>
            <Image src={birdImg} alt="Grapevine bird" fill sizes="(max-width: 640px) 55vw, 30vw" loading="eager" style={{ objectFit: "contain" }} />
          </div>
          <div
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 900,
              fontSize: "clamp(2rem, 9vw, 2.75rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              textAlign: "center",
            }}
          >
            <span style={{ color: "var(--orange)" }}>{mtavruli(t.process.titleLine1)}</span>
            <br />
            <span style={{ color: "var(--dark)" }}>{mtavruli(t.process.titleLine2)}</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="process"
      style={{
        background: "var(--cream)",
        padding: "5rem clamp(1.5rem, 5vw, 2.5rem) 3.75rem",
      }}
    >
      <div className="container-cap" style={{ display: "flex", gap: isTablet ? "1.25rem" : "clamp(2rem, 5vw, 3.75rem)", alignItems: "flex-start" }}>

        {/* Left — bird + title. Sticky so it follows the scroll until the
            section ends (tablet+ only; the mobile branch above is unaffected). */}
        <div style={{ flex: "0 0 42%", display: "flex", flexDirection: "row", alignItems: "flex-end", position: "sticky", top: "6rem", alignSelf: "flex-start" }}>
          <div style={{ position: "relative", width: isTablet ? "32%" : "40%", aspectRatio: "1 / 1.1", flexShrink: 0 }}>
            <Image src={birdImg} alt="Grapevine bird" fill sizes="(max-width: 1024px) 25vw, 220px" loading="eager" style={{ objectFit: "contain", objectPosition: "left center" }} />
          </div>
          <div style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 900,
            fontSize: isTablet ? "clamp(1.6rem, 3.6vw, 2.25rem)" : "clamp(2.5rem, 3.6vw, 3.25rem)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            paddingBottom: "1rem",
          }}>
            <span style={{ color: "var(--orange)" }}>{mtavruli(t.process.titleLine1)}</span>
            <br />
            <span style={{ color: "var(--dark)" }}>{mtavruli(t.process.titleLine2)}</span>
          </div>
        </div>

        {/* Right — interactive steps column */}
        <div
          style={{ flex: 1, paddingTop: "0.5rem", paddingLeft: isTablet ? "1.25rem" : "clamp(1rem, 6vw, 6.25rem)" }}
        >
          <div ref={contentRef} style={{ opacity: fading ? 0 : 1, transition: "opacity 0.3s ease", minHeight: lockedHeight }}>

            {/* Panel 0 — how we work */}
            {panel === 0 && (
              <>
                {t.process.steps.map((step, i) => (
                  <div key={step.num} style={{
                    display: "flex",
                    gap: "1.5rem",
                    paddingBottom: "2rem",
                    marginBottom: "2rem",
                    borderBottom: i === t.process.steps.length - 1 ? "none" : "1px solid rgba(26,5,18,0.12)",
                  }}>
                    <div style={{ fontSize: isTablet ? "1.375rem" : "clamp(1.75rem, 4vw, 2.625rem)", fontWeight: 700, color: "var(--orange)", fontFamily: "var(--font-primary)", minWidth: isTablet ? "2.5rem" : "4rem", lineHeight: 1 }}>
                      {step.num}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: isTablet ? "1.375rem" : "clamp(1.625rem, 3vw, 2.375rem)", fontWeight: 900, color: "#1A0512", fontFamily: "var(--font-heading)", textTransform: "uppercase", letterSpacing: "-0.01em", lineHeight: 1, marginBottom: "0.375rem" }}>
                        {step.title}
                      </div>
                      <div style={{ fontSize: "0.6875rem", color: "var(--orange)", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-primary)", marginBottom: "0.625rem" }}>
                        {step.sub}
                      </div>
                      <div style={{ fontSize: "0.75rem", lineHeight: 1.75, color: "#1A0512", opacity: 0.65, fontFamily: "var(--font-primary)", maxWidth: "21.25rem" }}>
                        {step.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}

            {/* Panel 1 — what client gets */}
            {panel === 1 && (
              <>
                <h3 style={{
                  fontSize: "clamp(1.5rem, 3.5vw, 3rem)",
                  fontWeight: 900,
                  letterSpacing: "-0.02em",
                  color: "var(--orange)",
                  fontFamily: "var(--font-heading)",
                  marginBottom: "2.5rem",
                }}>
                  {mtavruli(t.process.benefitsHeading)}
                </h3>

                {t.process.benefits.map((group) => (
                  <div key={group.num} style={{ marginBottom: "2rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", marginBottom: "1rem" }}>
                      <span style={{ fontSize: "clamp(1.75rem, 4vw, 2.625rem)", fontWeight: 700, color: "var(--orange)", fontFamily: "var(--font-primary)", lineHeight: 1, flexShrink: 0 }}>
                        {group.num}
                      </span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: "clamp(1.25rem, 2.5vw, 2rem)", fontWeight: 900, color: "#1A0512", fontFamily: "var(--font-heading)", textTransform: "uppercase", letterSpacing: "-0.01em", lineHeight: 1 }}>
                          {group.title}
                        </div>
                        <div style={{ height: "2px", background: "var(--orange)", marginTop: "0.375rem" }} />
                      </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem", paddingLeft: "0.5rem" }}>
                      {group.items.map((item) => (
                        <div key={item} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
                            <circle cx="9" cy="9" r="8" stroke="var(--orange)" strokeWidth="1.5" fill="none" />
                            <path d="M5.5 9L7.5 11L12.5 6.5" stroke="var(--orange)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <span style={{ fontSize: "0.9375rem", color: "#1A0512", fontFamily: "var(--font-primary)", opacity: 0.8 }}>
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </>
            )}

          </div>

          {/* Step switcher */}
          <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
            <StepButton
              active={panel === 0}
              onClick={() => switchPanel(0)}
              label={`${t.process.titleLine1} ${t.process.titleLine2}`}
            />
            <StepButton
              active={panel === 1}
              onClick={() => switchPanel(1)}
              label={t.process.benefitsHeading}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
