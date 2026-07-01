import type { Edition } from "@/lib/types";

// Genesis, read by sound — the book the whole lens was built for. No book in
// Scripture plays harder on the ear: it is a book of names, and nearly every
// name is bent to chime with a word beside it. Crucially, these are the
// narrator's *literary* plays, not a lexicographer's derivations — "Babel" does
// not really come from the verb "to confuse," "Noah" not really from "comfort."
// The writer hears the resemblance and makes it mean something, which is exactly
// what the English cannot do. Where the gap between the play and the real
// etymology is the whole point (Noah), it is flagged.

const genesis: Edition = {
  slug: "genesis",
  name: "Genesis",
  subtitle: "What the Hebrew is doing",
  book: "Genesis",
  language: "Hebrew",
  source: "World English Bible",
  blurb:
    "The book of beginnings is a book of puns. The human from the humus, the woman from the man, Babel that babbles, an Isaac who is laughter — Genesis names the world by the way its words sound against each other. This edition sets the Hebrew beside the text and keys the echo.",
  intro:
    "Genesis thinks by sound. Again and again it names a person or a place by chiming the name against a word standing next to it — the human (ʾadam) is pulled from the ground (ʾadamah); the city is called Babel because there the LORD confused (balal) the tongues. These are not the derivations a Hebrew dictionary would give; they are the narrator's play, hearing a resemblance and making it carry the meaning of the story. Translate the sense faithfully and every one of these chimes falls silent, because the words that rhyme in Hebrew do not rhyme in English. This edition stands the Hebrew words beside the verse and gives the ones that play against each other a shared color, so you can see — and, sounding them out, hear — what the writer heard. The transliterations are light, for the ear, not the seminar; and where the play openly overrides the real etymology, the crux is flagged.",
  coverage: {
    complete: false,
    note: "A guided selection — the best-known and most consequential plays, from the naming of the human to the scattering at Babel and the naming of the patriarchs. Genesis holds many more.",
  },
  scenes: [
    {
      id: "s1",
      title: "I · The Naming of Things",
      note: "The first plays are also the deepest: the words for human, ground, man, and woman are made to sound like one another, so that kinship is heard before it is argued.",
      plays: [
        {
          ref: "Genesis 1:2",
          kind: "assonance",
          heading: "Formless and void",
          terms: [
            { translit: "tohu", original: "תֹהוּ", gloss: "formlessness, waste", echo: 0 },
            { translit: "wabohu", original: "וָבֹהוּ", gloss: "and emptiness, void", echo: 0 },
          ],
          what: "The earth's first state is named in a jingling rhyme — tohu wabohu — two words locked together by their sound, the second almost a nonsense-echo of the first.",
          lost: "“Formless and void” is accurate and utterly flat. The Hebrew is a near-rhyme you can hear, a chaos that even sounds unformed; English gives you two unrelated adjectives.",
        },
        {
          ref: "Genesis 2:7",
          kind: "name",
          heading: "The human and the humus",
          terms: [
            { translit: "ʾadam", original: "אָדָם", gloss: "human, humankind", echo: 1 },
            { translit: "ʾadamah", original: "אֲדָמָה", gloss: "ground, arable soil", echo: 1 },
          ],
          what: "The LORD forms the ʾadam from the dust of the ʾadamah. The creature is named for the stuff it is made of: the ground-ling from the ground.",
          lost: "“Man… from the ground” hides that they are the same word. Tyndale reached for “earthling of the earth”; the classic English try is “the human from the humus.” The point — that we are, by name, dirt-creatures — is audible only in Hebrew.",
        },
        {
          ref: "Genesis 2:23",
          kind: "name",
          heading: "Woman out of man",
          terms: [
            { translit: "ʾish", original: "אִישׁ", gloss: "man", echo: 2 },
            { translit: "ʾishshah", original: "אִשָּׁה", gloss: "woman", echo: 2 },
          ],
          what: "“She shall be called Woman, because she was taken out of Man.” The naming works only because ʾishshah sounds like a feminine form of ʾish — his own word, given back to him with a new ending.",
          lost: "In English “woman/man” happens to preserve a faint echo (wo-man), which is why the verse still half-works for us — a lucky accident of a different language. The Hebrew makes the derivation exact and deliberate; the two are audibly one flesh.",
          contested: true,
          contestedNote:
            "Philologically ʾishshah probably does not derive from ʾish at all (their roots differ). The narrator treats them as one word for the sake of the naming — a folk-etymology doing theological work, not a claim about Hebrew grammar.",
        },
        {
          ref: "Genesis 2:25-3:1",
          kind: "pun",
          heading: "Naked and shrewd",
          terms: [
            { translit: "ʿarummim", original: "עֲרוּמִּים", gloss: "naked (of the couple)", echo: 3 },
            { translit: "ʿarum", original: "עָרוּם", gloss: "shrewd, crafty (of the serpent)", echo: 3 },
          ],
          what: "The last word of chapter 2 is that the couple were naked (ʿarummim); the first word about the serpent is that it was crafty (ʿarum). The pun hinges the two scenes together on a single sound.",
          lost: "English breaks the seam completely: “naked” and “crafty/subtle” share nothing. In Hebrew the innocence of the one and the cunning of the other are the same syllables — the reader is meant to feel the trap in the very echo.",
        },
      ],
    },
    {
      id: "s2",
      title: "II · Names That Chime with the Story",
      note: "From here the pattern is fixed: a name is given, and the text tells you what it means by putting a word beside it that sounds the same.",
      plays: [
        {
          ref: "Genesis 3:20",
          kind: "name",
          heading: "Eve, the living",
          terms: [
            { translit: "Chawwah", original: "חַוָּה", gloss: "Eve", echo: 4 },
            { translit: "chay", original: "חָי", gloss: "living, alive", echo: 4 },
          ],
          what: "“The man called his wife's name Eve (Chawwah), because she was the mother of all living (chay).” The name is bent toward the word for life.",
          lost: "“Eve… all living” reads as a bare assertion in English. In Hebrew the name and the reason chime, so the sentence explains itself by sound: she is Life because she is called Life-like.",
        },
        {
          ref: "Genesis 4:1",
          kind: "name",
          heading: "Cain, the gotten one",
          terms: [
            { translit: "Qayin", original: "קַיִן", gloss: "Cain", echo: 5 },
            { translit: "qaniti", original: "קָנִיתִי", gloss: "I have gotten / produced", echo: 5, note: "from the root qanah, to acquire or create" },
          ],
          what: "Eve names him with a pun on her own cry: “I have gotten (qaniti) a man.” Cain (Qayin) is the Gotten One.",
          lost: "English keeps the exclamation but severs it from the name. The Hebrew makes the birth-cry and the name a single sound — the mother's word becomes the child.",
        },
        {
          ref: "Genesis 5:29",
          kind: "name",
          heading: "Noah, rest or comfort?",
          terms: [
            { translit: "Noach", original: "נֹחַ", gloss: "Noah", echo: 6, note: "the name is built on nuach, to rest" },
            { translit: "yenachamenu", original: "יְנַחֲמֵנוּ", gloss: "he will comfort us", echo: 7, note: "from nacham, to comfort — a different root" },
          ],
          what: "“He named him Noah, saying, ‘This one will comfort us.’” The name Noah is from the root for rest (nuach), but the explanation reaches for comfort (nacham) — close in sound, not in root.",
          lost: "The English gives a smooth “Noah… will comfort,” hiding a deliberate near-miss: the narrator lets the sound of rest slide into the sound of comfort. The play is in the gap, and the gap is inaudible in translation.",
          contested: true,
          contestedNote:
            "Noach and nacham are different roots; the verse chimes them anyway. Some read it as loose folk-etymology, others as an intentional double gesture (rest + relief from the ground's curse). Either way it is a sound-play, not a derivation.",
        },
        {
          ref: "Genesis 11:9",
          kind: "pun",
          heading: "Babel that babbles",
          terms: [
            { translit: "Babel", original: "בָּבֶל", gloss: "Babel / Babylon", echo: 8 },
            { translit: "balal", original: "בָּלַל", gloss: "he confused, mixed up", echo: 8 },
          ],
          what: "“Therefore its name was called Babel, because there the LORD confused (balal) the language of all the earth.” Babylon, whose own name meant ‘gate of the god,’ is renamed by mockery: the city of confusion.",
          lost: "“Babel… confused” is opaque in English — the two words don't touch. In Hebrew the grand name collapses into the verb for babble, so the proudest city on earth is, by its very sound, gibberish. The King James reader never hears the joke.",
        },
      ],
    },
    {
      id: "s3",
      title: "III · The Patriarchs, Named by a Pun",
      note: "The founding names of Israel are all built this way — laughter, red, the heel — so that the family's story is folded into the sound of its own names.",
      plays: [
        {
          ref: "Genesis 21:6",
          kind: "name",
          heading: "Isaac, laughter",
          terms: [
            { translit: "Yitzchaq", original: "יִצְחָק", gloss: "Isaac — the name", echo: 9, note: "given at his birth, 21:3" },
            { translit: "tsechoq", original: "צְחֹק", gloss: "laughter", echo: 9 },
            { translit: "yitzchaq", original: "יִצְחַק", gloss: "he will laugh", echo: 9 },
          ],
          what: "“God has made me laughter (tsechoq),” says Sarah; “everyone who hears will laugh (yitzchaq) with me” — and the child's name, Yitzchaq, simply is that verb, He-Laughs. The whole cycle rings the change: Abraham laughs (17:17), Sarah laughs (18:12), and now the promised son is Laughter itself.",
          lost: "English can say Sarah laughed, but “Isaac” stays an inert proper noun. In Hebrew the boy's name simply is the verb, so every mention of him repeats the old couple's disbelief-turned-joy.",
        },
        {
          ref: "Genesis 25:30",
          kind: "name",
          heading: "Edom, the red",
          terms: [
            { translit: "ʾadom", original: "אָדֹם", gloss: "red", echo: 10 },
            { translit: "Edom", original: "אֱדוֹם", gloss: "Edom (Esau's other name)", echo: 10 },
          ],
          what: "Famished, Esau begs for “that red stuff, that red stuff” (ha-ʾadom ha-ʾadom) — the red lentil stew — “therefore his name was called Edom.” A nation is named for a moment of greed and the color of soup.",
          lost: "English must gloss “red… Edom” and hope you connect them. The Hebrew doubles the word for red right before the name, so the birth of Israel's rival people literally sounds like a grab at the red pot.",
        },
        {
          ref: "Genesis 27:36",
          kind: "pun",
          heading: "Jacob, heel and cheat",
          terms: [
            { translit: "Yaʿaqob", original: "יַעֲקֹב", gloss: "Jacob", echo: 11 },
            { translit: "ʿaqeb", original: "עָקֵב", gloss: "heel", echo: 11, note: "at birth he grips Esau's heel (25:26)" },
            { translit: "ʿaqab", original: "עָקַב", gloss: "to supplant, to cheat", echo: 11 },
          ],
          what: "Esau's bitter pun: “Is he not rightly named Jacob (Yaʿaqob)? For he has supplanted me (ʿaqab) these two times.” The name that began as heel-grabber (ʿaqeb) at birth is now heard as swindler.",
          lost: "In English the accusation is just an accusation. In Hebrew Esau throws Jacob's own name back at him as a verb — Heel-boy has heeled me — so the character's whole nature is coiled inside the three letters of his name.",
        },
        {
          ref: "Genesis 10:25",
          kind: "name",
          heading: "Peleg, division",
          terms: [
            { translit: "Peleg", original: "פֶּלֶג", gloss: "Peleg", echo: 12 },
            { translit: "niplegah", original: "נִפְלְגָה", gloss: "was divided", echo: 12 },
          ],
          what: "“The name of the one was Peleg, for in his days the earth was divided (niplegah).” A genealogical footnote turns on a chime, quietly pointing ahead to the scattering at Babel.",
          lost: "“Peleg… divided” means nothing to an English ear. In Hebrew the name is the event, so a single line in a begat-list carries the whole coming fracture of the nations.",
        },
      ],
    },
    {
      id: "s4",
      title: "IV · The Sound of the Thing",
      note: "Not every play is a name. Sometimes the Hebrew simply makes the words perform the action they describe.",
      plays: [
        {
          ref: "Genesis 11:3",
          kind: "alliteration",
          heading: "Let us brick bricks",
          terms: [
            { translit: "nilbenah", original: "נִלְבְּנָה", gloss: "let us make bricks", echo: 0 },
            { translit: "lebenim", original: "לְבֵנִים", gloss: "bricks", echo: 0 },
            { translit: "chemar", original: "חֵמָר", gloss: "bitumen, tar", echo: 1 },
            { translit: "chomer", original: "חֹמֶר", gloss: "mortar", echo: 1 },
          ],
          what: "The builders of Babel speak in tongue-twisters: “let us brick bricks” (nilbenah lebenim) and, for their materials, chemar for chomer — tar for mortar, two words a breath apart. The prose itself starts to babble before the judgment falls.",
          lost: "English tidies it into “let us make bricks… they had tar for mortar.” The Hebrew is thick with repetition and near-rhyme, so the builders' proud industry already sounds like the confusion it is about to become.",
        },
      ],
    },
  ],
};

export default genesis;
