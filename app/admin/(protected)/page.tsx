import Link from "next/link";
import { getAllPostsForAdmin } from "@/lib/blog";

export default async function AdminDashboardPage() {
  const posts = await getAllPostsForAdmin();

  return (
    <div>
      <h1 style={{ fontSize: "1.375rem", fontWeight: 800, color: "#1A0512", marginBottom: "1.5rem" }}>
        Posts
      </h1>

      {posts.length === 0 ? (
        <p style={{ color: "rgba(26,5,18,0.6)", fontSize: "0.9375rem" }}>No posts yet.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {posts.map((post) => (
            <div
              key={post.id}
              style={{
                background: "#fff",
                borderRadius: "0.75rem",
                padding: "1rem 1.25rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1rem",
                boxShadow: "0 0.25rem 0.75rem -0.5rem rgba(26,5,18,0.25)",
              }}
            >
              <div style={{ minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
                  <span
                    style={{
                      fontSize: "0.625rem",
                      fontWeight: 700,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: "#902793",
                      background: "#F3E5F5",
                      borderRadius: "0.25rem",
                      padding: "0.125rem 0.375rem",
                    }}
                  >
                    {post.lang}
                  </span>
                  <span
                    style={{
                      fontSize: "0.625rem",
                      fontWeight: 700,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: post.published ? "#166534" : "rgba(26,5,18,0.55)",
                      background: post.published ? "#DCFCE7" : "rgba(26,5,18,0.08)",
                      borderRadius: "0.25rem",
                      padding: "0.125rem 0.375rem",
                    }}
                  >
                    {post.published ? "Published" : "Draft"}
                  </span>
                </div>
                <div style={{ fontWeight: 700, color: "#1A0512", fontSize: "0.9375rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {post.title}
                </div>
                <div style={{ fontSize: "0.75rem", color: "rgba(26,5,18,0.5)" }}>/{post.lang === "ka" ? "blog" : "en/blog"}/{post.slug}</div>
              </div>
              <Link
                href={`/admin/${post.id}/edit`}
                style={{ flexShrink: 0, fontSize: "0.8125rem", fontWeight: 700, color: "#902793", textDecoration: "none" }}
              >
                Edit →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
