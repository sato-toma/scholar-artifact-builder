import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import type { ResearchArtifact, ResearchProject } from "./model/project.js";

export async function buildArtifact(
  project: ResearchProject,
  artifactId: string,
): Promise<string> {
  const artifact = project.artifacts[artifactId];
  if (artifact === undefined) {
    throw new Error(`Unknown artifact '${artifactId}'.`);
  }

  const sources = await Promise.all(
    artifact.sections.map((section) =>
      readFile(resolve(project.rootDirectory, section.path), "utf8"),
    ),
  );
  const output = renderArtifact(project, artifact, sources);
  const outputPath = resolve(
    project.rootDirectory,
    "build",
    `${artifactId}.md`,
  );

  await mkdir(resolve(project.rootDirectory, "build"), { recursive: true });
  await writeFile(outputPath, output, "utf8");
  return outputPath;
}

function renderArtifact(
  project: ResearchProject,
  artifact: ResearchArtifact,
  sources: readonly string[],
): string {
  const title = `# ${project.name}`;
  const sections = sources.map((source) => source.trim());

  if (artifact.type === "presentation") {
    return (
      [title, ...sections.map((section) => `---\n\n${section}`)].join("\n\n") +
      "\n"
    );
  }

  return `${[title, ...sections].join("\n\n")}\n`;
}
