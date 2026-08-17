// /admin lives outside app/[lang]/, so it doesn't inherit that segment's
// root layout (which provides <html>/<body> for the bilingual marketing
// site) — every top-level route subtree needs its own. This is a self-
// contained, minimal shell just for the admin tool; it intentionally does
// NOT reuse the main site's fonts/Nav/Cursor/etc., since this is an internal
// utility, not part of the public bilingual site.
export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
