"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { RIDDLES } from "@/data/riddles";
import {
  isCorrectGuess,
  validateGuessInput,
} from "@/lib/game/answer-validation";
import { pickRiddle, pushRecentId } from "@/lib/game/riddle-selection";
import type { AIFeedback, GamePhase, Riddle } from "@/types/game";

const RECENT_KEY = "outsmart-ai-recent-v1";
const STREAK_KEY = "outsmart-ai-streak-v1";

function loadRecent(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    const arr = raw ? (JSON.parse(raw) as string[]) : [];
    return Array.isArray(arr) ? arr.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

function loadStreak(): number {
  if (typeof window === "undefined") return 0;
  try {
    return Number(localStorage.getItem(STREAK_KEY) ?? 0) || 0;
  } catch {
    return 0;
  }
}

export function useGame() {
  const [phase, setPhase] = useState<GamePhase>("intro");
  const [riddle, setRiddle] = useState<Riddle | null>(null);
  const [guess, setGuess] = useState("");
  const [firstGuess, setFirstGuess] = useState("");
  const [feedback, setFeedback] = useState<AIFeedback | null>(null);
  const [streak, setStreak] = useState<number>(() => loadStreak());
  const [rounds, setRounds] = useState(0);
  const [inputError, setInputError] = useState<string | null>(null);
  const [, setRecentIds] = useState<string[]>(() => loadRecent());
  const requestIdRef = useRef(0);
  const abortRef = useRef<AbortController | null>(null);
  const clueTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (clueTimerRef.current) window.clearTimeout(clueTimerRef.current);
      abortRef.current?.abort();
    };
  }, []);

  const persistRecent = useCallback((ids: string[]) => {
    try {
      localStorage.setItem(RECENT_KEY, JSON.stringify(ids));
    } catch {
      /* ignore */
    }
  }, []);

  const persistStreak = useCallback((n: number) => {
    try {
      localStorage.setItem(STREAK_KEY, String(n));
    } catch {
      /* ignore */
    }
  }, []);

  const fetchFeedback = useCallback(
    async (r: Riddle, g: string) => {
      const requestId = ++requestIdRef.current;
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;
      try {
        const res = await fetch("/api/game/feedback", {
          method: "POST",
          signal: controller.signal,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ riddleId: r.id, guess: g, requestId: String(requestId) }),
        });
        const json = (await res.json()) as Partial<AIFeedback> & { correct?: boolean };
        if (requestIdRef.current !== requestId) return; // superseded by restart
        if (json.correct) {
          setRounds((x) => x + 1);
          setStreak((s) => {
            const n = s + 1;
            persistStreak(n);
            return n;
          });
          setPhase("success");
          return;
        }
        setFeedback({
          feedback: typeof json.feedback === "string" ? json.feedback : r.fallbackFeedback,
          hint: typeof json.hint === "string" ? json.hint : r.fallbackHint,
          encouragement: typeof json.encouragement === "string" ? json.encouragement : "You've got this.",
          fallbackUsed: json.fallbackUsed === true,
        });
        setPhase("aiFeedback");
        // Beat for the panel to land, then open the final input.
        window.setTimeout(() => {
          if (requestIdRef.current === requestId) setPhase("awaitingSecond");
        }, 650);
      } catch {
        if (controller.signal.aborted) return;
        if (requestIdRef.current !== requestId) return;
        setFeedback({
          feedback: r.fallbackFeedback,
          hint: r.fallbackHint,
          encouragement: "You've got this.",
          fallbackUsed: true,
        });
        setPhase("aiFeedback");
        window.setTimeout(() => {
          if (requestIdRef.current === requestId) setPhase("awaitingSecond");
        }, 650);
      }
    },
    [persistStreak],
  );

  const startRound = useCallback(() => {
    abortRef.current?.abort();
    if (clueTimerRef.current) window.clearTimeout(clueTimerRef.current);
    setFeedback(null);
    setFirstGuess("");
    setGuess("");
    setInputError(null);
    setPhase("clues");
    // Let the clue cards land, then open the first guess — fast, not rushed.
    clueTimerRef.current = window.setTimeout(() => {
      setRecentIds((prev) => {
        const next = pickRiddle(RIDDLES, prev);
        setRiddle(next);
        const updated = pushRecentId(prev, next.id);
        persistRecent(updated);
        return updated;
      });
      setPhase("awaitingFirst");
    }, 900);
  }, [persistRecent]);

  // Pick the first riddle synchronously on Play so there's no empty flash.
  const play = useCallback(() => {
    abortRef.current?.abort();
    setFeedback(null);
    setFirstGuess("");
    setGuess("");
    setInputError(null);
    const next = pickRiddle(RIDDLES, loadRecent());
    setRiddle(next);
    setRecentIds((prev) => {
      const updated = pushRecentId(prev, next.id);
      persistRecent(updated);
      return updated;
    });
    setPhase("clues");
    if (clueTimerRef.current) window.clearTimeout(clueTimerRef.current);
    clueTimerRef.current = window.setTimeout(() => {
      setPhase("awaitingFirst");
    }, 900);
  }, [persistRecent]);

  const submitFirst = useCallback(() => {
    if (phase !== "awaitingFirst" || !riddle) return;
    const check = validateGuessInput(guess);
    if (!check.ok) {
      setInputError(check.error ?? "Type something first.");
      return;
    }
    setInputError(null);
    setPhase("evaluatingFirst");
    const g = guess.trim();
    const current = riddle;
    window.setTimeout(() => {
      if (isCorrectGuess(g, current.acceptedAnswers)) {
        setRounds((r) => r + 1);
        setStreak((s) => {
          const n = s + 1;
          persistStreak(n);
          return n;
        });
        setPhase("success");
      } else {
        setFirstGuess(g);
        setGuess("");
        setPhase("aiThinking");
        void fetchFeedback(current, g);
      }
    }, 180);
  }, [phase, guess, riddle, fetchFeedback, persistStreak]);

  const submitSecond = useCallback(() => {
    if (phase !== "awaitingSecond" || !riddle) return;
    const check = validateGuessInput(guess);
    if (!check.ok) {
      setInputError(check.error ?? "Type something first.");
      return;
    }
    setInputError(null);
    setPhase("evaluatingSecond");
    const g = guess.trim();
    const current = riddle;
    window.setTimeout(() => {
      if (isCorrectGuess(g, current.acceptedAnswers)) {
        setRounds((r) => r + 1);
        setStreak((s) => {
          const n = s + 1;
          persistStreak(n);
          return n;
        });
        setPhase("success");
      } else {
        setRounds((r) => r + 1);
        persistStreak(0);
        setStreak(0);
        setPhase("failure");
      }
    }, 180);
  }, [phase, guess, riddle, persistStreak]);

  const replay = useCallback(() => startRound(), [startRound]);
  const nextPlayer = useCallback(() => startRound(), [startRound]);
  const quitToIntro = useCallback(() => {
    abortRef.current?.abort();
    requestIdRef.current += 1;
    setPhase("intro");
    setRiddle(null);
    setGuess("");
    setFeedback(null);
  }, []);

  const attempt: 1 | 2 =
    phase === "awaitingSecond" ||
    phase === "evaluatingSecond" ||
    phase === "aiFeedback" ||
    phase === "aiThinking"
      ? 2
      : 1;

  return {
    phase,
    riddle,
    guess,
    setGuess,
    firstGuess,
    feedback,
    streak,
    rounds,
    inputError,
    attempt,
    play,
    submitFirst,
    submitSecond,
    replay,
    nextPlayer,
    quitToIntro,
    busy:
      phase === "evaluatingFirst" ||
      phase === "evaluatingSecond" ||
      phase === "aiThinking" ||
      phase === "clues",
  };
}

export type GameApi = ReturnType<typeof useGame>;
