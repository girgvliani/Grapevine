"use client";

export default function Nav() {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "20px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mixBlendMode: "difference",
      }}
    >
      <div
        style={{
          fontSize: "13px",
          letterSpacing: "0.1em",
          color: "var(--white)",
          fontWeight: 700,
          textTransform: "uppercase",
          lineHeight: 1.2,
        }}
      >
        GR<span style={{ color: "var(--orange)" }}>∙</span>PE
        <br />
        VINE
      </div>

      <ul
        style={{
          display: "flex",
          gap: "32px",
          listStyle: "none",
        }}
      >
        {[
          { href: "#services", label: "Services" },
          { href: "#work", label: "Work" },
          { href: "#cta", label: "Contact" },
        ].map(({ href, label }) => (
          <li key={href}>
            <a
              href={href}
              style={{
                color: "var(--white)",
                textDecoration: "none",
                fontSize: "11px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                opacity: 0.7,
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLAnchorElement).style.opacity = "1")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLAnchorElement).style.opacity = "0.7")
              }
            >
              {label}
            </a>
          </li>
        ))}
      </ul>

      <button
        style={{
          background: "var(--orange)",
          color: "var(--dark)",
          padding: "8px 20px",
          borderRadius: "100px",
          fontSize: "11px",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          fontFamily: "inherit",
          border: "none",
          fontWeight: 700,
          transition: "transform 0.2s, background 0.2s",
        }}
        onMouseEnter={(e) => {
          const btn = e.currentTarget;
          btn.style.background = "var(--cream)";
          btn.style.transform = "scale(1.05)";
        }}
        onMouseLeave={(e) => {
          const btn = e.currentTarget;
          btn.style.background = "var(--orange)";
          btn.style.transform = "scale(1)";
        }}
        onClick={() =>
          document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" })
        }
      >
        Grow with Us
      </button>
    </nav>
  );
}
