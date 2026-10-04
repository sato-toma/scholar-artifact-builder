#!/usr/bin/env node

import { access } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { buildArtifact } from "./build-artifact.js";
import { loadProject } from "./model/load-project.js";

export function formatHelp(): string {
  return [
    "scholar-artifact-builder",
    "",
    "Usage:",
    "  sab <command> [options]",
    "",
    "Commands:",
    "  init      Create a research project",
    "  validate  Validate a research project",
    "  build     Build a research artifact as Markdown",
    "",
    "Options:",
    "  --project <directory>  Project directory (default: current directory)",
    "",
    "Artifact types: paper, presentation, poster, preprint",
    "Build output: build/<artifact-id>.md",
  ].join("\n");
}

export async function main(
  argumentsList: readonly string[] = process.argv.slice(2),
): Promise<void> {
  const command = argumentsList[0];

  if (command === undefined || command === "help" || command === "--help") {
    console.log(formatHelp());
    return;
  }

  try {
    const projectDirectory = getProjectDirectory(argumentsList);
    const project = await loadProject(projectDirectory);

    if (command === "validate") {
      await validateSources(project);
      console.log(
        `Project '${project.name}' is valid (${Object.keys(project.artifacts).length} artifacts).`,
      );
      return;
    }

    if (command === "build") {
      const artifactId = argumentsList[1];
      if (artifactId === undefined || artifactId.startsWith("--")) {
        throw new Error(
          "Usage: sab build <artifact-id> [--project <directory>]",
        );
      }
      const outputPath = await buildArtifact(project, artifactId);
      console.log(`Built '${artifactId}': ${outputPath}`);
      return;
    }

    throw new Error(`Unknown command: ${command}`);
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}

function getProjectDirectory(argumentsList: readonly string[]): string {
  const projectOption = argumentsList.indexOf("--project");
  if (projectOption === -1) {
    return process.cwd();
  }

  const directory = argumentsList[projectOption + 1];
  if (directory === undefined || directory.startsWith("--")) {
    throw new Error("--project requires a directory.");
  }

  return resolve(directory);
}

async function validateSources(
  project: Awaited<ReturnType<typeof loadProject>>,
) {
  for (const artifact of Object.values(project.artifacts)) {
    for (const section of artifact.sections) {
      try {
        await access(resolve(project.rootDirectory, section.path));
      } catch {
        throw new Error(
          `Missing source '${section.path}' for artifact '${artifact.id}'.`,
        );
      }
    }
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await main();
}
