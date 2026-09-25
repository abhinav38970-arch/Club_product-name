import type { Riddle } from "@/types/game";
import { GAME_CONFIG } from "./config";

/** Pick a random riddle, avoiding the most recent IDs. Pure + testable. */
export function pickRiddle(
  riddles: Riddle[],
  recentIds: string[] = [],
): Riddle {
  if (riddles.length === 0) throw new Error("No riddles available.");
  const avoid = new Set(
    recentIds.slice(-GAME_CONFIG.recentAvoidCount),
  );
  const pool = riddles.filter((r) => !avoid.has(r.id));
  const source = pool.length > 0 ? pool : riddles;
  return source[Math.floor(Math.random() * source.length)];
}

/** Push an ID onto the recent list, capped to avoid-list length + 1. */
export function pushRecentId(recentIds: string[], id: string): string[] {
  const next = [...recentIds, id];
  return next.slice(-(GAME_CONFIG.recentAvoidCount + 1));
}
