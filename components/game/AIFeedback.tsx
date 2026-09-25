import type { AIFeedback } from "@/types/game";

interface Props {
  feedback: AIFeedback;
  firstGuess: string;
}

export function AIFeedbackPanel({ feedback, firstGuess }: Props) {
  return (
    <section
      aria-live="polite"
      aria-label="AI feedback"
      className="ai-panel ai-panel-in mt-5"
    >
      <div className="flex items-center justify-between gap-2">
        <p className="flex items-center gap-2 text-xs font-black tracking-[0.22em] text-cyan-200">
          <span className="ai-orb" aria-hidden="true">
            <span className="ai-orb-core" />
          </span>
          AI ANALYSIS
        </p>
        <span className="rounded-full border border-fuchsia-400/40 bg-fuchsia-400/10 px-2.5 py-1 text-[10px] font-black tracking-[0.14em] text-fuchsia-200">
          YOU SAID: {firstGuess.toUpperCase().slice(0, 18)}
        </span>
      </div>

      <p className="mt-3 text-[15px] font-medium leading-relaxed text-slate-100">
        “{feedback.feedback}”
      </p>

      <div className="hint-card mt-4">
        <p className="text-[11px] font-black tracking-[0.22em] text-amber-300">
          ⚡ YOUR NEXT HINT
        </p>
        <p className="mt-1 text-[15px] font-bold leading-snug text-white">
          {feedback.hint}
        </p>
      </div>

      <p className="mt-3 text-xs font-bold text-slate-400">
        {feedback.encouragement} · One try left.
      </p>
    </section>
  );
}
