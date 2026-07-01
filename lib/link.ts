// Deep-link plumbing shared by the reader (anchors) and the /index.json manifest
// (Lectern's hook). Both derive a play's anchor from its OSIS refKey via the SAME
// function, so a link Lectern builds always matches the id the reader renders.
//
// The refKey is the Wroot data standard (see reference_data-repository-standard):
// "Gen.2.7" for a verse, "Gen.2.25-Gen.3.1" for a range. It is the join key
// across Fons, the lenses, and Lectern.

export type OsisPoint = { osis: string; book: string; chapter: number; verse: number };

// "Gen.2.7" -> "gen-2-7";  "Gen.2.25-Gen.3.1" -> "gen-2-25-gen-3-1".
export function playAnchor(refKey: string): string {
  return refKey
    .toLowerCase()
    .replace(/[.:]/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

function point(osis: string): OsisPoint {
  const [book, ch, v] = osis.split(".");
  return { osis, book, chapter: Number(ch), verse: Number(v) };
}

// Split a refKey into its start/end verse points (end === start for a single verse),
// so Lectern can test whether a lectionary reading's range overlaps a play.
export function boundsFromRefKey(refKey: string): { start: OsisPoint; end: OsisPoint } {
  const [a, b] = refKey.split("-");
  const start = point(a);
  return { start, end: b ? point(b) : start };
}
