// Verbum — the HOW-IT-SOUNDS lens. One organizing dimension: the sound of the
// original tongue. One visual channel: the Hebrew (or Greek) words set beside
// the English, with the words that play against each other keyed in matching
// ink, so a pun the translation flattens becomes something you can see and hear.
//
// The model is deliberately small and honest about its own limits. A Term is a
// single original word as it takes part in the play — its transliteration, the
// pointed original, and a plain gloss. A Play is one instance of wordplay at a
// citation: a set of Terms, a sentence on the collision the sound makes, and a
// sentence on precisely what the English cannot carry. Many biblical
// name-etymologies are the narrator's *literary* wordplay, not the philologist's
// derivation; where that distinction bites — or where scholars dispute the play
// is even there — the `contested` flag opens the note that says so. A Scene
// groups Plays under a movement of the book. An Edition is one book read this way.

// The kind of sound-play. This is the lens's controlled vocabulary; the reader
// shows it as a small badge so the eye learns to expect the move.
export type Kind =
  | "pun" // paronomasia — two unlike words made to collide because they sound alike
  | "name" // a name glossed by the sound of a word beside it (often folk-etymology)
  | "root" // figura etymologica — one root turned over in different forms
  | "alliteration" // repeated opening sounds
  | "assonance" // repeated vowel-music, internal rhyme
  | "onomatopoeia" // the sound performs the sense
  | "homophone"; // one sound holding two senses at once

// A single original-language word as it participates in a Play.
export type Term = {
  translit: string; // scholarly-light transliteration, e.g. "ʾadam"
  original?: string; // the pointed Hebrew/Greek, e.g. "אָדָם" — optional
  gloss: string; // what it means, plainly, e.g. "human being"
  echo?: number; // pairing key: Terms that share a value are set in one ink
  note?: string; // an aside on this word alone (a root, a rarer sense)
};

export type Play = {
  ref: string; // Fons-resolvable citation, e.g. "Genesis 2:23"
  kind: Kind;
  heading?: string; // a short editorial title, e.g. "The human and the humus"
  terms: Term[]; // the words in play — usually two or more
  what: string; // the play itself, in a sentence: the collision the sound makes
  lost: string; // what the English can't show you — the reason the lens exists
  contested?: boolean; // the play (or the etymology) is genuinely disputed
  contestedNote?: string; // the crux, in a sentence
};

export type Scene = {
  id: string;
  title: string; // movement heading, e.g. "In the Beginning"
  note?: string; // a sentence framing the movement
  plays: Play[];
};

export type Edition = {
  slug: string;
  name: string; // e.g. "Genesis"
  subtitle?: string; // e.g. "What the Hebrew is doing"
  book: string; // canonical book, for the Fons calls
  language: "Hebrew" | "Greek" | "Aramaic"; // the tongue whose sound is surfaced
  source: string; // translation note, e.g. "World English Bible"
  blurb?: string; // landing-card description
  intro: string; // the reader's-lens paragraph at the top of the edition
  // Whether the edition sets the whole book or a curated selection, made
  // explicit in the preface so the reader knows what they are holding.
  coverage: { complete: boolean; note: string };
  scenes: Scene[];
};

// The echo palette — a small high-contrast ink set shared with Voces. A Term's
// `echo` value indexes into it, so two words that sound alike wear one color and
// the pairing is visible at a glance. Terms with no `echo` render in muted ink.
export const ECHO_INKS = [
  "#b5302a", // red
  "#2f4b9a", // blue
  "#2e7d4f", // green
  "#b0790f", // gold
  "#7a3d9a", // violet
  "#0f8080", // teal
  "#b5306a", // magenta
  "#8a5320", // brown
] as const;

export function echoInk(echo: number | undefined, muted: string): string {
  if (echo === undefined) return muted;
  return ECHO_INKS[echo % ECHO_INKS.length];
}

// A human label for each kind, for the badge and legend.
export const KIND_LABEL: Record<Kind, string> = {
  pun: "pun",
  name: "name",
  root: "root-play",
  alliteration: "alliteration",
  assonance: "assonance",
  onomatopoeia: "sound-picture",
  homophone: "double sense",
};
