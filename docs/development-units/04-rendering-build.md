# Development Unit 04: Rendering and Build

## Goal

Build one deterministic paper artifact from local research materials.

## In Scope

- Markdown source parsing.
- Basic references and figures.
- A format-independent intermediate representation.
- Markdown output for debugging.
- One paper renderer and a PDF adapter.
- `sab build paper`.
- Build logs and a basic manifest.

## Out of Scope

- Multiple artifact types.
- Incremental builds.
- AI-generated content.
- Automatic experiment execution.
- A required global installation of external tools.

## Expected Inputs

```text
project.yaml
research/*.md
references/references.bib
figures/*
artifacts/paper.yaml
```

## Expected Outputs

```text
build/paper.pdf
build/manifest.json
```

## Work Items

1. Parse the supported source subset.
2. Resolve references and figure paths.
3. Create the intermediate representation.
4. Render a readable Markdown form for debugging.
5. Render the paper through an adapter.
6. Record inputs, versions, and output paths in the manifest.
7. Add repeated-build and missing-tool tests.

## Verification

- Build the minimal example project twice.
- Confirm the expected sections, citations, and figures are present.
- Fail clearly when an input or required adapter is missing.
- Compare normalized build information across repeated builds.

## Open Questions

- Which PDF path is most portable for the PoC.
- Whether the first artifact should be PDF, Markdown, or both.
- How templates expose layout without coupling the model to a renderer.

## Exit Criteria

The First Implementation Milestone in `DEVELOPMENT_PLAN.md` passes without an
AI provider or hosted service.
