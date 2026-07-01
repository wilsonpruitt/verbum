#!/usr/bin/env python3.11
"""Verify every Verbum term's pointed Hebrew against the authoritative OSHB text.

Reads data/<slug>.ts (the edition), pulls each play's `ref` and its terms'
`original` forms, and matches them — by consonantal skeleton — against the words
of that verse (or verse range) in data/hebrew/<slug>.json. For each term it
prints whether the consonants are present in the verse and, when they are, the
authoritative pointed form as it actually stands in the Leningrad text, so the
edition's `original` can be corrected to match.

Usage:  python3.11 scripts/verify_terms.py genesis
"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CONSONANT = set(range(0x05D0, 0x05EB))
FINALS = {"ך": "כ", "ם": "מ", "ן": "נ", "ף": "פ", "ץ": "צ"}  # normalize final forms


def cons(s: str) -> str:
    return "".join(FINALS.get(c, c) for c in s if ord(c) in CONSONANT)


def expand_ref(ref: str) -> list[tuple[int, int]]:
    """'Genesis 2:25-3:1' -> [(2,25),(3,1)] boundaries; returns [start,end]."""
    m = re.match(r'\D+\s+(\d+):(\d+)(?:-(?:(\d+):)?(\d+))?$', ref.strip())
    if not m:
        return []
    c1, v1, c2, v2 = m.group(1), m.group(2), m.group(3), m.group(4)
    start = (int(c1), int(v1))
    if v2 is None:
        return [start]
    end = (int(c2) if c2 else int(c1), int(v2))
    return [start, end]


def verse_keys(bounds: list[tuple[int, int]], verses: dict) -> list[str]:
    if len(bounds) == 1:
        return [f"{bounds[0][0]}.{bounds[0][1]}"]
    (c1, v1), (c2, v2) = bounds
    keys = []
    for key in verses:
        c, v = map(int, key.split("."))
        if (c, v) >= (c1, v1) and (c, v) <= (c2, v2):
            keys.append(key)
    return sorted(keys, key=lambda k: tuple(map(int, k.split("."))))


def parse_edition(slug: str) -> list[tuple[str, list[tuple[str, str]]]]:
    """-> [(ref, [(translit, original), ...]), ...] in file order."""
    src = (ROOT / "data" / f"{slug}.ts").read_text(encoding="utf-8")
    # split into per-play chunks at each `ref:`
    chunks = re.split(r'\n\s*ref:\s*"', src)
    out = []
    for chunk in chunks[1:]:
        ref = chunk[: chunk.index('"')]
        translits = re.findall(r'translit:\s*"([^"]*)"', chunk)
        originals = re.findall(r'original:\s*"([^"]*)"', chunk)
        out.append((ref, list(zip(translits, originals))))
    return out


def main(slug: str) -> None:
    data = json.load(open(ROOT / "data" / "hebrew" / f"{slug}.json", encoding="utf-8"))
    verses = data["verses"]
    plays = parse_edition(slug)

    total = ok = miss = 0
    patch: list[tuple] = []   # exact surface forms whose pointing should be adopted
    review: list[tuple] = []  # dictionary roots / names to verify by hand
    for ref, terms in plays:
        keys = verse_keys(expand_ref(ref), verses)
        words = [w for k in keys for w in verses.get(k, [])]
        print(f"\n\033[1m{ref}\033[0m  ({', '.join(keys)})")
        for translit, original in terms:
            total += 1
            tc = cons(original)
            # Rank every candidate (whole word + each morpheme) across all words;
            # skip prefixes (<2 consonants); substring matches need >=3 shared.
            best = None  # (score, form, fullword, kind, closeness)
            for w in words:
                candidates = [(cons(w["t"]), w["t"], w["t"])]
                for p in w["parts"]:
                    candidates.append((cons(p), p, w["t"]))
                for wc, form, full in candidates:
                    if len(wc) < 2 or not tc:
                        continue
                    if tc == wc:
                        score, kind = 100 + len(wc), "exact"
                    elif min(len(tc), len(wc)) >= 3 and (tc in wc or wc in tc):
                        score, kind = 50 + min(len(tc), len(wc)), "root/inflected"
                    else:
                        continue
                    # tie-break among same-consonant homographs by vowel closeness
                    close = sum(1 for a, b in zip(original, form) if a == b) - abs(len(original) - len(form))
                    if best is None or (score, close) > (best[0], best[4]):
                        best = (score, form, full, kind, close)
            if best:
                ok += 1
                _, form, full, kind, _ = best
                if kind == "exact":
                    same = "✓ same" if form == original else f"→ \033[33m{form}\033[0m  ADOPT"
                    loc = form if form == full else f"{form} (in {full})"
                    print(f"  ✅ {translit:14} mine={original:12} {kind:14} auth={loc}  {same}")
                    if form != original:
                        patch.append((ref, translit, original, form))
                else:
                    print(f"  ◐  {translit:14} mine={original:12} {kind:14} root of \033[36m{form}\033[0m in verse — keep as authored dictionary root (verify spelling by hand)")
                    review.append((ref, translit))
            else:
                miss += 1
                print(f"  ⚠️  {translit:14} mine={original:12} — not a surface form here (name/root; keep as authored, verify by hand)")
                review.append((ref, translit))
    print(f"\n\033[1m{ok}/{total} matched ({len(patch)} pointing fixes to adopt), {len(review)} dictionary roots/names to verify, {miss} not found.\033[0m")

    if "--emit" in sys.argv and patch:
        emit = ROOT / "scripts" / f"{slug}.patch.json"
        emit.write_text(json.dumps(patch, ensure_ascii=False, indent=2), encoding="utf-8")
        print(f"Wrote {len(patch)} corrections -> {emit.relative_to(ROOT)}")


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "genesis")
