# CAN YOU OUTSMART AI? — Club Rush mini-game

3 clues. 2 tries. Win candy. Guess the school object; if you're wrong once, AI reads your guess and helps you.

## Run locally

```bash
npm install
cp .env.example .env.local   # add AI_API_KEY to enable live AI (optional — game works on fallback without it)
npm run dev                  # http://localhost:3000
npm run lint
npm run build
npm start
```

## How it works

- Riddle bank: `data/riddles.ts` (12 curated school objects, deterministic fallbacks).
- Answer check: `lib/game/answer-validation.ts` — normalized exact match against `acceptedAnswers`. No LLM grading.
- Game state: `hooks/useGame.ts` — intro → clues → guess 1 → (win | AI thinking → feedback → guess 2) → win/lose → replay.
- AI: `POST /api/game/feedback` (`app/api/game/feedback/route.ts`) loads the authoritative riddle server-side, calls Groq/OpenAI-compatible chat (`lib/ai/client.ts`), schema-validates + leak-checks (`lib/ai/schema.ts`), falls back to curated hint on any failure. Max 1 AI call per round.
- Timer supported via `GAME_CONFIG` but disabled by default (`NEXT_PUBLIC_TIMER_ENABLED=false`).

## Deploy on Vercel

Root directory: `Club_Proj`. Framework: Next.js. Build: `npm run build`.

Env vars in Vercel dashboard:

- `AI_API_KEY` (required for live AI, server-only — never `NEXT_PUBLIC_`)
- `AI_MODEL=llama-3.1-8b-instant`
- `AI_BASE_URL=https://api.groq.com/openai/v1`
- `NEXT_PUBLIC_CLUB_NAME=Husky Hackathon Society`
- `NEXT_PUBLIC_TIMER_ENABLED=false`

Smoke test after deploy: correct-first-try win, wrong→AI→correct win, wrong→wrong lose, no-key fallback still playable, 320px mobile, rapid double-submit = 1 AI call.
