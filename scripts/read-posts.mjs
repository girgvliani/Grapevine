// Read-only: list published posts and the lines that are whole-line bold
// (the pseudo-subheadings the SEO review wants turned into H2s).
import { readFileSync } from "node:fs";
import postgres from "postgres";
const env = readFileSync(new URL("../.env", import.meta.url), "utf8");
const url = env.match(/^DATABASE_URL=(.+)$/m)?.[1]?.trim().replace(/^["']|["']$/g, "");
const sql = postgres(url, { max: 1, ssl: "prefer" });
const rows = await sql`SELECT id, lang, slug, title, published, length(content) AS len, content FROM posts ORDER BY id`;
for (const r of rows) {
  const lines = r.content.split("\n");
  const h2 = lines.filter((l) => /^##\s/.test(l)).length;
  const bold = lines.filter((l) => /^\s*\*\*[^*]+\*\*\s*$/.test(l));
  console.log(`#${r.id} ${r.lang} ${r.slug} published=${r.published} len=${r.len} h2=${h2} boldLines=${bold.length}`);
  for (const b of bold.slice(0, 12)) console.log("    " + b.trim());
}
await sql.end();
