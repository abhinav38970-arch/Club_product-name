import { CLUB_NAME } from "@/lib/game/config";
import { Confetti } from "./Confetti";

interface Props {
  answer: string;
  streak: number;
  onReplay: () => void;
  onNextPlayer: () => void;
}

export function WinScreen({ answer, streak, onReplay, onNextPlayer }: Props) {
  return (
    <div className="win-card win-3d animate-pop relative overflow-hidden text-center" role="status" aria-label="You won">
      <div className="win-burst" aria-hidden="true" />
      <div className="win-float-candy" aria-hidden="true">
        <span>🍬</span>
        <span>🍭</span>
        <span>🍬</span>
        <span>🍭</span>
        <span>🍬</span>
      </div>
      <Confetti />
      <p className="text-5xl" aria-hidden="true">
        🎉
      </p>
      <h2 className="mt-3 font-display text-4xl font-black tracking-tight text-white sm:text-5xl">
        YOU BEAT
        <span className="block bg-gradient-to-r from-lime-300 via-amber-300 to-cyan-300 bg-clip-text text-transparent">
          THE RIDDLE!
        </span>
      </h2>
      <p className="mt-2 text-sm font-bold uppercase tracking-[0.2em] text-slate-300">
        Answer: {answer}
      </p>
      <div className="candy-banner mt-5">
        <span className="text-3xl" aria-hidden="true">
          🍬
        </span>
        <span className="font-display text-2xl font-black tracking-tight text-[#2a1500]">
          CLAIM YOUR CANDY
        </span>
        <span className="text-3xl" aria-hidden="true">
          🍬
        </span>
      </div>
      {streak > 1 && (
        <p className="mt-3 text-sm font-black text-amber-300">🔥 STREAK x{streak} — the crowd is watching</p>
      )}
      <div className="mt-6 grid gap-2 sm:grid-cols-2">
        <button type="button" onClick={onReplay} className="btn-primary min-h-[56px] text-base">
          PLAY AGAIN →
        </button>
        <button type="button" onClick={onNextPlayer} className="btn-ghost min-h-[56px] text-base">
          NEXT PLAYER
        </button>
      </div>
      <p className="mt-4 text-[11px] font-semibold text-slate-400">
        Built by {CLUB_NAME} · Show this screen at the booth
      </p>
    </div>
  );
}
