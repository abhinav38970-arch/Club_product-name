interface Props {
  attempt: 1 | 2;
  streak: number;
}

export function AttemptIndicator({ attempt, streak }: Props) {
  return (
    <div className="flex items-center justify-between gap-2">
      <div
        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3.5 py-1.5"
        aria-live="polite"
        aria-label={`Try ${attempt} of 2`}
      >
        <span className="flex gap-1.5" aria-hidden="true">
          <span className={`try-dot ${attempt >= 1 ? "try-dot-on" : ""}`} />
          <span className={`try-dot ${attempt >= 2 ? "try-dot-on-2" : ""}`} />
        </span>
        <span className="text-xs font-black tracking-[0.16em] text-slate-200">
          TRY {attempt} OF 2
        </span>
      </div>
      {streak > 1 ? (
        <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1.5 text-xs font-black text-amber-200">
          <span aria-hidden="true">🔥</span> STREAK {streak}
        </div>
      ) : (
        <div className="hidden items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] font-bold text-slate-400 sm:inline-flex">
          🍬 WIN = CANDY
        </div>
      )}
    </div>
  );
}
