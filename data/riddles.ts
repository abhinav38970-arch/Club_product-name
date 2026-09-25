import type { Riddle } from "@/types/game";

/**
 * Curated riddle bank — the single source of truth.
 *
 * Difficulty policy (candy economics): first-guess wins should be uncommon.
 * - Clue 1 is broad/atmospheric and fits 3+ objects (rarely solvable alone).
 * - Clue 2 narrows the field by context/use (eliminates distractors).
 * - Clue 3 gives a fair signature trait without naming the object.
 * - No answer word (or obvious keyword) appears in any clue.
 * - Fallback hints steer toward category/use, never the exact object.
 *
 * Distribution across 18 riddles: ~3 medium / ~11 medium-hard / ~4 hard.
 * To add a riddle: append an object. No game logic changes needed.
 */
export const RIDDLES: Riddle[] = [
  {
    id: "notebook",
    answer: "notebook",
    acceptedAnswers: ["notebook", "note book", "spiral notebook", "school notebook", "composition notebook"],
    category: "classroom",
    difficulty: "medium",
    clues: [
      "I collect versions of you from every subject, but I never judge them.",
      "What I keep depends entirely on which room you're sitting in.",
      "People flip through my past to prepare for their future.",
    ],
    fallbackFeedback:
      "That makes sense — both live in your bag. But your guess is mostly for moving things around, while this is for keeping what you learn.",
    fallbackHint: "Think about what stays open on your desk once your bag is on the floor.",
  },
  {
    id: "backpack",
    answer: "backpack",
    acceptedAnswers: ["backpack", "back pack", "school bag", "bookbag", "book bag"],
    category: "school life",
    difficulty: "medium",
    clues: [
      "I go everywhere with you without ever deciding to move.",
      "What I hold in the morning is completely different by afternoon.",
      "Most of me stays hidden until something unzips.",
    ],
    fallbackFeedback:
      "Reasonable — that's a daily school item too. But yours sits still once class starts, while this one travels between every room with you.",
    fallbackHint: "Think about what you drop beside your chair before you sit down.",
  },
  {
    id: "binder",
    answer: "binder",
    acceptedAnswers: ["binder", "ring binder", "3 ring binder", "three ring binder", "school binder"],
    category: "supplies",
    difficulty: "medium",
    clues: [
      "I keep different subjects from mixing into each other.",
      "Metal teeth inside me snap open and shut on command.",
      "Dividers and punched holes are my organizing system.",
    ],
    fallbackFeedback:
      "You're in the right aisle — paper storage. But your guess holds things loosely, while this one locks pages onto metal.",
    fallbackHint: "Think about what clicks open to trap punched pages inside.",
  },
  {
    id: "whiteboard",
    answer: "whiteboard",
    acceptedAnswers: ["whiteboard", "white board", "dry erase board", "dry-erase board"],
    category: "classroom",
    difficulty: "medium",
    clues: [
      "The whole room faces me, but nobody sits near me.",
      "Everything I display is temporary by design.",
      "Colored strokes cover me, then vanish without a trace.",
    ],
    fallbackFeedback:
      "Close — yours hangs in the classroom too. But your guess is small and personal, while this is the giant shared surface everyone stares at.",
    fallbackHint: "Think about the big glossy wall the teacher uncaps pens for.",
  },
  {
    id: "whiteboard-eraser",
    answer: "whiteboard eraser",
    acceptedAnswers: ["whiteboard eraser", "board eraser", "dry erase eraser", "dry-erase eraser", "white board eraser"],
    category: "classroom",
    difficulty: "hard",
    clues: [
      "I can undo an entire lesson in seconds.",
      "I glide across surfaces where writing used to be.",
      "Soft felt on my face wipes color away clean.",
    ],
    fallbackFeedback:
      "Good instinct — fixing mistakes is right. But yours works on paper at a desk, while this one glides across the big front wall.",
    fallbackHint: "Think about what slides across the glossy board to clear it.",
  },
  {
    id: "pencil",
    answer: "pencil",
    acceptedAnswers: ["pencil", "wooden pencil", "no 2 pencil", "number 2 pencil", "#2 pencil", "lead pencil"],
    category: "supplies",
    difficulty: "medium",
    clues: [
      "Something about me disappears a little every time I'm useful.",
      "I'm at my longest the first day you meet me.",
      "Wood surrounds what does the work; curls mean I'm getting sharper.",
    ],
    fallbackFeedback:
      "Same toolbox, different job. Yours removes or stores, while this one leaves gray trails everywhere it goes.",
    fallbackHint: "Think about what gets shorter each time you twist it in a sharpener.",
  },
  {
    id: "eraser",
    answer: "eraser",
    acceptedAnswers: ["eraser", "pencil eraser", "pink eraser", "cap eraser"],
    category: "supplies",
    difficulty: "medium",
    clues: [
      "I only matter after a mistake has already happened.",
      "Helping you always costs me a piece of myself.",
      "My success looks like small colored crumbs on your desk.",
    ],
    fallbackFeedback:
      "You're holding the right toolbox. But your guess creates marks, while this one exists only to remove them.",
    fallbackHint: "Think about what makes gray marks vanish without tearing the page.",
  },
  {
    id: "pencil-sharpener",
    answer: "pencil sharpener",
    acceptedAnswers: ["pencil sharpener", "sharpener", "hand sharpener", "wall sharpener"],
    category: "supplies",
    difficulty: "hard",
    clues: [
      "I eat without ever getting full.",
      "What comes out of me is more pointed than what went in.",
      "Twist and grind, and wooden curls fall away.",
    ],
    fallbackFeedback:
      "Same desk neighborhood, opposite role. Yours writes or binds, while this one chews wood to restore a point.",
    fallbackHint: "Think about what you crank a dull tip inside of.",
  },
  {
    id: "stapler",
    answer: "stapler",
    acceptedAnswers: ["stapler", "staple machine"],
    category: "supplies",
    difficulty: "hard",
    clues: [
      "I wait silently wherever paperwork piles up.",
      "My bite is tiny, metallic, and permanent.",
      "Press down on my back and loose pages become one.",
    ],
    fallbackFeedback:
      "That's a desk tool too, but yours marks or cuts. This one punches pages together so they never separate.",
    fallbackHint: "Think about what slams tiny metal teeth through a stack.",
  },
  {
    id: "locker",
    answer: "locker",
    acceptedAnswers: ["locker", "school locker", "hallway locker"],
    category: "school life",
    difficulty: "medium",
    clues: [
      "I have a fixed address but I never leave the building.",
      "You visit me in the gaps between where you need to be.",
      "Three numbers in the right order are the only key I accept.",
    ],
    fallbackFeedback:
      "That's something you use between classes too. But yours moves with you, while this one is bolted down and guarded by a dial.",
    fallbackHint: "Think about the tall metal door you spin open in minutes between bells.",
  },
  {
    id: "hall-pass",
    answer: "hall pass",
    acceptedAnswers: ["hall pass", "hallpass", "bathroom pass", "halls pass"],
    category: "school life",
    difficulty: "medium",
    clues: [
      "I'm small, but without me you get stopped.",
      "Teachers hand me out like permission you can hold.",
      "Wood, plastic, or signed paper — I prove you belong outside class.",
    ],
    fallbackFeedback:
      "That's hallway-adjacent, but yours is a place or a container. This is the small object that lets you leave the room at all.",
    fallbackHint: "Think about what a teacher hands you so you can walk the halls mid-period.",
  },
  {
    id: "school-id",
    answer: "school id",
    acceptedAnswers: ["school id", "student id", "id card", "student card", "school id card", "id badge", "student id card"],
    category: "school life",
    difficulty: "medium",
    clues: [
      "I prove you're supposed to be here.",
      "My photo of you is always worse than you look.",
      "Scan me, flash me, or let me dangle from your neck.",
    ],
    fallbackFeedback:
      "That's carried daily too, but yours holds supplies or work. This one holds proof of who you are.",
    fallbackHint: "Think about the card with your bad photo that opens doors and lines.",
  },
  {
    id: "calculator",
    answer: "calculator",
    acceptedAnswers: ["calculator", "calc", "scientific calculator", "graphing calculator"],
    category: "classroom",
    difficulty: "medium",
    clues: [
      "I know answers you haven't learned yet, but I can't explain any of them.",
      "Teachers decide when I'm help and when I'm cheating.",
      "My entire face is buttons, and I only speak in digits.",
    ],
    fallbackFeedback:
      "That's classroom tech too, but yours shows lessons while this one only crunches what you type in.",
    fallbackHint: "Think about what you reach for when numbers get too big for your head.",
  },
  {
    id: "projector",
    answer: "projector",
    acceptedAnswers: ["projector", "classroom projector", "overhead projector"],
    category: "classroom",
    difficulty: "hard",
    clues: [
      "I watch the class from above while nobody watches me.",
      "My work only matters once the room goes darker.",
      "Lessons leave me as light and land huge on the wall.",
    ],
    fallbackFeedback:
      "That's a screen too, but yours sits on a desk and faces one person. This one hangs high and paints for the whole room.",
    fallbackHint: "Think about what hums near the ceiling and throws the lesson giant-sized.",
  },
  {
    id: "clock",
    answer: "clock",
    acceptedAnswers: ["clock", "wall clock", "classroom clock", "school clock"],
    category: "classroom",
    difficulty: "medium",
    clues: [
      "Everyone consults me, but nobody thanks me.",
      "I control freedom without ever moving from my spot.",
      "Two arms chase each other in circles while you watch.",
    ],
    fallbackFeedback:
      "That's on the wall too, but yours shows work while this one only shows how much class is left.",
    fallbackHint: "Think about the round face above the door counting down to the bell.",
  },
  {
    id: "water-bottle",
    answer: "water bottle",
    acceptedAnswers: ["water bottle", "waterbottle", "bottle", "reusable bottle"],
    category: "school life",
    difficulty: "medium",
    clues: [
      "I'm refilled far more often than I'm replaced.",
      "I survive drops, dents, and being left behind daily.",
      "Fountains are my fuel stations.",
    ],
    fallbackFeedback:
      "Also a daily-carry item — good. But yours holds work or food, while this one only keeps you going sip by sip.",
    fallbackHint: "Think about what rolls under desks and gets refilled between periods.",
  },
  {
    id: "lunch-tray",
    answer: "lunch tray",
    acceptedAnswers: ["lunch tray", "cafeteria tray", "food tray", "tray"],
    category: "cafeteria",
    difficulty: "medium",
    clues: [
      "You and I only cross paths near midday.",
      "I'm divided inside so nothing I carry has to mix.",
      "I glide on rails while food lands on me section by section.",
    ],
    fallbackFeedback:
      "Food-area thinking is right, but yours is the meal or the table. This is what the whole meal rides on.",
    fallbackHint: "Think about what slides along the rails in the serving line.",
  },
  {
    id: "library-book",
    answer: "library book",
    acceptedAnswers: ["library book", "librarybook", "borrowed book", "school library book"],
    category: "library",
    difficulty: "medium",
    clues: [
      "I've lived more lives than anyone carrying me.",
      "Stamps and stickers track everywhere I've been.",
      "A printed date decides when I must go home.",
    ],
    fallbackFeedback:
      "Paper is right, but yours is for writing your own work. This one already contains someone else's story and must go back.",
    fallbackHint: "Think about what you borrow, never own, and return past a scanner.",
  },
];

export const RIDDLE_MAP = new Map(RIDDLES.map((r) => [r.id, r]));
