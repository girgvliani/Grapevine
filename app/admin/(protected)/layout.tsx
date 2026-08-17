import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ADMIN_COOKIE, verifySessionToken } from "@/lib/adminAuth";
import { logoutAction } from "@/lib/adminActions";

export const metadata = { robots: { index: false, follow: false } };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const store = await cookies();
  if (!verifySessionToken(store.get(ADMIN_COOKIE)?.value)) {
    redirect("/admin/login");
  }

  return (
    <div style={{ minHeight: "100vh", background: "#FFFAEC", fontFamily: "system-ui, sans-serif" }}>
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1rem 1.5rem",
          background: "#1A0512",
        }}
      >
        <Link href="/admin" style={{ color: "#fff", fontWeight: 800, textDecoration: "none", fontSize: "0.9375rem" }}>
          Grapevine Blog Admin
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Link href="/admin/new" style={{ color: "#FFEFAB", fontSize: "0.8125rem", fontWeight: 700, textDecoration: "none" }}>
            + New post
          </Link>
          <form action={logoutAction}>
            <button
              type="submit"
              style={{ background: "none", border: "1px solid rgba(255,255,255,0.3)", color: "#fff", borderRadius: "0.375rem", padding: "0.375rem 0.75rem", fontSize: "0.75rem", cursor: "pointer" }}
            >
              Log out
            </button>
          </form>
        </div>
      </header>
      <main style={{ maxWidth: "48rem", margin: "0 auto", padding: "2rem 1.5rem" }}>{children}</main>
    </div>
  );
}
