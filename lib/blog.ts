import { getDb } from "./db";
import type { Locale } from "./routing";

export type Post = {
  id: number;
  lang: Locale;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // markdown
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

type PostRow = {
  id: number;
  lang: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  published: boolean;
  created_at: Date;
  updated_at: Date;
};

function fromRow(row: PostRow): Post {
  return {
    id: row.id,
    lang: row.lang as Locale,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content,
    published: row.published,
    createdAt: row.created_at.toISOString(),
    updatedAt: row.updated_at.toISOString(),
  };
}

// Runs on every DB call rather than as a separate migration step — this is a
// single small table for a low-traffic blog, and CREATE TABLE IF NOT EXISTS
// is cheap/idempotent, so there's no real migration tooling needed. Seeds one
// sample post the first time the table is empty, so the blog shows something
// immediately once DATABASE_URL is wired up, before any real post is written.
let schemaReady: Promise<void> | undefined;
function ensureSchema(): Promise<void> {
  if (!schemaReady) {
    schemaReady = (async () => {
      const sql = getDb();
      await sql`
        CREATE TABLE IF NOT EXISTS posts (
          id SERIAL PRIMARY KEY,
          lang TEXT NOT NULL CHECK (lang IN ('ka','en')),
          slug TEXT NOT NULL,
          title TEXT NOT NULL,
          excerpt TEXT NOT NULL DEFAULT '',
          content TEXT NOT NULL DEFAULT '',
          published BOOLEAN NOT NULL DEFAULT false,
          created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
          UNIQUE (lang, slug)
        )
      `;
      const [{ count }] = await sql<{ count: string }[]>`SELECT count(*)::text FROM posts`;
      if (count === "0") {
        await sql`
          INSERT INTO posts (lang, slug, title, excerpt, content, published)
          VALUES (
            'en',
            'hello-world',
            'Hello, world',
            'A sample post so you can see the blog working end to end before writing anything real.',
            ${"This is a sample post created automatically the first time the blog's database connected.\n\nWrite in **Markdown** here — headings, *italics*, [links](https://grapevine.ge), and lists all work:\n\n- Write a real post from /admin\n- Delete this one once you do\n- Publishing is just a checkbox on the post form"},
            true
          )
        `;
      }
    })();
  }
  return schemaReady;
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9Ⴀ-ჿ]+/g, "-") // keep latin + Georgian (Mkhedruli) letters
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "post";
}

async function uniqueSlug(lang: Locale, base: string): Promise<string> {
  const sql = getDb();
  let candidate = base;
  let n = 2;
  // Small table, low write frequency — a loop here is fine, no need for a
  // fancier collision-free scheme.
  while (true) {
    const rows = await sql`SELECT 1 FROM posts WHERE lang = ${lang} AND slug = ${candidate}`;
    if (rows.length === 0) return candidate;
    candidate = `${base}-${n++}`;
  }
}

export async function getPublishedPosts(lang: Locale): Promise<Post[]> {
  await ensureSchema();
  const sql = getDb();
  const rows = await sql<PostRow[]>`
    SELECT * FROM posts WHERE lang = ${lang} AND published = true ORDER BY created_at DESC
  `;
  return rows.map(fromRow);
}

export async function getPublishedPostBySlug(lang: Locale, slug: string): Promise<Post | null> {
  await ensureSchema();
  const sql = getDb();
  const rows = await sql<PostRow[]>`
    SELECT * FROM posts WHERE lang = ${lang} AND slug = ${slug} AND published = true LIMIT 1
  `;
  return rows[0] ? fromRow(rows[0]) : null;
}

export async function getAllPostsForAdmin(): Promise<Post[]> {
  await ensureSchema();
  const sql = getDb();
  const rows = await sql<PostRow[]>`SELECT * FROM posts ORDER BY created_at DESC`;
  return rows.map(fromRow);
}

export async function getPostById(id: number): Promise<Post | null> {
  await ensureSchema();
  const sql = getDb();
  const rows = await sql<PostRow[]>`SELECT * FROM posts WHERE id = ${id} LIMIT 1`;
  return rows[0] ? fromRow(rows[0]) : null;
}

export async function createPost(data: {
  lang: Locale;
  title: string;
  slug?: string;
  excerpt: string;
  content: string;
  published: boolean;
}): Promise<Post> {
  await ensureSchema();
  const sql = getDb();
  const slug = await uniqueSlug(data.lang, slugify(data.slug?.trim() || data.title));
  const rows = await sql<PostRow[]>`
    INSERT INTO posts (lang, slug, title, excerpt, content, published)
    VALUES (${data.lang}, ${slug}, ${data.title}, ${data.excerpt}, ${data.content}, ${data.published})
    RETURNING *
  `;
  return fromRow(rows[0]);
}

export async function updatePost(
  id: number,
  data: { title: string; excerpt: string; content: string; published: boolean; slug: string }
): Promise<Post> {
  await ensureSchema();
  const sql = getDb();
  const rows = await sql<PostRow[]>`
    UPDATE posts
    SET title = ${data.title},
        excerpt = ${data.excerpt},
        content = ${data.content},
        published = ${data.published},
        slug = ${slugify(data.slug)},
        updated_at = now()
    WHERE id = ${id}
    RETURNING *
  `;
  return fromRow(rows[0]);
}

export async function deletePost(id: number): Promise<void> {
  await ensureSchema();
  const sql = getDb();
  await sql`DELETE FROM posts WHERE id = ${id}`;
}
