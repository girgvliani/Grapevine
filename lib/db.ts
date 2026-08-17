import postgres, { type Sql } from "postgres";

declare global {
  // eslint-disable-next-line no-var
  var __blogDb: Sql | undefined;
}

// Cached on `global` so dev-mode hot-reloads reuse one connection pool
// instead of leaking a new one on every file save.
export function getDb(): Sql {
  if (!process.env.DATABASE_URL) {
    throw new Error(
      "DATABASE_URL is not set. Add your Railway Postgres connection string to .env locally, and to Vercel's project env vars for production."
    );
  }
  if (!global.__blogDb) {
    // "prefer": use SSL if the server offers it, fall back to plain if not.
    // Railway's connection string doesn't always specify sslmode explicitly,
    // and whether SSL is required varies by plan, so this works either way
    // instead of guessing.
    global.__blogDb = postgres(process.env.DATABASE_URL, { max: 5, ssl: "prefer" });
  }
  return global.__blogDb;
}
