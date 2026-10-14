import { readdir } from "node:fs/promises";
import type { Tool } from "../types.ts";

export const listFiles: Tool = {
  name: "list_files",
  description: "List files in a directory.",
  parameters: { type: "object", properties: { path: { type: "string" } }, required: ["path"] },
  run: async (args) => (await readdir(args.path)).join("\n"),
};
