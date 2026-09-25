import type { Riddle } from "@/types/game";

/**
 * Curated riddle bank — the single source of truth.
 * Rules for every entry:
 * - familiar school object, unambiguous answer
 * - 3 progressive clues (broad → specific → signature), each <= 20 words
 * - no answer word (or alias) inside any clue
 * - deterministic fallback feedback + hint so the game is playable with zero AI
 *
 * To add a riddle: append an object. No game logic changes needed.
 */
export const RIDDLES: Riddle[] = [
  {
    id: "notebook",
    answer: "notebook",
    acceptedAnswers: ["notebook", "note book", "spiral notebook", "school notebook", "composition notebook"],
    category: "classroom",
    difficulty: "easy",
    clues: [
      "You probably use me in more than one class.",
      "I can hold notes, drawings, ideas, and reminders.",
      "You can fill me up without ever plugging me in.",
    ],
    fallbackFeedback:
      "Good guess, but you're thinking about something you carry things in. This is something you write in.",
    fallbackHint: "Think about what sits open on your desk when class begins.",
  },
  {
    id: "backpack",
    answer: "backpack",
    acceptedAnswers: ["backpack", "back pack", "school bag", "bookbag", "book bag"],
    category: "school life",
    difficulty: "easy",
    clues: [
      "I follow you around school without having legs.",
      "I can carry many things at once.",
      "My most useful feature hides behind a zipper.",
    ],
    fallbackFeedback:
      "Nice try — your guess is something you use at school, but this one carries everything else around.",
    fallbackHint: "Think about what goes on your shoulders every morning.",
  },
  {
    id: "whiteboard",
    answer: "whiteboard",
    acceptedAnswers: ["whiteboard", "white board", "dry erase board", "dry-erase board"],
    category: "classroom",
    difficulty: "easy",
    clues: [
      "You look at me while the teacher talks.",
      "People cover me in writing, then wipe it away.",
      "I can fill up with ideas without keeping them forever.",
    ],
    fallbackFeedback:
      "Close — your guess lives in a classroom too, but this is the big surface the whole class stares at.",
    fallbackHint: "Think about what the teacher writes on at the front of the room.",
  },
  {
    id: "pencil",
    answer: "pencil",
    acceptedAnswers: ["pencil", "wooden pencil", "no 2 pencil", "number 2 pencil", "#2 pencil"],
    category: "supplies",
    difficulty: "easy",
    clues: [
      "I leave something behind every time you use me.",
      "I get shorter the more work I do.",
      "An eraser can undo some of my mistakes.",
    ],
    fallbackFeedback:
      "Good instinct — that's a school supply too, but this one literally shrinks as you work.",
    fallbackHint: "Think about what you sharpen when the tip goes dull.",
  },
  {
    id: "eraser",
    answer: "eraser",
    acceptedAnswers: ["eraser", "pencil eraser", "pink eraser"],
    category: "supplies",
    difficulty: "easy",
    clues: [
      "I only get called in when something goes wrong.",
      "I disappear a little every time I help you.",
      "My best work leaves pink dust behind.",
    ],
    fallbackFeedback:
      "You're in supply-box territory, but this one fixes mistakes instead of making them.",
    fallbackHint: "Think about what rubs pencil marks away.",
  },
  {
    id: "locker",
    answer: "locker",
    acceptedAnswers: ["locker", "school locker", "hallway locker"],
    category: "school life",
    difficulty: "easy",
    clues: [
      "I live in the hallway and never move.",
      "I guard your stuff with a combination.",
      "You visit me between classes, then slam me shut.",
    ],
    fallbackFeedback:
      "That's something you use at school, but this one is bolted to the hallway wall.",
    fallbackHint: "Think about the metal door you spin a combination on.",
  },
  {
    id: "calculator",
    answer: "calculator",
    acceptedAnswers: ["calculator", "calc", "scientific calculator", "graphing calculator"],
    category: "classroom",
    difficulty: "easy",
    clues: [
      "Math class won't let you survive without me.",
      "I answer in seconds what takes you minutes.",
      "My face is nothing but buttons and a tiny screen.",
    ],
    fallbackFeedback:
      "That's classroom-adjacent, but this one crunches numbers for you.",
    fallbackHint: "Think about what you grab when the math gets serious.",
  },
  {
    id: "water-bottle",
    answer: "water bottle",
    acceptedAnswers: ["water bottle", "waterbottle", "bottle", "reusable bottle"],
    category: "school life",
    difficulty: "easy",
    clues: [
      "I go almost everywhere you go.",
      "I keep you going through long school days.",
      "Refill me at the fountain and I'm good as new.",
    ],
    fallbackFeedback:
      "Good guess — that's a daily-carry item too, but this one keeps you hydrated.",
    fallbackHint: "Think about what you sip from between classes.",
  },
  {
    id: "stapler",
    answer: "stapler",
    acceptedAnswers: ["stapler", "staple machine"],
    category: "supplies",
    difficulty: "medium",
    clues: [
      "I live on the teacher's desk, waiting to strike.",
      "I bite through paper and leave metal behind.",
      "Press my head down and pages become one.",
    ],
    fallbackFeedback:
      "That's a desk item too, but this one punches pages together permanently.",
    fallbackHint: "Think about what clicks papers together with tiny metal teeth.",
  },
  {
    id: "clock",
    answer: "clock",
    acceptedAnswers: ["clock", "wall clock", "classroom clock", "school clock"],
    category: "classroom",
    difficulty: "easy",
    clues: [
      "Everyone checks me when class drags on.",
      "I never speak, but I decide when you're free.",
      "Two hands chase each other on my face all day.",
    ],
    fallbackFeedback:
      "That's in the room too, but this one controls when the bell matters.",
    fallbackHint: "Think about what hangs on the wall counting down to lunch.",
  },
  {
    id: "projector",
    answer: "projector",
    acceptedAnswers: ["projector", "classroom projector", "overhead projector"],
    category: "classroom",
    difficulty: "medium",
    clues: [
      "I hang above you and nobody looks at me directly.",
      "I throw giant glowing images across the room.",
      "Teachers dim the lights when I start working.",
    ],
    fallbackFeedback:
      "That's classroom tech too, but this one paints the lesson huge on the wall.",
    fallbackHint: "Think about what beams slides onto the big screen.",
  },
  {
    id: "lunch-tray",
    answer: "lunch tray",
    acceptedAnswers: ["lunch tray", "lunch Tray", "cafeteria tray", "food tray", "tray"],
    category: "cafeteria",
    difficulty: "medium",
    clues: [
      "You only meet me in the middle of the day.",
      "I carry your whole meal with divided sections.",
      "Slide me down the line and lunch begins.",
    ],
    fallbackFeedback:
      "That's food-adjacent, but this is what your whole lunch rides on.",
    fallbackHint: "Think about what you slide through the cafeteria line.",
  },
];

export const RIDDLE_MAP = new Map(RIDDLES.map((r) => [r.id, r]));
