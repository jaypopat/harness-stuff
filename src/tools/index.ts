import type { Tool, ToolCall } from "../types.ts";
import { listFiles } from "./list_files.ts";
import { readFile } from "./read_file.ts";

export const tools: Tool[] = [readFile, listFiles];

export async function runTool(call: ToolCall): Promise<string> {
  const tool = tools.find((t) => t.name === call.function.name);
  if (!tool) return `unknown tool: ${call.function.name}`;
  try {
    return await tool.run(JSON.parse(call.function.arguments));
  } catch (err) {
    return `error: ${err}`;
  }
}
