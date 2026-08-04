// X/Twitter reads its own `twitter:image` rather than falling back to og:image
// on every surface, so reuse the same card instead of maintaining a second one.
// `generateStaticParams` is re-exported too, otherwise this route alone stays
// server-rendered on demand and re-rasterises the PNG on every scrape.
export {
  default,
  size,
  contentType,
  alt,
  generateStaticParams,
} from "./opengraph-image";
