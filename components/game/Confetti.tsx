"use client";

import { useEffect, useMemo } from "react";

export function Confetti({ count = 90 }: { count?: number }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const rand = (seed: number) => {
          const x = Math.sin(i * 127.1 + seed * 311.7) * 43758.5453;
          return x - Math.floor(x);
        };
        return {
          left: rand(1) * 100,
          delay: rand(2) * 0.9,
          duration: 2.2 + rand(3) * 1.8,
          size: 6 + rand(4) * 8,
          color: ["#22d3ee", "#f0abfc", "#fde047", "#86efac", "#fda4af"][i % 5],
          round: rand(5) > 0.5,
        };
      }),
    [count],
  );
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  }, []);
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {pieces.map((p, i) => (
        <span
          key={i}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.round ? p.size : p.size * 0.45,
            background: p.color,
            borderRadius: p.round ? "50%" : "2px",
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
