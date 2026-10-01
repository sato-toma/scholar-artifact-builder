# Development Unit 04: Rendering and Build

## Goal

Build one deterministic Markdown paper artifact from local research materials.

## In Scope

- Markdown source parsing.
- Basic section ordering and source inclusion.
- A format-independent intermediate representation.
- One Markdown paper renderer.
- `sab build paper`.
- A minimal build result under `build/`.

## Out of Scope

- PDF, LaTeX, BibTeX, and external document tools.
- Multiple artifact types.
- Incremental builds and build manifests.
- AI-generated content.
- Automatic experiment execution.
- A required global installation of external tools.

## Expected Inputs

```text
project.yaml
research/*.md
references/references.bib
artifacts/paper.yaml
```

## Expected Outputs

```text
build/paper.md
```

## Work Items

1. Parse the supported source subset.
2. Resolve source paths and section order.
3. Create the intermediate representation.
4. Render a readable Markdown form for debugging.
5. Render the paper as Markdown.
6. Add repeated-build and missing-input tests.

## Verification

- Build the minimal example project twice.
- Confirm the expected sections and source content are present.
- Fail clearly when an input is missing.
- Compare generated Markdown across repeated builds.

## Open Questions

- Which PDF path is most portable after the PoC.
- Whether references and figures should enter the next slice or remain adapters.
- How templates expose layout without coupling the model to a renderer.

## Exit Criteria

The minimal POC slice in `00-minimal-poc-slice.md` passes without an AI
provider, hosted service, PDF tool, or other external document tool.
