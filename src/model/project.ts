export interface ResearchSection {
  readonly id: string;
  readonly path: string;
}

export type ArtifactType = "paper" | "presentation" | "poster" | "preprint";

export interface ResearchArtifact {
  readonly id: string;
  readonly type: ArtifactType;
  readonly sections: readonly ResearchSection[];
}

export interface ResearchProject {
  readonly name: string;
  readonly version: string;
  readonly language?: string;
  readonly rootDirectory: string;
  readonly artifacts: Readonly<Record<string, ResearchArtifact>>;
}

export interface ProjectDiagnostic {
  readonly code: string;
  readonly message: string;
  readonly path?: string;
}

export class ProjectConfigError extends Error {
  readonly diagnostics: readonly ProjectDiagnostic[];

  constructor(diagnostics: readonly ProjectDiagnostic[]) {
    super(
      diagnostics
        .map((diagnostic) => `${diagnostic.code}: ${diagnostic.message}`)
        .join("\n"),
    );
    this.name = "ProjectConfigError";
    this.diagnostics = diagnostics;
  }
}
