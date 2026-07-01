"use client";

import { useEffect, useState, type CSSProperties } from "react";
import type { Edition, Kind } from "@/lib/types";
import { echoInk, KIND_LABEL } from "@/lib/types";
import { playAnchor } from "@/lib/link";

const INK = "#2c2418";
const MUTED = "#8a7a6a";
const ACCENT = "#9a5a2f";
const serif = "'Cormorant Garamond', Georgia, serif";
const text = "'Crimson Pro', Georgia, serif";

export type PlayText = { refKey: string; refDisplay: string; verses: { v: number; t: string }[] };

// The Verbum reader. For each play it sets the English scripture (resolved on
// the server, passed in), then a "sound panel" that stands the original words
// beside it — each word given its transliteration and gloss, and the words that
// play against one another keyed in a shared ink so the echo is visible. Two
// lines follow: what the play is, and what the English cannot carry. Where the
// play or its etymology is disputed, a flag opens the crux inline. A kind-filter
// at the top lets the reader isolate one sort of play (puns, name-plays, …).
export default function Reader({
  edition,
  texts,
}: {
  edition: Edition;
  texts: Record<string, PlayText>;
}) {
  const [focus, setFocus] = useState<Kind | null>(null);
  const [openCrux, setOpenCrux] = useState<string | null>(null);
  const [active, setActive] = useState<string | null>(null); // deep-linked play (from #hash)

  // Honor a #gen-2-7 fragment on load or hash change: scroll to the play and
  // flash it briefly. This is the target of Lectern's deep links.
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const jump = () => {
      const h = decodeURIComponent(window.location.hash.replace(/^#/, ""));
      if (!h) return;
      setActive(h);
      document.getElementById(h)?.scrollIntoView({ behavior: "smooth", block: "start" });
      clearTimeout(timer);
      timer = setTimeout(() => setActive(null), 2600);
    };
    jump();
    window.addEventListener("hashchange", jump);
    return () => {
      window.removeEventListener("hashchange", jump);
      clearTimeout(timer);
    };
  }, []);

  // Which kinds actually appear, in the order the vocabulary defines them.
  const present = (Object.keys(KIND_LABEL) as Kind[]).filter((k) =>
    edition.scenes.some((s) => s.plays.some((p) => p.kind === k)),
  );

  return (
    <div>
      {/* The kind key — also the focus control */}
      <div style={S.legend}>
        <div style={S.legendLabel}>
          The Play{" "}
          {focus && <span style={{ textTransform: "none", letterSpacing: 0 }}>· tap again to clear</span>}
        </div>
        <div style={S.chips}>
          {present.map((k) => {
            const active = focus === k;
            const dim = focus !== null && !active;
            return (
              <button
                key={k}
                onClick={() => setFocus(active ? null : k)}
                style={{
                  ...S.chip,
                  border: `1px solid ${active ? ACCENT : "#d4c9b5"}`,
                  background: active ? ACCENT : "#eee9df",
                  color: active ? "#f5f0e8" : INK,
                  opacity: dim ? 0.4 : 1,
                }}
              >
                {KIND_LABEL[k]}
              </button>
            );
          })}
        </div>
      </div>

      {edition.scenes.map((scene) => (
        <section key={scene.id} style={{ marginTop: 38 }}>
          <h2 style={S.sceneTitle}>{scene.title}</h2>
          {scene.note && <p style={S.sceneNote}>{scene.note}</p>}

          <div style={{ marginTop: 18 }}>
            {scene.plays.map((p, i) => {
              const key = `${scene.id}-${i}`;
              const dim = focus !== null && focus !== p.kind;
              const t = texts[key];
              const cruxOpen = openCrux === key;
              const anchor = playAnchor(t ? t.refKey : p.ref);
              const lit = active === anchor;

              return (
                <div
                  key={key}
                  id={anchor}
                  style={{
                    marginBottom: 30,
                    opacity: dim ? 0.24 : 1,
                    scrollMarginTop: 96, // clear the sticky legend
                    borderRadius: 8,
                    transition: "opacity 0.15s, background 0.4s, box-shadow 0.4s",
                    ...(lit ? { background: "#f0e6d2", boxShadow: `0 0 0 8px #f0e6d2, 0 0 0 9px ${ACCENT}` } : {}),
                  }}
                >
                  {/* label line: kind · heading · reference · permalink · ? */}
                  <div style={S.labelLine}>
                    <span style={S.kindBadge}>{KIND_LABEL[p.kind]}</span>
                    {p.heading && <span style={S.heading}>{p.heading}</span>}
                    <span style={S.ref}>· {t ? t.refDisplay : p.ref}</span>
                    <a href={`#${anchor}`} title="Link to this play" style={S.permalink}>
                      #
                    </a>
                    {p.contested && (
                      <button onClick={() => setOpenCrux(cruxOpen ? null : key)} style={S.cruxBtn} title="Disputed">
                        <span style={{ fontWeight: 700 }}>?</span> {cruxOpen ? "▲" : "disputed"}
                      </button>
                    )}
                  </div>

                  {p.contested && cruxOpen && p.contestedNote && <p style={S.cruxNote}>{p.contestedNote}</p>}

                  {/* the English scripture */}
                  <div style={S.textBlock}>
                    {t ? (
                      <span style={S.scripture}>
                        {t.verses.map((vs) => (
                          <span key={vs.v}>
                            <span style={S.vnum}>{vs.v}</span>
                            {vs.t}{" "}
                          </span>
                        ))}
                      </span>
                    ) : (
                      <span style={{ ...S.scripture, ...S.placeholder }}>{p.ref}</span>
                    )}
                  </div>

                  {/* the sound panel: the original words, echo-paired in ink */}
                  <div style={S.sound}>
                    <div style={S.soundLabel}>In the {edition.language}</div>
                    <div style={S.terms}>
                      {p.terms.map((term, ti) => {
                        const ink = echoInk(term.echo, "#6a5d4d");
                        return (
                          <div key={ti} style={S.term}>
                            <span style={{ ...S.translit, color: ink, borderBottom: `2px solid ${ink}` }}>
                              {term.translit}
                            </span>
                            {term.original && <span style={S.original}>{term.original}</span>}
                            <span style={S.gloss}>“{term.gloss}”</span>
                            {term.note && <span style={S.termNote}>{term.note}</span>}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* what the play is, and what the English can't carry */}
                  <p style={S.what}>{p.what}</p>
                  <p style={S.lost}>
                    <span style={S.lostTag}>Lost in English</span> {p.lost}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}

const S: Record<string, CSSProperties> = {
  legend: {
    position: "sticky",
    top: 0,
    zIndex: 5,
    background: "#f5f0e8",
    borderBottom: "1px solid #d4c9b5",
    padding: "12px 0 14px",
  },
  legendLabel: {
    fontFamily: serif,
    fontSize: 12,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: MUTED,
    marginBottom: 8,
  },
  chips: { display: "flex", flexWrap: "wrap", gap: 7 },
  chip: {
    display: "inline-flex",
    alignItems: "center",
    cursor: "pointer",
    borderRadius: 20,
    padding: "4px 12px",
    fontFamily: serif,
    fontSize: 14,
    fontWeight: 600,
    letterSpacing: 0.3,
    textTransform: "lowercase",
    transition: "opacity 120ms",
  },
  sceneTitle: {
    fontFamily: serif,
    fontSize: 26,
    fontWeight: 600,
    letterSpacing: 1,
    color: INK,
    margin: "0 0 4px",
  },
  sceneNote: {
    fontFamily: text,
    fontStyle: "italic",
    color: "#6a5d4d",
    fontSize: 16,
    lineHeight: 1.55,
    margin: "0 0 6px",
    maxWidth: 640,
  },
  labelLine: { display: "flex", alignItems: "baseline", flexWrap: "wrap", gap: 8, marginBottom: 5 },
  kindBadge: {
    fontFamily: serif,
    fontSize: 10.5,
    fontWeight: 700,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    color: "#f5f0e8",
    background: ACCENT,
    borderRadius: 3,
    padding: "1px 7px",
  },
  heading: { fontFamily: serif, fontSize: 17, fontWeight: 600, color: INK, letterSpacing: 0.3 },
  ref: { fontFamily: serif, fontSize: 13, color: MUTED, fontStyle: "italic" },
  permalink: {
    fontFamily: serif,
    fontSize: 13,
    fontWeight: 700,
    color: "#c9bca8",
    textDecoration: "none",
    letterSpacing: 0.5,
  },
  cruxBtn: {
    cursor: "pointer",
    border: "1px dashed #b08948",
    background: "rgba(176,137,72,0.08)",
    color: "#8a6322",
    borderRadius: 4,
    padding: "0 7px",
    fontFamily: serif,
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: 0.3,
  },
  cruxNote: {
    fontFamily: text,
    fontSize: 14.5,
    lineHeight: 1.6,
    color: "#6a5d4d",
    margin: "0 0 8px",
    paddingLeft: 12,
    borderLeft: "2px solid #d8c08a",
    maxWidth: 640,
  },
  textBlock: { maxWidth: 680 },
  scripture: { fontFamily: text, fontSize: 17.5, lineHeight: 1.95, color: INK },
  vnum: { fontSize: 11, color: MUTED, verticalAlign: "super", marginRight: 3 },
  placeholder: { color: MUTED, fontStyle: "italic" },
  sound: {
    margin: "14px 0 12px",
    padding: "14px 18px",
    background: "#efe7d7",
    border: "1px solid #ddceb2",
    borderRadius: 6,
    maxWidth: 680,
  },
  soundLabel: {
    fontFamily: serif,
    fontSize: 10.5,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: ACCENT,
    marginBottom: 10,
  },
  terms: { display: "flex", flexWrap: "wrap", gap: "10px 26px" },
  term: { display: "flex", flexDirection: "column", gap: 2, minWidth: 120 },
  translit: {
    fontFamily: serif,
    fontStyle: "italic",
    fontSize: 22,
    fontWeight: 600,
    lineHeight: 1.1,
    paddingBottom: 1,
    alignSelf: "flex-start",
  },
  original: { fontSize: 20, color: "#4a3d30", lineHeight: 1.2, direction: "rtl", unicodeBidi: "isolate" },
  gloss: { fontFamily: text, fontSize: 15, color: "#4a3d30", fontStyle: "italic" },
  termNote: { fontFamily: text, fontSize: 13, color: MUTED, lineHeight: 1.4, maxWidth: 200 },
  what: { fontFamily: text, fontSize: 16.5, lineHeight: 1.7, color: INK, margin: "0 0 6px", maxWidth: 660 },
  lost: { fontFamily: text, fontSize: 15.5, lineHeight: 1.65, color: "#5a4d3d", margin: 0, maxWidth: 660 },
  lostTag: {
    fontFamily: serif,
    fontSize: 10.5,
    fontWeight: 700,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    color: ACCENT,
    marginRight: 6,
  },
};
