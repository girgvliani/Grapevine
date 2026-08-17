import { notFound } from "next/navigation";
import { getPostById } from "@/lib/blog";
import { deletePostAction, updatePostAction } from "@/lib/adminActions";

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

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const postId = Number(id);
  const post = Number.isFinite(postId) ? await getPostById(postId) : null;
  if (!post) notFound();

  const update = updatePostAction.bind(null, post.id);
  const remove = deletePostAction.bind(null, post.id);

  return (
    <div>
      <h1 style={{ fontSize: "1.375rem", fontWeight: 800, color: "#1A0512", marginBottom: "0.25rem" }}>
        Edit post
      </h1>
      <p style={{ fontSize: "0.8125rem", color: "rgba(26,5,18,0.5)", marginBottom: "1.5rem" }}>
        Language: {post.lang === "ka" ? "Georgian" : "English"} (language can't be changed after creation — delete and recreate in the other language if needed)
      </p>

      <form action={update} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <div>
          <label style={labelStyle}>Title</label>
          <input type="text" name="title" defaultValue={post.title} required style={inputStyle} />
        </div>

        <div>
          <label style={labelStyle}>URL slug</label>
          <input type="text" name="slug" defaultValue={post.slug} required style={inputStyle} />
          <p style={{ fontSize: "0.75rem", color: "rgba(26,5,18,0.5)", marginTop: "0.375rem" }}>
            Changing this changes the post's live URL — only edit it if you know a link needs fixing.
          </p>
        </div>

        <div>
          <label style={labelStyle}>Excerpt</label>
          <textarea name="excerpt" rows={2} defaultValue={post.excerpt} style={{ ...inputStyle, resize: "vertical" }} />
        </div>

        <div>
          <label style={labelStyle}>Content (Markdown)</label>
          <textarea
            name="content"
            rows={16}
            required
            defaultValue={post.content}
            style={{ ...inputStyle, resize: "vertical", fontFamily: "monospace", fontSize: "0.875rem" }}
          />
        </div>

        <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", fontWeight: 600, color: "#1A0512" }}>
          <input type="checkbox" name="published" defaultChecked={post.published} />
          Published
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
          Save changes
        </button>
      </form>

      <form action={remove} style={{ marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid rgba(26,5,18,0.12)" }}>
        <button
          type="submit"
          style={{
            background: "none",
            border: "1px solid #C0392B",
            color: "#C0392B",
            borderRadius: "0.5rem",
            padding: "0.625rem 1.25rem",
            fontSize: "0.8125rem",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Delete post
        </button>
      </form>
    </div>
  );
}
