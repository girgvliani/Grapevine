export default function Footer() {
  return (
    <footer
      style={{
        padding: "60px 40px",
        background: "var(--dark)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div>
        <div
          style={{
            fontSize: "11px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            opacity: 0.3,
          }}
        >
          Grapevine Agency
          <br />
          grapevine.ge
        </div>
      </div>
      <div
        style={{
          fontSize: "11px",
          opacity: 0.3,
          textAlign: "right",
        }}
      >
        <div>© 2025 Grapevine</div>
        <div style={{ marginTop: "4px" }}>Always here to detangle the mess</div>
      </div>
    </footer>
  );
}
