import { NextResponse } from "next/server";
import { RIDDLE_MAP } from "@/data/riddles";
import { isCorrectGuess, normalizeAnswer } from "@/lib/game/answer-validation";
import { GAME_CONFIG } from "@/lib/game/config";
import { fallbackFor, generateFeedback } from "@/lib/ai/client";
import { clientIp, isRateLimited } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface Body {
  riddleId?: unknown;
  guess?: unknown;
  requestId?: unknown;
}

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "invalid_input" }, { status: 400 });
  }

  const riddleId = typeof body.riddleId === "string" ? body.riddleId : "";
  const rawGuess = typeof body.guess === "string" ? body.guess : "";

  if (!riddleId || !rawGuess.trim() || rawGuess.length > GAME_CONFIG.maxGuessLength) {
    return NextResponse.json({ error: "invalid_input" }, { status: 400 });
  }

  const riddle = RIDDLE_MAP.get(riddleId);
  if (!riddle) {
    return NextResponse.json({ error: "unknown_riddle" }, { status: 404 });
  }

  const guess = rawGuess.trim().slice(0, GAME_CONFIG.maxGuessLength);

  // Authoritative correctness check — never trust the client.
  if (isCorrectGuess(guess, riddle.acceptedAnswers)) {
    return NextResponse.json(
      {
        correct: true,
        feedback: "That's right.",
        hint: "",
        encouragement: "Nice!",
        fallbackUsed: false,
      },
      { status: 200 },
    );
  }

  if (isRateLimited(clientIp(req.headers), GAME_CONFIG.feedbackRateLimitPerMinute)) {
    const fb = fallbackFor(riddle);
    return NextResponse.json({ correct: false, ...fb }, { status: 200 });
  }

  try {
    const ai = await generateFeedback(riddle, normalizeAnswer(guess) || guess.trim());
    return NextResponse.json({ correct: false, ...ai }, { status: 200 });
  } catch {
    // Seamless fallback — the player never sees a technical error.
    const fb = fallbackFor(riddle);
    return NextResponse.json({ correct: false, ...fb }, { status: 200 });
  }
}
