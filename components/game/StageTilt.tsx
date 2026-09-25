"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Subtle pointer parallax tilt for the game stage. Desktop only, calm by default. */
export function StageTilt({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let raf = 0;

    function onMove(e: PointerEvent) {
      tx = Math.max(-1, Math.min(1, (e.clientX / window.innerWidth - 0.5) * 2));
      ty = Math.max(-1, Math.min(1, (e.clientY / window.innerHeight - 0.5) * 2));
    }
    function loop() {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      el!.style.setProperty("--rx", `${(-cy * 3).toFixed(2)}deg`);
      el!.style.setProperty("--ry", `${(cx * 4).toFixed(2)}deg`);
      raf = requestAnimationFrame(loop);
    }
    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className="tilt-inner">
      {children}
    </div>
  );
}
