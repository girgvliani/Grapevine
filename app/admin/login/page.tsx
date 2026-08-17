import { loginAction } from "@/lib/adminActions";

export const metadata = { robots: { index: false, follow: false } };

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#FFFAEC",
        fontFamily: "system-ui, sans-serif",
        padding: "1.5rem",
      }}
    >
      <form
        action={loginAction}
        style={{
          background: "#fff",
          borderRadius: "1rem",
          padding: "2.5rem",
          width: "100%",
          maxWidth: "22rem",
          boxShadow: "0 1rem 3rem -1rem rgba(26,5,18,0.2)",
        }}
      >
        <h1 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#1A0512", marginBottom: "0.25rem" }}>
          Grapevine Blog Admin
        </h1>
        <p style={{ fontSize: "0.875rem", color: "rgba(26,5,18,0.6)", marginBottom: "1.5rem" }}>
          Enter the admin password to continue.
        </p>

        {error && (
          <p style={{ background: "#FDE2E2", color: "#9B2226", borderRadius: "0.5rem", padding: "0.625rem 0.875rem", fontSize: "0.8125rem", marginBottom: "1.25rem" }}>
            Incorrect password.
          </p>
        )}

        <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, color: "#1A0512", marginBottom: "0.375rem" }}>
          Password
        </label>
        <input
          type="password"
          name="password"
          autoFocus
          required
          style={{
            width: "100%",
            padding: "0.625rem 0.75rem",
            borderRadius: "0.5rem",
            border: "1px solid rgba(26,5,18,0.2)",
            fontSize: "0.9375rem",
            marginBottom: "1.25rem",
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            background: "#902793",
            color: "#fff",
            border: "none",
            borderRadius: "0.5rem",
            padding: "0.75rem",
            fontSize: "0.875rem",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Log in
        </button>
      </form>
    </div>
  );
}
