"use client";

interface Props {
  onPlay: () => void;
  streak: number;
}

export function GameIntro({ onPlay, streak }: Props) {
  return (
    <div className="animate-rise text-center">
      <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3.5 py-1.5 text-[11px] font-extrabold tracking-[0.18em] text-cyan-200">
        <span className="live-dot" aria-hidden="true" />
        AI CHALLENGE · CLUB RUSH
      </div>

      <h1 className="mt-5 font-display text-[clamp(2.6rem,9vw,4.5rem)] font-black leading-[0.95] tracking-tight">
        <span className="block text-white">CAN YOU</span>
        <span className="block bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-amber-300 bg-clip-text text-transparent">
          OUTSMART AI?
        </span>
      </h1>

      <p className="mt-4 text-base font-extrabold tracking-[0.14em] text-slate-200 sm:text-lg">
        3 CLUES. <span className="text-cyan-300">2 TRIES.</span>{" "}
        <span className="text-amber-300">WIN CANDY.</span>
      </p>

      <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-slate-400">
        Guess the school object. Get it wrong, and AI reads your guess and helps
        you. No coding required.
      </p>

      <div className="mx-auto mt-6 grid max-w-sm grid-cols-3 gap-2" aria-label="How it works">
        {[
          ["01", "READ", "3 clues"],
          ["02", "GUESS", "2 tries"],
          ["03", "WIN", "candy"],
        ].map(([n, t, s]) => (
          <div
            key={n}
            className="rounded-2xl border border-white/10 bg-white/[0.04] px-2 py-3 backdrop-blur"
          >
            <p className="text-[10px] font-black tracking-[0.2em] text-cyan-300">{n}</p>
            <p className="mt-1 text-sm font-black text-white">{t}</p>
            <p className="text-[11px] font-medium text-slate-400">{s}</p>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={onPlay}
        className="btn-primary group mx-auto mt-7 flex min-h-[60px] w-full max-w-sm items-center justify-center gap-2 text-lg"
      >
        PLAY NOW
        <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
          →
        </span>
      </button>

      <div className="mt-4 flex items-center justify-center gap-3 text-xs font-semibold text-slate-500">
        <span>~30 seconds a round</span>
        <span aria-hidden="true">·</span>
        <span>Watchable from the crowd</span>
        {streak > 1 && (
          <>
            <span aria-hidden="true">·</span>
            <span className="text-amber-300">🔥 streak {streak}</span>
          </>
        )}
      </div>
    </div>
  );
}
