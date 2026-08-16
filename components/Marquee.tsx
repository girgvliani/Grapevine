"use client";

import FastMarquee from "react-fast-marquee";
import { useLang } from "./LanguageProvider";

export default function Marquee() {
  const { t } = useLang();

  return (
    <div style={{ background: "var(--orange)", padding: "18px 0" }}>
      <FastMarquee autoFill speed={60} pauseOnHover={false} gradient={false}>
        {t.marquee.map((item, i) => (
          <div
            key={i}
            style={{
              fontSize: "12px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--dark)",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: "32px",
              paddingRight: "32px",
              fontFamily: "var(--font-primary)",
            }}
          >
            {item}
            <span
              style={{
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                background: "var(--dark)",
                opacity: 0.4,
                flexShrink: 0,
              }}
            />
          </div>
        ))}
      </FastMarquee>
    </div>
  );
}
