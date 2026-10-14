import type { Message } from "./types.ts";

const API_URL = "https://api.mistral.ai/v1/chat/completions";
const MODEL = "mistral-small-latest";

export async function chat(messages: Message[], tools: object[]): Promise<Message> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.API_KEY}` },
    body: JSON.stringify({ model: MODEL, messages, tools }),
  });
  if (!res.ok) throw new Error(`${res.status}: ${await res.text()}`);

  const data: any = await res.json();
  return { role: "assistant", ...data.choices[0].message };
}
