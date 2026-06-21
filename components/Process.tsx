"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import birdImg from "./assets/Component 9.png";
import { useLang } from "./LanguageProvider";
import { useMediaQuery, MOBILE_QUERY } from "@/lib/useMediaQuery";

function Dot({ active }: { active: boolean }) {
  return (
    <div style={{
      width: "0.625rem",
      height: "0.625rem",
      borderRadius: "50%",
      background: active ? "var(--orange)" : "transparent",
      border: active ? "none" : "1.5px solid var(--orange)",
      transition: "background 0.4s ease",
    }} />
  );
}

export default function Process() {
  const { t } = useLang();
  const isMobile = useMediaQuery(MOBILE_QUERY);
  const [panel, setPanel] = useState(0);
  const [fading, setFading] = useState(false);
  const [lockedHeight, setLockedHeight] = useState<number | undefined>(undefined);
  const stepsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef(0);
  const cooldownRef = useRef(false);

  // Lock height to panel 0's natural height before first switch
  useEffect(() => {
    if (contentRef.current && lockedHeight === undefined) {
      setLockedHeight(contentRef.current.offsetHeight);
    }
  }, [lockedHeight]);

  useEffect(() => {
    if (isMobile) return;
    const el = stepsRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (cooldownRef.current) return;

      const goingDown = e.deltaY > 30;
      const goingUp = e.deltaY < -30;

      if (goingDown && panelRef.current === 0) {
        e.preventDefault();
        cooldownRef.current = true;
        setFading(true);
        setTimeout(() => {
          panelRef.current = 1;
          setPanel(1);
          setFading(false);
          setTimeout(() => { cooldownRef.current = false; }, 400);
        }, 300);
      } else if (goingUp && panelRef.current === 1) {
        e.preventDefault();
        cooldownRef.current = true;
        setFading(true);
        setTimeout(() => {
          panelRef.current = 0;
          setPanel(0);
          setFading(false);
          setTimeout(() => { cooldownRef.current = false; }, 400);
        }, 300);
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [isMobile]);

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
            <Image src={birdImg} alt="Grapevine bird" fill style={{ objectFit: "contain" }} priority />
          </div>
          <div
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 900,
              fontSize: "clamp(2rem, 9vw, 2.75rem)",
              lineHeight: 1.1,
              textTransform: "uppercase",
              letterSpacing: "-0.02em",
              textAlign: "center",
            }}
          >
            <span style={{ color: "var(--orange)" }}>{t.process.titleLine1}</span>
            <br />
            <span style={{ color: "var(--dark)" }}>{t.process.titleLine2}</span>
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
      <div className="container-cap" style={{ display: "flex", gap: "clamp(2rem, 5vw, 3.75rem)", alignItems: "flex-start" }}>

        {/* Left — bird + title */}
        <div style={{ flex: "0 0 42%", display: "flex", flexDirection: "row", alignItems: "flex-end" }}>
          <div style={{ position: "relative", width: "44%", aspectRatio: "1 / 1.1", flexShrink: 0 }}>
            <Image src={birdImg} alt="Grapevine bird" fill style={{ objectFit: "contain", objectPosition: "left center" }} priority />
          </div>
          <div style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 900,
            fontSize: "clamp(2.5rem, 6vw, 4.875rem)",
            lineHeight: 1.1,
            textTransform: "uppercase",
            letterSpacing: "-0.02em",
            paddingBottom: "1rem",
          }}>
            <span style={{ color: "var(--orange)" }}>{t.process.titleLine1}</span>
            <br />
            <span style={{ color: "var(--dark)" }}>{t.process.titleLine2}</span>
          </div>
        </div>

        {/* Right — interactive steps column */}
        <div
          ref={stepsRef}
          style={{ flex: 1, paddingTop: "0.5rem", paddingLeft: "clamp(1rem, 6vw, 6.25rem)", userSelect: "none" }}
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
                    <div style={{ fontSize: "clamp(1.75rem, 4vw, 2.625rem)", fontWeight: 700, color: "var(--orange)", fontFamily: "var(--font-primary)", minWidth: "4rem", lineHeight: 1 }}>
                      {step.num}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "clamp(1.625rem, 3vw, 2.375rem)", fontWeight: 900, color: "#1A0512", fontFamily: "var(--font-heading)", textTransform: "uppercase", letterSpacing: "-0.01em", lineHeight: 1, marginBottom: "0.375rem" }}>
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
                  textTransform: "uppercase",
                  letterSpacing: "-0.02em",
                  color: "var(--orange)",
                  fontFamily: "var(--font-heading)",
                  marginBottom: "2.5rem",
                }}>
                  {t.process.benefitsHeading}
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

          {/* Dots */}
          <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
            <Dot active={panel === 0} />
            <Dot active={panel === 1} />
          </div>
        </div>

      </div>
    </section>
  );
}
