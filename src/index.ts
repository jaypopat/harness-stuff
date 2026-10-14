import { Agent } from "./agent.ts";

const agent = new Agent();
process.stdout.write("> ");

for await (const line of console) {
  const input = line.trim();

  if (input === "/exit") break;
  else if (input) {
    try {
      console.log(await agent.send(input));
    } catch (err) {
      console.error(`error: ${err instanceof Error ? err.message : err}`);
    }
  }

  process.stdout.write("\n> ");
}
