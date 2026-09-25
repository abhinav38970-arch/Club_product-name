import type { Riddle, AIFeedback } from "@/types/game";
import { GAME_CONFIG } from "@/lib/game/config";
import { AI_SYSTEM_PROMPT, buildUserPrompt } from "./prompt";
import { parseAndValidateAI } from "./schema";

function fallbackFor(riddle: Riddle): AIFeedback {
  return {
    feedback: riddle.fallbackFeedback,
    hint: riddle.fallbackHint,
    encouragement: "You've got this.",
    fallbackUsed: true,
  };
}

/** Call the AI provider once. Throws on any problem — caller renders fallback. */
export async function generateFeedback(
  riddle: Riddle,
  guess: string,
): Promise<AIFeedback> {
  const apiKey = process.env.AI_API_KEY;
  if (!apiKey) throw new Error("missing-api-key");

  const model = process.env.AI_MODEL || "llama-3.1-8b-instant";
  const baseUrl = (process.env.AI_BASE_URL || "https://api.groq.com/openai/v1").replace(/\/$/, "");

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), GAME_CONFIG.aiTimeoutMs);
  try {
    const res = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        temperature: 0.4,
        max_tokens: 220,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: AI_SYSTEM_PROMPT },
          { role: "user", content: buildUserPrompt(riddle, guess) },
        ],
      }),
    });
    if (!res.ok) throw new Error(`provider-${res.status}`);
    const json = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const content = json.choices?.[0]?.message?.content;
    if (!content) throw new Error("empty-response");
    const parsed = parseAndValidateAI(content, riddle.answer, riddle.acceptedAnswers);
    if (!parsed) throw new Error("invalid-schema");
    return parsed;
  } finally {
    clearTimeout(timeout);
  }
}

export { fallbackFor };
