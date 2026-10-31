// Add one internal link per service to each published post: the first
// mention of a service name becomes a link to that service page (SEO
// review item 6 / "hyperlink blog", 26-31 Oct 2026). Dry run by default;
// pass --write to update the database. Idempotent: a post that already
// links to a service page is left alone for that service.
import { readFileSync } from "node:fs";
import postgres from "postgres";

const write = process.argv.includes("--write");
const env = readFileSync(new URL("../.env", import.meta.url), "utf8");
const url = env.match(/^DATABASE_URL=(.+)$/m)?.[1]?.trim().replace(/^["']|["']$/g, "");
const sql = postgres(url, { max: 1, ssl: "prefer" });

// Longest phrases first so "ციფრული მარკეტინგი" wins over "მარკეტინგი".
const SERVICES = {
  ka: [
    ["digital-advertising", /ციფრული მარკეტინგ\S*/u],
    ["seo", /SEO ოპტიმიზაცი\S*/u],
    ["seo", /SEO სააგენტო\S*/u],
    ["branding", /ბრენდინგ\S*/u],
    ["web-development", /ვებ(?:საიტის|გვერდის) დამზადებ\S*/u],
    ["web-development", /ვებ დეველოპმენტ\S*/u],
    ["pr-services", /PR (?:სერვის|მომსახურებ|სააგენტო|მენეჯმენტ)\S*/u],
    ["campaigns", /სარეკლამო კამპანი\S*/u],
    ["campaigns", /Google Ads/u],
    ["mobile-app", /მობილური აპლიკაცი\S*/u],
    ["crm-systems", /CRM სისტემ\S*/u],
    ["strategy", /მარკეტინგული სტრატეგი\S*/u],
    ["social-media-audit", /სოციალური მედიის აუდიტ\S*/u],
    ["production", /ვიდეო პროდაქშენ\S*/u],
  ],
  en: [
    ["digital-advertising", /digital (?:marketing|advertising)/iu],
    ["seo", /SEO optimi[sz]ation/u],
    ["seo", /SEO agency/u],
    ["branding", /\bbranding\b/iu],
    ["web-development", /web(?:site)? development/iu],
    ["pr-services", /\bPR (?:services?|management|agency)/u],
    ["campaigns", /advertising campaigns?/iu],
    ["campaigns", /Google Ads/u],
    ["mobile-app", /mobile app(?:lication)?s?/iu],
    ["crm-systems", /CRM systems?/u],
    ["strategy", /marketing strategy/iu],
    ["social-media-audit", /social media audit/iu],
    ["production", /video production/iu],
  ],
};

function href(lang, slug) {
  return lang === "en" ? `/en/services/${slug}` : `/services/${slug}`;
}

// Is `index` inside an existing markdown link [..](..) or a heading line?
function insideLink(text, index) {
  const before = text.slice(0, index);
  const open = before.lastIndexOf("[");
  const close = before.lastIndexOf("]");
  return open > close; // an unclosed "[" before us
}

const rows = await sql`SELECT id, lang, slug, content FROM posts WHERE published = true ORDER BY id`;
for (const post of rows) {
  let content = post.content;
  const linked = new Set([...content.matchAll(/\]\((?:\/en)?\/services\/([a-z-]+)\)/g)].map((m) => m[1]));
  // Never link a post to the service it is itself about by slug coincidence twice.
  const added = [];
  for (const [slug, pattern] of SERVICES[post.lang]) {
    if (linked.has(slug)) continue;
    const m = pattern.exec(content);
    if (!m || insideLink(content, m.index)) continue;
    const replacement = `[${m[0]}](${href(post.lang, slug)})`;
    content = content.slice(0, m.index) + replacement + content.slice(m.index + m[0].length);
    linked.add(slug);
    added.push(`${m[0]} -> ${slug}`);
  }
  console.log(`#${post.id} ${post.lang}/${post.slug}: ${added.length ? added.join(" | ") : "(no change)"}`);
  if (write && added.length) {
    await sql`UPDATE posts SET content = ${content}, updated_at = now() WHERE id = ${post.id}`;
  }
}
console.log(write ? "written" : "dry run only (pass --write to apply)");
await sql.end();
