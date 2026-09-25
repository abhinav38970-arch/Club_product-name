import { GAME_CONFIG } from "./config";

/** Normalize a guess/answer: trim, lowercase, strip harmless punctuation, collapse spaces. */
export function normalizeAnswer(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s/-]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** Deterministic match against the riddle's curated accepted answers. */
export function isCorrectGuess(
  guess: string,
  acceptedAnswers: string[],
): boolean {
  const normalized = normalizeAnswer(guess);
  if (!normalized) return false;
  const set = new Set(acceptedAnswers.map(normalizeAnswer));
  return set.has(normalized);
}

/** Validate raw input before any evaluation or API call. */
export function validateGuessInput(guess: string): {
  ok: boolean;
  error?: string;
} {
  if (!guess || !guess.trim()) {
    return { ok: false, error: "Type something first." };
  }
  if (guess.trim().length > GAME_CONFIG.maxGuessLength) {
    return {
      ok: false,
      error: `Keep it under ${GAME_CONFIG.maxGuessLength} characters.`,
    };
  }
  return { ok: true };
}
