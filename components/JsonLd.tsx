// Serialises a JSON-LD graph into a <script> tag. Server component — it renders
// once into the HTML and ships no client JS.
//
// `<` is escaped so a "</script>" sequence inside any content string can never
// close the tag early.
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
