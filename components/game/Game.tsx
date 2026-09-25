"use client";

import { useEffect } from "react";
import { useGame } from "@/hooks/useGame";
import { GameIntro } from "./GameIntro";
import { ClueList } from "./ClueList";
import { AttemptIndicator } from "./AttemptIndicator";
import { GuessInput } from "./GuessInput";
import { AIThinking } from "./AIThinking";
import { AIFeedbackPanel } from "./AIFeedback";
import { WinScreen } from "./WinScreen";
import { LoseScreen } from "./LoseScreen";

export function Game() {
  const g = useGame();

  // Autofocus the input whenever a guessing phase opens (kiosk-friendly).
  useEffect(() => {
    if (g.phase === "awaitingFirst" || g.phase === "awaitingSecond") {
      const t = window.setTimeout(() => {
        document.getElementById(g.phase === "awaitingFirst" ? "guess-1" : "guess-2")?.focus();
      }, 350);
      return () => window.clearTimeout(t);
    }
    return undefined;
  }, [g.phase]);

  if (g.phase === "intro") {
    return <GameIntro onPlay={g.play} streak={g.streak} />;
  }

  if (g.phase === "success" && g.riddle) {
    return (
      <WinScreen
        answer={g.riddle.answer}
        streak={g.streak}
        onReplay={g.replay}
        onNextPlayer={g.nextPlayer}
      />
    );
  }

  if (g.phase === "failure" && g.riddle) {
    return (
      <LoseScreen answer={g.riddle.answer} onReplay={g.replay} onNextPlayer={g.nextPlayer} />
    );
  }

  const showFeedback =
    g.feedback &&
    (g.phase === "aiFeedback" ||
      g.phase === "awaitingSecond" ||
      g.phase === "evaluatingSecond");

  return (
    <div className="animate-rise">
      <AttemptIndicator attempt={g.attempt} streak={g.streak} />

      <div className="mt-4">
        <div className="stage-tag">
          <span className="live-dot" aria-hidden="true" />
          {g.phase === "clues" ? "LOADING CHALLENGE..." : "GUESS THE SCHOOL OBJECT"}
        </div>
        {g.riddle ? (
          <ClueList clues={g.riddle.clues} revealed />
        ) : (
          <div className="clue-card" aria-hidden="true">
            <p className="text-sm font-bold text-slate-400">Picking your challenge...</p>
          </div>
        )}
      </div>

      {(g.phase === "aiThinking" ||
        g.phase === "aiFeedback" ||
        g.phase === "awaitingSecond" ||
        g.phase === "evaluatingSecond") &&
        g.firstGuess && (
          <div className="wrong-banner" role="status">
            <span aria-hidden="true">👀</span> NOT QUITE — “{g.firstGuess}” isn&apos;t it.
          </div>
        )}

      {g.phase === "aiThinking" && <AIThinking />}

      {showFeedback && g.feedback && (
        <AIFeedbackPanel feedback={g.feedback} firstGuess={g.firstGuess} />
      )}

      {(g.phase === "awaitingFirst" || g.phase === "evaluatingFirst") && (
        <GuessInput
          inputId="guess-1"
          value={g.guess}
          onChange={g.setGuess}
          onSubmit={g.submitFirst}
          disabled={g.phase !== "awaitingFirst"}
          error={g.inputError}
        />
      )}

      {(g.phase === "awaitingSecond" ||
        g.phase === "evaluatingSecond" ||
        g.phase === "aiFeedback") && (
        <div className={g.phase === "aiFeedback" ? "pointer-events-none opacity-70" : ""}>
          <GuessInput
            inputId="guess-2"
            value={g.guess}
            onChange={g.setGuess}
            onSubmit={g.submitSecond}
            disabled={g.phase !== "awaitingSecond"}
            final
            error={g.inputError}
          />
        </div>
      )}

      <button
        type="button"
        onClick={g.quitToIntro}
        className="mx-auto mt-6 block text-xs font-bold tracking-wide text-slate-500 underline-offset-4 hover:text-slate-300 hover:underline"
      >
        ← back to start
      </button>
    </div>
  );
}
