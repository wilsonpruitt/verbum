import Link from "next/link";
import { EDITIONS } from "@/data/editions";

const ACCENT = "#9a5a2f"; // verbum copper — the chrome accent for the SOUND lens
const INK = "#2c2418";
const MUTED = "#8a7a6a";
const serif = "'Cormorant Garamond', Georgia, serif";
const text = "'Crimson Pro', Georgia, serif";

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", background: "#f5f0e8", color: INK }}>
      <header style={{ background: "#2c2418", color: "#f5f0e8", padding: "64px 24px 56px", textAlign: "center" }}>
        <div style={{ color: ACCENT, letterSpacing: 10, marginBottom: 16, fontSize: 14 }}>— · — · —</div>
        <h1 style={{ fontFamily: serif, fontSize: 72, fontWeight: 700, margin: 0, letterSpacing: 16 }}>VERBUM</h1>
        <div style={{ width: 80, height: 1, background: ACCENT, margin: "16px auto" }} />
        <p style={{ fontFamily: serif, fontStyle: "italic", color: "#d6b48a", fontSize: 19, letterSpacing: 2, margin: 0 }}>
          Scripture, read by sound
        </p>
      </header>

      <main style={{ maxWidth: 760, margin: "0 auto", padding: "48px 24px 80px", fontFamily: text }}>
        <p style={{ fontSize: 17, lineHeight: 1.75, color: "#4a3d30" }}>
          A small Wroot Press project. <em>Verbum</em> — Latin for <em>the word</em>. The Hebrew of Scripture
          is thick with play the English cannot carry: the human (<em>ʾadam</em>) drawn from the ground
          (<em>ʾadamah</em>), Babel that <em>babbles</em>, an Isaac who is <em>laughter</em>. Translate faithfully
          and the sense survives but the sound dies, and with it half of what the writer was doing. This lens
          does one thing — it sets the original words beside the text and gives the ones that play against each
          other a shared color, so the pun becomes something you can see and, sounding it out, hear. Sibling to{" "}
          <em>Topographia Sacra</em> (organized by <em>where</em>), <em>Annales Sacra</em> (by <em>when</em>),{" "}
          <em>Voces</em> (by <em>who</em> speaks), and <em>Catena</em> (by how the texts connect).
        </p>

        <h2
          style={{
            marginTop: 48,
            marginBottom: 16,
            fontFamily: serif,
            fontSize: 15,
            fontWeight: 600,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: MUTED,
          }}
        >
          The Editions
        </h2>

        <div style={{ display: "grid", gap: 16 }}>
          {EDITIONS.map((e) => (
            <Link
              key={e.slug}
              href={`/${e.slug}`}
              style={{
                display: "block",
                padding: "20px 24px",
                background: "#eee9df",
                border: "1px solid #d4c9b5",
                borderLeft: `4px solid ${ACCENT}`,
                borderRadius: 6,
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div style={{ fontFamily: serif, fontSize: 28, fontWeight: 600, letterSpacing: 3, color: INK }}>
                {e.name.toUpperCase()}
              </div>
              {e.subtitle && (
                <div style={{ fontFamily: serif, fontStyle: "italic", color: MUTED, fontSize: 15, marginTop: 4, letterSpacing: 1 }}>
                  {e.subtitle} · {e.language}
                </div>
              )}
              {e.blurb && (
                <div style={{ fontSize: 15, lineHeight: 1.55, color: "#4a3d30", marginTop: 10 }}>{e.blurb}</div>
              )}
            </Link>
          ))}
        </div>

        <p style={{ marginTop: 48, fontSize: 12, color: MUTED, textAlign: "center", letterSpacing: 1, fontFamily: serif }}>
          Scripture: World English Bible · Public Domain · Wroot Press
        </p>
      </main>
    </div>
  );
}
