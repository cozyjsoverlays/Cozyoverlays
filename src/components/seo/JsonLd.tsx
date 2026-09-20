/**
 * Renders a JSON-LD <script> for structured data (rich results in Google).
 * Server component - the markup ships in the initial HTML so crawlers see it.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe to inline here (no user-controlled HTML).
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
