# Development Unit 00: Minimal POC Slice

## Goal

Prove the central workflow with the smallest useful implementation:

```text
project.yaml + research/*.md
        |
        v
  research model
        |
        v
  validation
        |
        v
build/paper.md
```

The POC should answer one question: can a local research project be converted
into a deterministic scholarly artifact without AI, network access, or a
specialized document tool?

## In Scope

- A project configuration file.
- A paper artifact definition with ordered sections.
- Markdown research source files.
- A small format-independent research model.
- Basic validation of configuration, paths, and section references.
- `sab init`.
- `sab validate`.
- `sab build paper`.
- `sab clean`.
- A Markdown renderer.
- A generated `build/paper.md` file.

## Out of Scope

- PDF and LaTeX.
- BibTeX and external citation services.
- Figures, tables, and equations as structured entities.
- Claims, evidence, experiments, and provenance.
- Incremental builds and build manifests.
- AI, cloud services, GitHub, Jupyter, VS Code, and MCP integrations.
- A stable public plugin API.

## Minimal Example

```text
example-project/
├── project.yaml
├── research/
│   ├── overview.md
│   └── method.md
└── build/
    └── paper.md
```

Example commands:

```bash
sab init example-project
sab validate --project example-project
sab build paper --project example-project
```

## Implementation Order

1. Create the smallest Node.js and TypeScript workspace.
2. Load and validate `project.yaml`.
3. Load the configured Markdown sections into a format-independent model.
4. Add `sab init` and `sab validate`.
5. Render the model to `build/paper.md`.
6. Add `sab build paper` and `sab clean`.
7. Add valid, invalid, repeated-build, and missing-input tests.

## Focused Verification

The POC is successful when:

- A new project can be initialized locally.
- A valid fixture passes validation.
- An invalid section path produces a clear non-zero failure.
- The generated paper contains the configured sections in order.
- Two builds from unchanged inputs produce identical `paper.md` content.
- The workflow works with AI providers and network access disabled.

## Exit Criteria

The focused verification passes and the result is documented with the exact
commands used. Any technology choice made during implementation is either
local to the POC or recorded in a follow-up ADR.

## Next Slice

Only after this unit passes should the project evaluate adding references,
figures, PDF output, or richer traceability. Each addition should be tested as
a separate development unit rather than expanding this POC retroactively.
