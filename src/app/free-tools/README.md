# Free Tools

Client-side, no-login browser tools for streamers - SEO landing pages that
funnel to the shop. **Everything runs in the browser** (Canvas/FileReader); no
files are ever uploaded, no backend is involved.

## Where things live

- **All platform sizes, limits, CTA links, and the tool list:** `src/lib/tools-config.ts`.
  Edit constants here when platforms change their emote/badge/panel specs.
- **Shared components:** `src/components/tools/` - `ToolLayout`, `DropZone`,
  `SizeBadge`, `ChatPreview`, `ToolCTA`, `ToolFaq`.
- **Hub:** `src/app/free-tools/page.tsx` (the index, lists `TOOLS`).
- **Each tool:** `src/app/free-tools/<slug>/page.tsx`.

## Add a new tool

1. Add an entry to `TOOLS` in `src/lib/tools-config.ts` (set `live: false` until ready).
2. Create `src/app/free-tools/<slug>/page.tsx`:
   - Export `metadata` (unique title + description + canonical + OG).
   - Render `<ToolLayout>` with the interactive piece as a `"use client"` component.
   - Add `SoftwareApplication` + `FAQPage` JSON-LD via `<JsonLd>` and `faqLd()`.
   - End with `<ToolCTA>` (a relevant shop link) and `<ToolFaq>`.
3. Flip `live: true` - the hub card, nav, and `sitemap.ts` pick it up automatically.

## Privacy

Any tool that touches user files must show the "Your files never leave your
device" line (`DropZone` already does). Keep it 100% client-side.
