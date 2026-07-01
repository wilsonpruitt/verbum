import Link from "next/link";
import { notFound } from "next/navigation";
import { EDITIONS, editionBySlug } from "@/data/editions";
import Reader, { type PlayText } from "@/components/Reader";
import { passage } from "@/lib/fons";
import type { Edition } from "@/lib/types";

// Resolve every play's scripture from Fons at build time, so the reader renders
// the text statically (like Loci and Voces) rather than fetching in the browser.
async function resolveTexts(e: Edition): Promise<Record<string, PlayText>> {
  const out: Record<string, PlayText> = {};
  await Promise.all(
    e.scenes.flatMap((s) =>
      s.plays.map(async (p, i) => {
        try {
          const r = await passage(p.ref);
          if (r && r.verses.length) out[`${s.id}-${i}`] = { refKey: r.refKey, refDisplay: r.refDisplay, verses: r.verses };
        } catch {
          /* leave unresolved; the reader falls back to the reference alone */
        }
      }),
    ),
  );
  return out;
}

const ACCENT = "#9a5a2f"; // verbum copper — the chrome accent for the SOUND lens
const INK = "#2c2418";
const MUTED = "#8a7a6a";
const serif = "'Cormorant Garamond', Georgia, serif";
const text = "'Crimson Pro', Georgia, serif";

export function generateStaticParams() {
  return EDITIONS.map((e) => ({ edition: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ edition: string }> }) {
  const { edition: slug } = await params;
  const e = editionBySlug(slug);
  if (!e) return {};
  return {
    title: `${e.name} · Verbum`,
    description: e.blurb,
  };
}

export default async function EditionPage({ params }: { params: Promise<{ edition: string }> }) {
  const { edition: slug } = await params;
  const e = editionBySlug(slug);
  if (!e) notFound();

  const texts = await resolveTexts(e);

  return (
    <div style={{ minHeight: "100vh", background: "#f5f0e8", color: INK }}>
      <header style={{ background: "#2c2418", color: "#f5f0e8", padding: "40px 24px 36px", textAlign: "center" }}>
        <Link href="/" style={{ color: "#cbb08a", textDecoration: "none", fontFamily: serif, fontSize: 14, letterSpacing: 3 }}>
          ← VERBUM
        </Link>
        <h1 style={{ fontFamily: serif, fontSize: 56, fontWeight: 700, margin: "14px 0 0", letterSpacing: 8 }}>
          {e.name.toUpperCase()}
        </h1>
        <div style={{ width: 70, height: 1, background: ACCENT, margin: "14px auto" }} />
        {e.subtitle && (
          <p style={{ fontFamily: serif, fontStyle: "italic", color: "#dcc3a1", fontSize: 18, letterSpacing: 2, margin: 0 }}>
            {e.subtitle}
          </p>
        )}
      </header>

      <main style={{ maxWidth: 800, margin: "0 auto", padding: "36px 24px 90px" }}>
        <p style={{ fontFamily: text, fontSize: 17.5, lineHeight: 1.78, color: "#4a3d30", margin: "0 0 16px" }}>{e.intro}</p>

        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 12,
            flexWrap: "wrap",
            padding: "12px 16px",
            background: "#eee9df",
            border: "1px solid #d4c9b5",
            borderLeft: `4px solid ${ACCENT}`,
            borderRadius: 6,
            marginBottom: 8,
          }}
        >
          <span
            style={{
              fontFamily: serif,
              fontSize: 11.5,
              fontWeight: 700,
              letterSpacing: 1.5,
              textTransform: "uppercase",
              color: ACCENT,
              whiteSpace: "nowrap",
            }}
          >
            {e.coverage.complete ? "Complete book" : "Selected passages"}
          </span>
          <span style={{ fontFamily: text, fontStyle: "italic", fontSize: 15.5, lineHeight: 1.55, color: "#4a3d30" }}>
            {e.coverage.note}
          </span>
        </div>

        <Reader edition={e} texts={texts} />

        <p style={{ marginTop: 56, fontSize: 12, color: MUTED, textAlign: "center", letterSpacing: 1, lineHeight: 1.7, fontFamily: serif }}>
          Scripture: {e.source} · Public Domain
          <br />
          {e.language} text: Open Scriptures Hebrew Bible (Westminster Leningrad Codex) ·{" "}
          <a href="https://creativecommons.org/licenses/by/4.0/" style={{ color: MUTED }}>
            CC BY 4.0
          </a>
          <br />
          Wroot Press
        </p>
      </main>
    </div>
  );
}
