interface JsonLdProps {
  data: object | object[];
}

/** Renders JSON-LD structured data script for SEO */
export default function JsonLd({ data }: JsonLdProps) {
  const json = Array.isArray(data) ? data : [data];
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(json.length === 1 ? json[0] : json),
      }}
    />
  );
}
