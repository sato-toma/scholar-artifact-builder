# Development Unit 02: Project Model

## Goal

Represent a research project independently from Markdown, LaTeX, Marp, HTML,
and PDF.

## In Scope

- Project configuration loading.
- Artifact definitions.
- Research materials and stable identifiers.
- A small intermediate representation for the first paper build.
- Schema validation boundaries.

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
validation failures are understandable to a project user.
