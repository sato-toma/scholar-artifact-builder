# ADR 0003: Draft Artifacts from Shared Research Sources

- Status: Accepted for the exploratory Markdown implementation
- Date: 2026-10-04
- Scope: Development Unit 07; revisit after Unit 00 passes

## Context

Researchers may prepare presentation material while results are still
preliminary. Posters and preprints may be prepared later, but there is no
universal order among these outputs. Requiring a poster or a complete paper
before building a presentation would make the initial workflow unnecessarily
rigid.

The project model currently maps an artifact to ordered local Markdown source
paths. The first implementation needs to test whether the same research files
can support independently selected communication drafts without external tools.

## Decision

- Support `paper`, `presentation`, `poster`, and `preprint` artifact types.
- Let each artifact select and order its own research source files.
- Write deterministic Markdown outputs to `build/<artifact-id>.md`.
- Render a presentation with Markdown slide separators between selected
  sources. Render poster and paper/preprint content as readable Markdown drafts.
- Treat each artifact as independent. No artifact requires another to exist or
  be built first.
- Define `preprint` as manuscript content that may be prepared for arXiv; it is
  not an arXiv submission package and does not claim platform compliance.
- Keep all builds local and deterministic, without AI, network access, PDF
  tooling, or publication-specific templates.

## Consequences

### Positive

- A presentation can use only the research material currently available.
- One project can produce several drafts without copying their source content.
- The example can be tested offline with byte-for-byte repeated builds.

### Negative

- Markdown drafts do not provide publication-ready visual design.
- Title, author, citation, figure, and venue metadata are not yet modeled.
- The artifact model now has multiple types before the minimal POC is complete.

## Revisit Conditions

Revisit after Unit 00 passes. Confirm the model boundary, decide which shared
metadata belongs in the research model, and determine whether later renderers
should produce Marp, PDF, LaTeX, or other publication formats.
