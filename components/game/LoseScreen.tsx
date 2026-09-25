interface Props {
  answer: string;
  onReplay: () => void;
  onNextPlayer: () => void;
}

export function LoseScreen({ answer, onReplay, onNextPlayer }: Props) {
  return (
    <div className="lose-card animate-pop text-center" role="status" aria-label="Round over">
      <p className="text-5xl" aria-hidden="true">
        🤖
      </p>
      <h2 className="mt-3 font-display text-3xl font-black tracking-tight text-white sm:text-4xl">
        AI GOT YOU
        <span className="block text-fuchsia-300">THIS TIME.</span>
      </h2>
      <p className="mt-3 text-xs font-black tracking-[0.24em] text-slate-400">
        THE ANSWER WAS
      </p>
      <p className="mt-1 font-display text-4xl font-black uppercase tracking-tight text-cyan-200">
        {answer}
      </p>
      <p className="mx-auto mt-3 max-w-xs text-sm text-slate-400">
        No shame — grab a friend and run it back.
      </p>
      <div className="mt-6 grid gap-2 sm:grid-cols-2">
        <button type="button" onClick={onReplay} className="btn-primary min-h-[56px] text-base">
          TRY AGAIN →
        </button>
        <button type="button" onClick={onNextPlayer} className="btn-ghost min-h-[56px] text-base">
          NEXT PLAYER
        </button>
      </div>
    </div>
  );
}
