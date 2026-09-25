export const GAME_CONFIG = {
  /** Total clues per round. Fixed by design. */
  cluesPerRound: 3,
  /** Guesses per round. Fixed by design. */
  maxAttempts: 2,
  /** Round timer. Architecturally supported but OFF for v1 (fast > stressful). */
  timerEnabled: process.env.NEXT_PUBLIC_TIMER_ENABLED === "true",
  roundDurationSeconds: 20,
  /** Input + API guards */
  maxGuessLength: 40,
  aiTimeoutMs: 8000,
  /** Avoid repeating these many recent riddles */
  recentAvoidCount: 3,
  /** Rate limit: max AI feedback calls per IP per minute */
  feedbackRateLimitPerMinute: 20,
} as const;

export const CLUB_NAME =
  process.env.NEXT_PUBLIC_CLUB_NAME || "Husky Hackathon Society";
