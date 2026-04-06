const items = [
  "Branding",
  "Strategy",
  "Content",
  "Social Media",
  "SEO",
  "Campaigns",
];

// Duplicate to create seamless loop
const allItems = [...items, ...items];

export default function Marquee() {
  return (
    <div
      style={{
        overflow: "hidden",
        padding: "20px 0",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        background: "var(--orange)",
      }}
    >
      <div
        className="marquee-track"
        style={{ display: "flex", gap: 0, whiteSpace: "nowrap" }}
      >
        {allItems.map((item, i) => (
          <div
            key={i}
            style={{
              fontSize: "13px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--dark)",
              fontWeight: 700,
              padding: "0 40px",
              display: "flex",
              alignItems: "center",
              gap: "20px",
            }}
          >
            {item}
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "var(--dark)",
                opacity: 0.5,
                display: "inline-block",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
