# Development Unit 02: Project Model

## Goal

Represent the smallest research project independently from its generated
Markdown artifact.

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

1. Define the smallest project and artifact data structures.
2. Decide which fields are required for the PoC.
3. Add schemas or equivalent validation contracts.
4. Implement loading and normalization.
5. Add valid and invalid fixtures.
6. Document fields that are provisional.

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

The first renderer can receive a stable intermediate representation, and model
validation failures are understandable to a project user. The model is small
enough to change without a migration system. The current POC fixture loads
successfully, and invalid artifact types and paths are rejected by tests.
