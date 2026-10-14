import type { Tool } from "../types.ts";

export const readFile: Tool = {
  name: "read_file",
  description: "Read a file.",
  parameters: { type: "object", properties: { path: { type: "string" } }, required: ["path"] },
  run: (args) => Bun.file(args.path).text(),
};
