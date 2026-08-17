import { createPostAction } from "@/lib/adminActions";

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.625rem 0.75rem",
  borderRadius: "0.5rem",
  border: "1px solid rgba(26,5,18,0.2)",
  fontSize: "0.9375rem",
  fontFamily: "inherit",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.75rem",
  fontWeight: 600,
  color: "#1A0512",
  marginBottom: "0.375rem",
};

export default function NewPostPage() {
  return (
    <div>
      <h1 style={{ fontSize: "1.375rem", fontWeight: 800, color: "#1A0512", marginBottom: "1.5rem" }}>
        New post
      </h1>

      <form action={createPostAction} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <div>
          <label style={labelStyle}>Language</label>
          <select name="lang" defaultValue="ka" style={inputStyle}>
            <option value="ka">Georgian (ka)</option>
            <option value="en">English (en)</option>
          </select>
        </div>

        <div>
          <label style={labelStyle}>Title</label>
          <input type="text" name="title" required style={inputStyle} />
        </div>

        <div>
          <label style={labelStyle}>URL slug (optional)</label>
          <input type="text" name="slug" placeholder="e.g. my-first-post" style={inputStyle} />
          <p style={{ fontSize: "0.75rem", color: "rgba(26,5,18,0.5)", marginTop: "0.375rem" }}>
            Leave blank to generate one from the title automatically. For Georgian posts, type a
            plain English slug here — auto-generating one from Georgian text doesn't produce a clean URL.
          </p>
        </div>

        <div>
          <label style={labelStyle}>Excerpt</label>
          <textarea name="excerpt" rows={2} style={{ ...inputStyle, resize: "vertical" }} />
          <p style={{ fontSize: "0.75rem", color: "rgba(26,5,18,0.5)", marginTop: "0.375rem" }}>
            Short summary shown on the blog listing page.
          </p>
        </div>

        <div>
          <label style={labelStyle}>Content (Markdown)</label>
          <textarea
            name="content"
            rows={16}
            required
            style={{ ...inputStyle, resize: "vertical", fontFamily: "monospace", fontSize: "0.875rem" }}
          />
          <p style={{ fontSize: "0.75rem", color: "rgba(26,5,18,0.5)", marginTop: "0.375rem" }}>
            Supports Markdown: **bold**, *italics*, # headings, [links](https://…), and lists.
          </p>
        </div>

        <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", fontWeight: 600, color: "#1A0512" }}>
          <input type="checkbox" name="published" />
          Publish immediately
        </label>

        <button
          type="submit"
          style={{
            alignSelf: "flex-start",
            background: "#902793",
            color: "#fff",
            border: "none",
            borderRadius: "0.5rem",
            padding: "0.75rem 1.5rem",
            fontSize: "0.875rem",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Save post
        </button>
      </form>
    </div>
  );
}
