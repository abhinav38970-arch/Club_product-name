"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  z: number; // 0..1 depth (1 = near)
  r: number;
  vx: number;
  vy: number;
  hue: number;
  tw: number;
}

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

/**
 * Living 3D-ish backdrop: perspective grid floor + drifting depth particles +
 * sparse AI node network + rotating wireframe cube/rings. Canvas 2D only —
 * no heavy deps, single rAF loop, DPR-capped, pauses offscreen.
 */
export function Scene3D() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const parallax = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const small = Math.min(window.innerWidth, window.innerHeight) < 640;

    let w = 0;
    let h = 0;
    let raf = 0;
    let running = true;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    const P_COUNT = small ? 26 : 52;
    const N_COUNT = small ? 7 : 11;
    const particles: Particle[] = Array.from({ length: P_COUNT }, () => ({
      x: Math.random(),
      y: Math.random(),
      z: 0.25 + Math.random() * 0.75,
      r: 0.8 + Math.random() * 2.2,
      vx: (Math.random() - 0.5) * 0.00035,
      vy: -0.00012 - Math.random() * 0.0004,
      hue: Math.random() < 0.55 ? 190 : Math.random() < 0.75 ? 300 : 95,
      tw: Math.random() * Math.PI * 2,
    }));
    const nodes: Node[] = Array.from({ length: N_COUNT }, () => ({
      x: Math.random(),
      y: Math.random() * 0.75,
      vx: (Math.random() - 0.5) * 0.00028,
      vy: (Math.random() - 0.5) * 0.00022,
    }));

    let gridOffset = 0;
    let cubeAngle = 0.4;
    let ringAngle = 0;
    let t = 0;

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      w = Math.max(1, Math.floor(rect.width * dpr));
      h = Math.max(1, Math.floor(rect.height * dpr));
      canvas!.width = w;
      canvas!.height = h;
    }
    resize();
    window.addEventListener("resize", resize);

    function onPointer(e: PointerEvent) {
      if (coarse || reduced) return;
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      parallax.current.tx = Math.max(-1, Math.min(1, nx));
      parallax.current.ty = Math.max(-1, Math.min(1, ny));
    }
    window.addEventListener("pointermove", onPointer, { passive: true });

    function onVis() {
      running = document.visibilityState === "visible";
      if (running && !reduced) {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(frame);
      }
    }
    document.addEventListener("visibilitychange", onVis);

    // 3D cube vertices in unit space
    const CUBE: Array<[number, number, number]> = [
      [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
      [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1],
    ];
    const EDGES: Array<[number, number]> = [
      [0, 1], [1, 2], [2, 3], [3, 0],
      [4, 5], [5, 6], [6, 7], [7, 4],
      [0, 4], [1, 5], [2, 6], [3, 7],
    ];

    function project(px: number, py: number, pz: number, cx: number, cy: number, size: number) {
      const scale = size / (2.4 + pz);
      return [cx + px * scale, cy + py * scale] as const;
    }

    function drawCube(cx: number, cy: number, size: number, ax: number, ay: number, alpha: number) {
      const ca = Math.cos(ax);
      const sa = Math.sin(ax);
      const cb = Math.cos(ay);
      const sb = Math.sin(ay);
      const pts = CUBE.map(([x, y, z]) => {
        const x1 = x * ca - z * sa;
        const z1 = x * sa + z * ca;
        const y1 = y * cb - z1 * sb;
        const z2 = y * sb + z1 * cb;
        return project(x1, y1, z2, cx, cy, size);
      });
      ctx!.strokeStyle = `rgba(103, 232, 249, ${alpha})`;
      ctx!.lineWidth = 1 * dpr;
      for (const [a, b] of EDGES) {
        ctx!.beginPath();
        ctx!.moveTo(pts[a][0], pts[a][1]);
        ctx!.lineTo(pts[b][0], pts[b][1]);
        ctx!.stroke();
      }
    }

    function frame() {
      if (!running) return;
      t += 0.008;
      gridOffset = (gridOffset + 0.0016) % 1;
      cubeAngle += 0.0035;
      ringAngle += 0.0022;

      // ease parallax
      const p = parallax.current;
      p.x += (p.tx - p.x) * 0.04;
      p.y += (p.ty - p.y) * 0.04;
      const px = p.x * 16 * dpr;
      const py = p.y * 12 * dpr;

      ctx!.clearRect(0, 0, w, h);

      // --- perspective grid floor ---
      const horizon = h * 0.62 + py * 0.4;
      ctx!.save();
      ctx!.strokeStyle = "rgba(103, 232, 249, 0.10)";
      ctx!.lineWidth = 1 * dpr;
      const rows = 9;
      for (let i = 0; i < rows; i++) {
        const f = ((i / rows + gridOffset) % 1);
        const y = horizon + Math.pow(f, 2.1) * (h - horizon);
        ctx!.globalAlpha = 0.25 + f * 0.75;
        ctx!.beginPath();
        ctx!.moveTo(0, y);
        ctx!.lineTo(w, y);
        ctx!.stroke();
      }
      ctx!.globalAlpha = 0.5;
      const cols = 14;
      for (let i = 0; i <= cols; i++) {
        const x = (i / cols - 0.5) * w * 1.6 + w / 2 + px * 0.5;
        ctx!.beginPath();
        ctx!.moveTo(w / 2 + (x - w / 2) * 0.18 + px * 0.3, horizon);
        ctx!.lineTo(x, h);
        ctx!.stroke();
      }
      ctx!.restore();

      // --- AI node network (upper region) ---
      ctx!.save();
      const npts = nodes.map((n) => {
        n.x = (n.x + n.vx + 1) % 1;
        n.y = (n.y + n.vy + 1) % 1;
        return [n.x * w + px * 0.7, n.y * h + py * 0.7] as const;
      });
      for (let i = 0; i < npts.length; i++) {
        for (let j = i + 1; j < npts.length; j++) {
          const dx = npts[i][0] - npts[j][0];
          const dy = npts[i][1] - npts[j][1];
          const d2 = dx * dx + dy * dy;
          const max = (w * 0.16) * (w * 0.16);
          if (d2 < max) {
            const a = (1 - d2 / max) * 0.22;
            ctx!.strokeStyle = `rgba(240, 171, 252, ${a.toFixed(3)})`;
            ctx!.lineWidth = 1 * dpr;
            ctx!.beginPath();
            ctx!.moveTo(npts[i][0], npts[i][1]);
            ctx!.lineTo(npts[j][0], npts[j][1]);
            ctx!.stroke();
          }
        }
      }
      for (const [x, y] of npts) {
        ctx!.fillStyle = "rgba(165, 243, 252, 0.8)";
        ctx!.beginPath();
        ctx!.arc(x, y, 1.6 * dpr, 0, Math.PI * 2);
        ctx!.fill();
      }
      ctx!.restore();

      // --- wireframe cube (right, mid depth) ---
      drawCube(
        w * 0.84 + px * 1.2,
        h * 0.3 + py * 1.2 + Math.sin(t * 1.4) * 8 * dpr,
        Math.min(w, h) * 0.16,
        cubeAngle,
        cubeAngle * 0.7,
        0.4,
      );
      // --- small cube (left, far) ---
      if (!small) {
        drawCube(
          w * 0.12 + px * 0.6,
          h * 0.52 + py * 0.6 + Math.cos(t * 1.1) * 6 * dpr,
          Math.min(w, h) * 0.09,
          -cubeAngle * 0.8,
          cubeAngle * 0.5,
          0.28,
        );
      }

      // --- floating rings ---
      ctx!.save();
      for (let k = 0; k < (small ? 1 : 2); k++) {
        const cx = w * (k === 0 ? 0.2 : 0.72) + px * (k === 0 ? 0.9 : 1.4);
        const cy = h * (k === 0 ? 0.24 : 0.66) + py + Math.sin(t * 1.2 + k * 2) * 10 * dpr;
        const R = Math.min(w, h) * (k === 0 ? 0.07 : 0.1);
        ctx!.strokeStyle = k === 0 ? "rgba(253, 224, 71, 0.35)" : "rgba(240, 171, 252, 0.32)";
        ctx!.lineWidth = 1.4 * dpr;
        ctx!.beginPath();
        ctx!.ellipse(cx, cy, R, R * (0.42 + 0.1 * Math.sin(ringAngle + k)), ringAngle * (k ? 1 : -1), 0, Math.PI * 2);
        ctx!.stroke();
      }
      ctx!.restore();

      // --- depth particles (front layer) ---
      ctx!.save();
      for (const pt of particles) {
        pt.x = (pt.x + pt.vx + 1) % 1;
        pt.y = (pt.y + pt.vy + 1) % 1;
        pt.tw += 0.03;
        const x = pt.x * w + px * pt.z * 1.6;
        const y = pt.y * h + py * pt.z * 1.6;
        const a = (0.12 + pt.z * 0.5) * (0.6 + 0.4 * Math.sin(pt.tw));
        ctx!.fillStyle = `hsla(${pt.hue}, 90%, 72%, ${a.toFixed(3)})`;
        ctx!.beginPath();
        ctx!.arc(x, y, pt.r * dpr * (0.5 + pt.z), 0, Math.PI * 2);
        ctx!.fill();
      }
      ctx!.restore();

      raf = requestAnimationFrame(frame);
    }

    if (reduced) {
      // One calm static frame, no loop.
      gridOffset = 0.3;
      running = true;
      frame();
      cancelAnimationFrame(raf);
      running = false;
    } else {
      raf = requestAnimationFrame(frame);
    }

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="scene-canvas pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
