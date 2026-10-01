#!/usr/bin/env node

import { fileURLToPath } from "node:url";

export function formatHelp(): string {
  return [
    "scholar-artifact-builder",
    "",
    "Usage:",
    "  sab <command>",
    "",
    "Commands:",
    "  init      Create a research project",
    "  validate  Validate a research project",
    "  build     Build a research artifact",
    "  clean     Remove generated output",
  ].join("\\n");
}

export function main(
  argumentsList: readonly string[] = process.argv.slice(2),
): void {
  const command = argumentsList[0];

  if (command === undefined || command === "help" || command === "--help") {
    console.log(formatHelp());
    return;
  }

  console.error(`Unknown command: ${command}`);
  process.exitCode = 1;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}
