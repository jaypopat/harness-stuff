import { chat } from "./llm.ts";
import { runTool, toolSchemas } from "./tools/index.ts";
import type { Message } from "./types.ts";

export class Agent {
  private messages: Message[] = [{ role: "system", content: "hi, this is system prompt" }];

  async send(userMessage: string): Promise<string> {
    this.messages.push({ role: "user", content: userMessage });

    while (true) {
      const message = await chat(this.messages, toolSchemas);
      this.messages.push(message);

      if (message.role !== "assistant" || !message.tool_calls) return message.content;

      for (const call of message.tool_calls) {
        this.messages.push({ role: "tool", tool_call_id: call.id, content: await runTool(call) });
      }
    }
  }
}
