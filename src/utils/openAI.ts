import OpenAI from "openai";
import { GPT_API_KEY } from "./constant";

// Note: calling OpenAI from the browser exposes the key to users.
// Fine for a personal/demo project; use a backend for production.
export const openai = GPT_API_KEY
  ? new OpenAI({ apiKey: GPT_API_KEY, dangerouslyAllowBrowser: true })
  : null;

/** Asks GPT for movie titles matching a free-text request. */
export async function getAIMovieTitles(query: string): Promise<string[]> {
  if (!openai) return [];
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are a movie recommendation system. Reply ONLY with 8 movie titles, comma separated, no numbering, no extra text.",
      },
      { role: "user", content: query },
    ],
  });
  const text = completion.choices[0]?.message?.content ?? "";
  return text
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)
    .slice(0, 8);
}
