import { normalizeAnswer } from "@/lib/game/answer-validation";
import type { AIFeedback } from "@/types/game";

const MAX_FEEDBACK = 280;
const MAX_HINT = 140;
const MAX_ENCOURAGEMENT = 40;

function clip(s: string, max: number): string {
  const t = s.trim();
  return t.length > max ? `${t.slice(0, max - 1).trim()}…` : t;
}

/** Parse + validate raw model output. Returns null when unusable (caller falls back). */
export function parseAndValidateAI(
  raw: string,
  answer: string,
  acceptedAnswers: string[],
): AIFeedback | null {
  let parsed: unknown;
  try {
    const start = raw.indexOf("{");
    const end = raw.lastIndexOf("}");
    if (start === -1 || end === -1 || end <= start) return null;
    parsed = JSON.parse(raw.slice(start, end + 1));
  } catch {
    return null;
  }
  if (typeof parsed !== "object" || parsed === null) return null;
  const obj = parsed as Record<string, unknown>;
  if (
    typeof obj.feedback !== "string" ||
    typeof obj.hint !== "string" ||
    typeof obj.encouragement !== "string"
  ) {
    return null;
  }
  const feedback = clip(obj.feedback, MAX_FEEDBACK);
  const hint = clip(obj.hint, MAX_HINT);
  const encouragement = clip(obj.encouragement, MAX_ENCOURAGEMENT);
  if (!feedback || !hint) return null;

  // Answer-leak guard: the model must never expose the answer or aliases.
  const haystack = normalizeAnswer(`${feedback} ${hint} ${encouragement}`);
  const secrets = [answer, ...acceptedAnswers].map(normalizeAnswer).filter(Boolean);
  for (const secret of secrets) {
    if (!secret) continue;
    // Single-word secrets: match whole words. Multi-word: substring match.
    if (secret.includes(" ")) {
      if (secret.length >= 4 && haystack.includes(secret)) return null;
    } else if (secret.length >= 4) {
      const words = new Set(haystack.split(" "));
      if (words.has(secret)) return null;
    }
  }
  return { feedback, hint, encouragement, fallbackUsed: false };
}
