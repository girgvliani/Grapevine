"use client";

import { useLang } from "./LanguageProvider";

export default function Marquee() {
  const { t } = useLang();
  const allItems = [...t.marquee, ...t.marquee];

  return (
    <div
      style={{
        overflow: "hidden",
        padding: "18px 0",
        background: "var(--orange)",
      }}
    >
      <div
        className="marquee-track"
        style={{ display: "flex", whiteSpace: "nowrap" }}
      >
        {allItems.map((item, i) => (
          <div
            key={i}
            style={{
              fontSize: "12px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--dark)",
              fontWeight: 700,
              padding: "0 36px",
              display: "flex",
              alignItems: "center",
              gap: "18px",
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
      </div>
    </div>
  );
}
