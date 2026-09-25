/** Tiny in-memory per-IP token bucket. Fine for a booth-scale event on one Vercel region. */
const hits = new Map<string, number[]>();

export function isRateLimited(key: string, limitPerMinute: number): boolean {
  const now = Date.now();
  const windowStart = now - 60_000;
  const list = (hits.get(key) ?? []).filter((t) => t > windowStart);
  if (list.length >= limitPerMinute) {
    hits.set(key, list);
    return true;
  }
  list.push(now);
  hits.set(key, list);
  return false;
}

export function clientIp(headers: Headers): string {
  return (
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headers.get("x-real-ip") ||
    "unknown"
  );
}
