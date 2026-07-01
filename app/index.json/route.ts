import { EDITIONS } from "@/data/editions";
import { passage } from "@/lib/fons";
import { boundsFromRefKey, playAnchor } from "@/lib/link";
import { KIND_LABEL } from "@/lib/types";

// The Verbum play index — a static manifest of every wordplay in every edition,
// keyed by the OSIS refKey (the shared Wroot data standard). This is how Lectern
// (or any consumer) discovers whether Verbum has anything for a given scripture
// reference before offering a deep link: Verbum is a curated selection, not a
// complete Bible, so the affordance should only appear where a play exists.
//
// Each entry carries the refKey, the human display ref, the play's kind and
// heading, a ready-made deep-link URL (relative + absolute), and the start/end
// verse bounds so a consumer can test overlap against a lectionary reading's
// range — not just an exact single-verse hit.
//
// Prerendered at build time (force-static) and served as /index.json.

export const dynamic = "force-static";

const BASE = "https://verbum.wrootpress.com";

export async function GET() {
  const plays = [];
  for (const e of EDITIONS) {
    for (const scene of e.scenes) {
      for (const p of scene.plays) {
        const r = await passage(p.ref);
        if (!r) continue;
        const anchor = playAnchor(r.refKey);
        const { start, end } = boundsFromRefKey(r.refKey);
        plays.push({
          edition: e.slug,
          refKey: r.refKey,
          refDisplay: r.refDisplay,
          book: r.book,
          kind: p.kind,
          kindLabel: KIND_LABEL[p.kind],
          heading: p.heading ?? null,
          contested: !!p.contested,
          anchor,
          path: `/${e.slug}#${anchor}`,
          url: `${BASE}/${e.slug}#${anchor}`,
          start,
          end,
        });
      }
    }
  }

  const manifest = {
    product: "Verbum",
    base: BASE,
    note:
      "Wordplay index keyed by OSIS refKey. Curated, not complete — presence here means a play exists for that reference. Use start/end to test overlap with a passage range.",
    count: plays.length,
    plays,
  };

  return new Response(JSON.stringify(manifest, null, 2), {
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}
