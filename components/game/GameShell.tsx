import type { ReactNode } from "react";
import { CLUB_NAME } from "@/lib/game/config";

export function GameShell({ children }: { children: ReactNode }) {
  return (
    <div className="game-root relative min-h-dvh overflow-x-clip bg-[#070b18] text-slate-100">
      {/* atmosphere */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute -top-32 left-1/2 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-cyan-500/20 blur-[120px]" />
        <div className="absolute top-1/3 -left-24 h-80 w-80 rounded-full bg-fuchsia-500/15 blur-[100px]" />
        <div className="absolute bottom-0 -right-24 h-80 w-80 rounded-full bg-lime-400/10 blur-[100px]" />
        <div className="absolute inset-0 bg-noise opacity-[0.5]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-dvh w-full max-w-xl flex-col px-4 pb-8 pt-5 sm:px-6 sm:pt-8">
        <header className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="ai-orb" aria-hidden="true">
              <span className="ai-orb-core" />
            </span>
            <div className="leading-none">
              <p className="text-[11px] font-extrabold tracking-[0.22em] text-cyan-300">
                CAN YOU OUTSMART AI?
              </p>
              <p className="mt-1 text-[11px] font-medium tracking-wide text-slate-400">
                {CLUB_NAME}
              </p>
            </div>
          </div>
          <div className="hidden items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-bold text-slate-300 sm:flex">
            <span className="live-dot" aria-hidden="true" />
            CLUB RUSH LIVE
          </div>
        </header>

        <main className="flex flex-1 flex-col justify-center py-6">{children}</main>

        <footer className="pt-2 text-center text-[11px] font-medium tracking-wide text-slate-500">
          Built with AI by {CLUB_NAME} · No coding required to play
        </footer>
      </div>
    </div>
  );
}
