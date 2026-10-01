# Development Unit 02: Project Model

## Goal

- Represent the smallest research project independently from generated Markdown.
- Keep the model independent from YAML, Markdown, LaTeX, and PDF.

## In Scope

- Project configuration loading.
- One paper artifact definition.
- Markdown research materials and stable source identifiers.
- A small intermediate representation for the POC paper.
- Validation boundaries that can evolve later.

## Out of Scope

- A complete claim/evidence graph.
- Automatic literature analysis.
- Database storage.
- A public API stability promise.

## Expected Outputs

- A valid project can be loaded into an internal model.
- Invalid configuration produces a structured diagnostic.
- Renderers consume the model rather than reading source files directly.
- The model preserves source locations where practical.
- The model does not require LaTeX, PDF, AI, or network services.

## Current POC Model

The current implementation supports:

- Project `name`, `version`, and optional `language`.
- Paper artifacts with an `id`, `type`, and ordered section paths.
- Relative section paths that remain inside the project directory.
- Structured diagnostics for invalid project configuration.

Claims, evidence, references, figures, and generated content are deliberately
not part of this model yet.

For a Japanese explanation of the model background and boundaries, see
[02-project-model.ja.md](./02-project-model.ja.md).

## Work Items

- Define the smallest project and artifact data structures.
- Decide which fields are required for the POC.
- Add schemas or equivalent validation contracts.
- Implement loading and normalization.
- Add valid and invalid fixtures.
- Document provisional fields.

## Verification

- Load the minimal example project.
- Reject malformed configuration and duplicate identifiers.
- Snapshot the normalized model for a small fixture.
- Confirm that a renderer can consume the model without Markdown-specific logic.

## Open Questions

- YAML, JSON, or another human-readable configuration format.
- Whether schemas are JSON Schema files, code-first types, or both.
- How much Markdown structure belongs in the first model.

## Exit Criteria

- A renderer can receive a stable intermediate representation.
- Model validation failures are understandable to a project user.
- The model is small enough to change without a migration system.
- The POC fixture loads successfully.
- Invalid artifact types and paths are rejected by tests.
