import type { Edition } from "@/lib/types";

// Amos, read by sound — the pivot from Genesis. Where Genesis names the world by
// sound (etiology), Amos *condemns* it by sound: the pun is the verdict. The
// prophet hears a word, and its echo is the sentence — a basket of summer fruit
// (qayits) means the end (qets) has come. This edition gathers the book's major
// paronomasia; several are genuine cruxes (the plumb-line word, the plow-the-sea
// line), flagged where the sound-play is doing contested work.

const amos: Edition = {
  slug: "amos",
  name: "Amos",
  subtitle: "The pun as verdict",
  book: "Amos",
  language: "Hebrew",
  source: "World English Bible",
  blurb:
    "In Amos the wordplay is the judgment. A basket of summer fruit (qayits) means the end (qets); Gilgal will go galoh into exile; the house of God becomes a house of nothing. The prophet condemns Israel in the echo of its own words.",
  intro:
    "Genesis plays on sound to name the world; Amos plays on it to end one. The shepherd-prophet's oracles turn on paronomasia so tight that the verdict is folded into a single syllable: the LORD shows him a basket of summer fruit — qayits — and pronounces that the qets, the end, has come upon Israel. The sanctuaries fare no better: Gilgal (gilgal) will surely go into exile (galoh yigleh), and Bethel, the house of God, becomes ʾawen, a house of nothing. This is the hardest kind of Hebrew to translate, because the sense can be carried and the sound — which is the whole argument — cannot. This edition gathers the book's major sound-plays in order, stands the Hebrew beside each, and keys the words that ring against one another. Two of them are famous cruxes (the plumb-line vision, the plow-the-sea line); those are flagged, because there the sound is exactly what is disputed.",
  coverage: {
    complete: false,
    note: "The book's major sound-plays, gathered in canonical order — the roar, the overloaded cart, the doomed sanctuaries, the poisoned justice, and the two visions. Not every verse; every pun that carries weight.",
  },
  scenes: [
    {
      id: "s1",
      title: "I · The Lion Has Roared",
      note: "The book opens on a sound before it opens on an argument: the growl the prophet says no one can hear and stay silent.",
      plays: [
        {
          ref: "Amos 3:8",
          kind: "onomatopoeia",
          heading: "The roar and the fear",
          terms: [
            { translit: "ʾaryeh", original: "אַרְיֵה", gloss: "a lion", echo: 0 },
            { translit: "shaʾag", original: "שָׁאָג", gloss: "has roared", echo: 0, note: "the verb's own sound is the growl it names" },
          ],
          what: "“The lion has roared (ʾaryeh shaʾag); who will not fear? The Lord Yahweh has spoken; who can but prophesy?” The verb for the roar is guttural, drawn-out — it performs the sound it reports, and the prophet's compulsion to speak is set as its echo.",
          lost: "English “roared” is a tidy past tense. Hebrew shaʾag opens the throat — aleph and the long a — so the line growls before it argues. The terror of the sound, which is the point, is inaudible once smoothed into English.",
        },
      ],
    },
    {
      id: "s2",
      title: "II · Pressed Like a Cart",
      note: "The first threat is a sound-picture built by doubling one root, so the pressure is heard as well as described.",
      plays: [
        {
          ref: "Amos 2:13",
          kind: "root",
          heading: "I press as it presses",
          terms: [
            { translit: "meʿiq", original: "מֵעִיק", gloss: "am pressing down (of the LORD)", echo: 1 },
            { translit: "taʿiq", original: "תָּעִיק", gloss: "presses down (of the cart)", echo: 1 },
          ],
          what: "“Behold, I will press you down (meʿiq) in your place, as a cart presses (taʿiq) that is full of sheaves.” One rare root, turned twice — the LORD's weight on Israel spoken in the very word for the groaning wagon.",
          lost: "English needs two different images (“press… as a cart presses”) and the repetition sounds clumsy, so translators vary it. In Hebrew it is deliberately the same word twice — the divine crushing and the creaking cart made audibly identical.",
          contested: true,
          contestedNote:
            "The root ʿuq is nearly a hapax; some render it “totter/sway” rather than “press down,” so the image may be of a cart bogged and swaying under its load. Either way the force of the line is the doubled word.",
        },
      ],
    },
    {
      id: "s3",
      title: "III · Sanctuaries of Nothing",
      note: "Amos takes the names of Israel's proudest shrines and turns each into the doom that rhymes with it.",
      plays: [
        {
          ref: "Amos 5:5",
          kind: "pun",
          heading: "Gilgal into exile, Bethel into nothing",
          terms: [
            { translit: "Gilgal", original: "גִּלְגָּל", gloss: "Gilgal (the shrine)", echo: 2 },
            { translit: "galoh yigleh", original: "גָּלֹה יִגְלֶה", gloss: "will surely go into exile", echo: 2 },
            { translit: "Beth-el", original: "בֵּית אֵל", gloss: "Bethel — “house of God”", echo: 3 },
            { translit: "ʾawen", original: "אָוֶן", gloss: "nothingness, trouble, iniquity", echo: 3 },
          ],
          what: "“Gilgal shall surely go into exile (ha-gilgal galoh yigleh), and Bethel shall come to nothing (ʾawen).” The rolling g-l of the shrine's name rolls it out of the land; and the House of God (Beth-el) is unmade into a House of Nothing.",
          lost: "In English “Gilgal shall go into exile” is a flat prediction; the Hebrew is an alliterative sentence of doom — gilgal galoh yigleh — the place-name dissolving into its own fate. And “Bethel… nothing” loses that Bethel *means* House-of-God, so the mockery (the sound aven answering el) never lands.",
        },
      ],
    },
    {
      id: "s4",
      title: "IV · Justice into Poison",
      note: "At the book's ethical center, a line whose surface is a riddle and whose emended reading turns on cutting one word in two.",
      plays: [
        {
          ref: "Amos 6:12",
          kind: "pun",
          heading: "Do oxen plow the sea?",
          terms: [
            { translit: "babbeqarim", original: "בַּבְּקָרִים", gloss: "with oxen (the received text)", echo: 4 },
            { translit: "baqar · yam", original: "בָּקָר יָם", gloss: "an ox … the sea (re-divided)", echo: 4, note: "same consonants, cut between two words" },
          ],
          what: "“Do horses run on rocks? Does one plow there with oxen?” — the received babbeqarim, “with oxen,” makes a lame second question. The famous re-division reads the same letters as baqar yam, “does one plow the sea with an ox?” — the true absurdity that matches the horses on the crag. And the point: you have turned justice (mishpat) to poison (rosh) and righteousness to wormwood (laʿanah).",
          lost: "English must choose one reading and print it, hiding that the whole crux is a matter of *where you cut the sound*: one string of consonants is either “with oxen” or “an ox — the sea.” The pun lives in the unpointed text and dies in any single translation.",
          contested: true,
          contestedNote:
            "The re-division of בַּבְּקָרִים into בָּקָר יָם is a widely-adopted emendation (it restores the parallel with the horses), but it is not in the Masoretic Text, which reads “with oxen.” Verbum shows the received word; the crux is the sound underneath it.",
        },
      ],
    },
    {
      id: "s5",
      title: "V · The Two Visions",
      note: "The book climbs to a pair of vision-reports that each turn on a single word — the first a crux, the second the sharpest pun in the prophets.",
      plays: [
        {
          ref: "Amos 7:7-8",
          kind: "pun",
          heading: "The word on the wall",
          terms: [
            { translit: "ʾanak", original: "אֲנָךְ", gloss: "plumb line (traditional)", echo: 5 },
            { translit: "ʾanak", original: "אֲנָךְ", gloss: "tin / lead (some read)", echo: 5, note: "one word, meaning disputed — repeated four times" },
          ],
          what: "The LORD stands by a wall with ʾanak in his hand and asks, “Amos, what do you see?” — “ʾanak.” The word tolls four times in two verses, the vision hanging entirely on it, and then: “I will never again pass them by.”",
          lost: "English fixes it as “plumb line” and moves on. But ʾanak is nearly a hapax whose sense is genuinely uncertain — and the vision is built on hearing the same odd syllable repeated, a word whose very obscurity is part of the menace. That incantatory repetition of an untranslatable word cannot survive translation.",
          contested: true,
          contestedNote:
            "ʾanak is a hapax-like term; “plumb line” is traditional, but many now argue it means “tin” (a soft metal → a wall about to fall) or read a paronomastic threat. The lens shows the fourfold repetition the interpretation must reckon with.",
        },
        {
          ref: "Amos 8:1-2",
          kind: "homophone",
          heading: "Summer fruit, the end",
          terms: [
            { translit: "qayits", original: "קָיִץ", gloss: "summer fruit", echo: 6 },
            { translit: "qets", original: "קֵץ", gloss: "the end", echo: 6 },
          ],
          what: "The LORD shows a basket of summer fruit — “Amos, what do you see?” — “A basket of summer fruit (qayits).” “Then Yahweh said, ‘The end (qets) has come upon my people Israel; I will never again pass them by.’” The near-identical sound is the entire oracle: ripe fruit at the turn of the year, and a nation ripe for its end.",
          lost: "In English “summer fruit… the end” is a non-sequitur — you have to be *told* there's a pun. In Hebrew qayits and qets are all but the same word, so the verdict is heard the instant the fruit is named. This is the showcase: nothing survives translation except a footnote explaining the joke you can no longer hear.",
        },
      ],
    },
  ],
};

export default amos;
