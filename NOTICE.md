# Attributions

## Hebrew text — Open Scriptures Hebrew Bible (morphhb)

The pointed Hebrew in Verbum (the `original` forms in each edition, and the
`data/hebrew/*.json` layer) is derived from the **Open Scriptures Hebrew Bible**,
a transcription of the Westminster Leningrad Codex with morphological tagging.

- Source: https://github.com/openscriptures/morphhb
- License: **Creative Commons Attribution 4.0 International (CC BY 4.0)** —
  https://creativecommons.org/licenses/by/4.0/

Verbum ingests the OSIS XML (`data/source/wlc-*.xml`) via `scripts/ingest_wlc.py`
into per-book JSON, strips cantillation (te'amim) while keeping the vowel points
(niqqud), and uses it both to display the words in play and to verify each
edition's hand-authored forms against the codex (`scripts/verify_terms.py`).

Changes made under CC BY: cantillation marks removed for legibility; words split
into morphemes; a consonantal skeleton added for matching. No claim of endorsement
by OpenScriptures is implied.

## English text — World English Bible

Scripture quotations in English are from the **World English Bible**, which is in
the **Public Domain**, served via Fons (`fons.wrootpress.com`).
