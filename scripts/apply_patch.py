#!/usr/bin/env python3.11
"""Apply an approved verify_terms patch to an edition's `original` fields.

Reads scripts/<slug>.patch.json — a list of [ref, translit, mine, auth] — and
replaces each `original: "<mine>"` with `original: "<auth>"` in data/<slug>.ts.
Byte-exact (the `mine` strings were extracted from the file), so it only touches
the pointed Hebrew, never translit/gloss/prose. Idempotent: re-running is a no-op
once forms already match. Names/roots the reviewer chose to keep are simply not
in the patch file.

Usage:  python3.11 scripts/apply_patch.py genesis
"""
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def main(slug: str, skip: set[str]) -> None:
    patch = json.load(open(ROOT / "scripts" / f"{slug}.patch.json", encoding="utf-8"))
    path = ROOT / "data" / f"{slug}.ts"
    src = path.read_text(encoding="utf-8")
    applied = 0
    for _ref, translit, mine, auth in patch:
        if translit in skip:
            print(f"  (skip {translit} — reviewer keep)")
            continue
        old = f'original: "{mine}"'
        new = f'original: "{auth}"'
        if old in src and mine != auth:
            src = src.replace(old, new, 1)
            applied += 1
            print(f"  {translit}: {mine} -> {auth}")
    path.write_text(src, encoding="utf-8")
    print(f"Applied {applied} pointing corrections to {path.relative_to(ROOT)}")


if __name__ == "__main__":
    # Usage: apply_patch.py <slug> [--skip <translit>]...
    args = sys.argv[1:]
    slug = next((a for a in args if not a.startswith("--")), "genesis")
    skip = {args[i + 1] for i, a in enumerate(args) if a == "--skip" and i + 1 < len(args)}
    main(slug, skip)
