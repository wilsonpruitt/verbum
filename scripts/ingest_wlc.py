#!/usr/bin/env python3.11
"""Ingest OpenScriptures Hebrew Bible (morphhb) OSIS XML into Verbum's Hebrew
data layer — the authoritative pointed text that replaces hand-drafted forms.

Source: https://github.com/openscriptures/morphhb  (WLC, CC BY 4.0)

For each book file it writes data/hebrew/<slug>.json, keyed by "chapter.verse",
each verse a list of words with:
  t      full pointed word, cantillation (te'amim) stripped, morpheme "/" removed
  parts  the word's morphemes (prefixes + word), each pointed, te'amim stripped
  cons   consonantal skeleton (all points/marks stripped) — for robust matching
  lemma  raw OSHB lemma attribute, e.g. "d/8064"
  strong Strong's number of the head morpheme, e.g. "8064"
  morph  raw OSHB morphology code

Usage:  python3.11 scripts/ingest_wlc.py Gen:genesis:Genesis [Amos:amos:Amos ...]
        (arg = <osisCode>:<slug>:<DisplayName>)
"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "data" / "source"
OUT = ROOT / "data" / "hebrew"

# Unicode ranges. Keep base consonants and niqqud (vowel points); strip te'amim
# (cantillation accents U+0591–U+05AF), meteg, rafe, and verse punctuation.
NIQQUD = set(range(0x05B0, 0x05BD)) | {0x05C1, 0x05C2, 0x05C7}  # sheva..dagesh + sin/shin dots + qamats qatan
CONSONANT = set(range(0x05D0, 0x05EB))  # alef..taw incl. final forms


def strip_teamim(s: str) -> str:
    """Drop cantillation/meteg/rafe/punctuation; keep consonants + niqqud."""
    return "".join(c for c in s if ord(c) in CONSONANT or ord(c) in NIQQUD)


def consonants(s: str) -> str:
    return "".join(c for c in s if ord(c) in CONSONANT)


def strong_of(lemma: str) -> str:
    """Head Strong's number: last '/'-segment, digits only (drop homograph letter)."""
    head = lemma.split("/")[-1].strip()
    m = re.match(r"(\d+)", head)
    return m.group(1) if m else ""


W_RE = re.compile(r'<w\b([^>]*)>(.*?)</w>', re.DOTALL)
VERSE_RE = re.compile(r'<verse osisID="([^"]+)">(.*?)</verse>', re.DOTALL)
ATTR_RE = re.compile(r'(\w+)="([^"]*)"')


def ingest(osis_code: str, slug: str, name: str) -> None:
    xml = (SRC / f"wlc-{osis_code}.xml").read_text(encoding="utf-8")
    verses: dict[str, list[dict]] = {}
    for vm in VERSE_RE.finditer(xml):
        osis_id, body = vm.group(1), vm.group(2)
        # osisID = "Gen.1.1" -> key "1.1"
        parts = osis_id.split(".")
        key = f"{parts[1]}.{parts[2]}"
        words = []
        for wm in W_RE.finditer(body):
            attrs = dict(ATTR_RE.findall(wm.group(1)))
            raw = wm.group(2)
            morphemes = [strip_teamim(p) for p in raw.split("/")]
            lemma = attrs.get("lemma", "")
            words.append({
                "t": strip_teamim(raw.replace("/", "")),
                "parts": [m for m in morphemes if m],
                "cons": consonants(raw),
                "lemma": lemma,
                "strong": strong_of(lemma),
                "morph": attrs.get("morph", ""),
            })
        verses[key] = words

    out = {
        "book": name,
        "osis": osis_code,
        "source": "OpenScriptures Hebrew Bible (morphhb), Westminster Leningrad Codex, CC BY 4.0",
        "verses": verses,
    }
    OUT.mkdir(parents=True, exist_ok=True)
    dest = OUT / f"{slug}.json"
    dest.write_text(json.dumps(out, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    print(f"{name}: {len(verses)} verses, {sum(len(v) for v in verses.values())} words -> {dest.relative_to(ROOT)}")


if __name__ == "__main__":
    specs = sys.argv[1:] or ["Gen:genesis:Genesis"]
    for spec in specs:
        osis_code, slug, name = spec.split(":")
        ingest(osis_code, slug, name)
