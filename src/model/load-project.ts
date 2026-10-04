import { readFile } from "node:fs/promises";
import { isAbsolute, relative, resolve } from "node:path";
import { parse } from "yaml";
import {
  type ArtifactType,
  ProjectConfigError,
  type ProjectDiagnostic,
  type ResearchArtifact,
  type ResearchProject,
  type ResearchSection,
} from "./project.js";

interface RawProjectConfig {
  name?: unknown;
  version?: unknown;
  language?: unknown;
  artifacts?: unknown;
}

interface RawResearchArtifact {
  type?: unknown;
  sections?: unknown;
}

export async function loadProject(
  projectDirectory: string,
): Promise<ResearchProject> {
  const rootDirectory = resolve(projectDirectory);
  const projectFile = resolve(rootDirectory, "project.yaml");
  const source = await readFile(projectFile, "utf8");
  const config = parseProjectYaml(source);

  return normalizeProject(config, rootDirectory);
}

export function normalizeProject(
  config: unknown,
  rootDirectory: string,
): ResearchProject {
  const diagnostics: ProjectDiagnostic[] = [];

  if (!isRecord(config)) {
    throw new ProjectConfigError([
      { code: "SAB100", message: "Project configuration must be a mapping." },
    ]);
  }

  const rawConfig = config as RawProjectConfig;
  const name = requiredString(rawConfig.name, "name", diagnostics);
  const version = requiredString(rawConfig.version, "version", diagnostics);
  const language = optionalString(rawConfig.language, "language", diagnostics);
  const artifacts = normalizeArtifacts(
    rawConfig.artifacts,
    rootDirectory,
    diagnostics,
  );

  if (diagnostics.length > 0) {
    throw new ProjectConfigError(diagnostics);
  }

  return {
    name,
    version,
    ...(language === undefined ? {} : { language }),
    rootDirectory,
    artifacts,
  };
}

function parseProjectYaml(source: string): unknown {
  try {
    return parse(source);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid YAML.";
    throw new ProjectConfigError([{ code: "SAB101", message }]);
  }
}

function normalizeArtifacts(
  value: unknown,
  rootDirectory: string,
  diagnostics: ProjectDiagnostic[],
): Readonly<Record<string, ResearchArtifact>> {
  if (!isRecord(value)) {
    diagnostics.push({
      code: "SAB102",
      message: "artifacts must be a mapping.",
      path: "artifacts",
    });
    return {};
  }

  const normalized: Record<string, ResearchArtifact> = {};
  for (const [id, artifact] of Object.entries(value)) {
    if (!isRecord(artifact)) {
      diagnostics.push({
        code: "SAB103",
        message: `Artifact '${id}' must be a mapping.`,
        path: `artifacts.${id}`,
      });
      continue;
    }

    const rawArtifact = artifact as RawResearchArtifact;
    if (!isArtifactType(rawArtifact.type)) {
      diagnostics.push({
        code: "SAB104",
        message: `Artifact '${id}' must have one of: paper, presentation, poster, preprint.`,
        path: `artifacts.${id}.type`,
      });
      continue;
    }

    if (!/^[a-zA-Z0-9][a-zA-Z0-9_-]*$/.test(id)) {
      diagnostics.push({
        code: "SAB110",
        message: `Artifact id '${id}' must contain only letters, numbers, hyphens, and underscores.`,
        path: `artifacts.${id}`,
      });
      continue;
    }

    if (
      !Array.isArray(rawArtifact.sections) ||
      rawArtifact.sections.length === 0
    ) {
      diagnostics.push({
        code: "SAB105",
        message: `Artifact '${id}' must define at least one section.`,
        path: `artifacts.${id}.sections`,
      });
      continue;
    }

    const sections: ResearchSection[] = [];
    for (const [index, section] of rawArtifact.sections.entries()) {
      if (
        typeof section !== "string" ||
        section.length === 0 ||
        isAbsolute(section)
      ) {
        diagnostics.push({
          code: "SAB106",
          message: `Section ${index} of artifact '${id}' must be a non-empty relative path.`,
          path: `artifacts.${id}.sections[${index}]`,
        });
        continue;
      }

      const sectionPath = resolve(rootDirectory, section);
      const relativePath = relative(rootDirectory, sectionPath);
      if (relativePath.startsWith("..") || isAbsolute(relativePath)) {
        diagnostics.push({
          code: "SAB107",
          message: `Section '${section}' must remain inside the project directory.`,
          path: `artifacts.${id}.sections[${index}]`,
        });
        continue;
      }

      sections.push({ id: section, path: section });
    }

    if (sections.length > 0) {
      normalized[id] = { id, type: rawArtifact.type, sections };
    }
  }

  return normalized;
}

function isArtifactType(value: unknown): value is ArtifactType {
  return (
    value === "paper" ||
    value === "presentation" ||
    value === "poster" ||
    value === "preprint"
  );
}

function requiredString(
  value: unknown,
  path: string,
  diagnostics: ProjectDiagnostic[],
): string {
  if (typeof value !== "string" || value.length === 0) {
    diagnostics.push({
      code: "SAB108",
      message: `${path} must be a non-empty string.`,
      path,
    });
    return "";
  }

  return value;
}

function optionalString(
  value: unknown,
  path: string,
  diagnostics: ProjectDiagnostic[],
): string | undefined {
  if (value === undefined) {
    return undefined;
  }

  if (typeof value !== "string" || value.length === 0) {
    diagnostics.push({
      code: "SAB109",
      message: `${path} must be a non-empty string when provided.`,
      path,
    });
    return undefined;
  }

  return value;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
