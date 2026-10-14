export type ToolCall = {
  id: string;
  function: { name: string; arguments: string };
};

export type Message =
  | { role: "system" | "user"; content: string }
  | { role: "assistant"; content: string; tool_calls?: ToolCall[] }
  | { role: "tool"; tool_call_id: string; content: string };

export type Tool = {
  name: string;
  description: string;
  parameters: object;
  run(args: any): Promise<string>;
};
