# Development Unit 07: Early Dissemination Artifacts

- Status: In progress; Markdown drafts are an exploratory implementation.

## Goal

Let one local research project produce useful presentation material before a
complete manuscript exists, then produce a conference poster or preprint draft
from the same research materials when each is ready.

These outputs are independent views, not mandatory steps in a fixed sequence.

## In Scope

- One example project with shared research materials and separate definitions for:
  - An early research presentation.
  - A conference poster.
  - A preprint manuscript draft intended for possible arXiv submission.
- Deterministic, inspectable content outputs that work offline.
- Independent source selection for each artifact, so incomplete research can
  still produce an early presentation.
- Clear validation for artifact type, selected sources, and required content.
- CLI builds for each supported artifact.

## Out of Scope

- Requiring a completed paper before building a presentation or poster.
- Treating a poster as a required step before a preprint, or a preprint before a poster.
- arXiv upload, submission packages, or guarantees of platform compliance.
- Publication-ready PDF, LaTeX, PowerPoint, or venue-specific visual layouts.
- AI-generated research claims or automatic completion of missing results.
- References, figures, and provenance unless a separate unit establishes those capabilities.

## Expected Inputs

- A project configuration.
- Shared, local research materials such as an overview, problem statement,
  method, and any available results.
- Independent artifact definitions that select appropriate material for each
  output.

## Expected Outputs

- An early presentation draft that can be built from available material without
  requiring final results or a complete manuscript.
- A poster content draft built from its own selected material.
- A preprint manuscript draft built from its own selected material.
- Repeated builds from unchanged inputs produce identical outputs.

The initial outputs should be inspectable local documents. Their precise
Markdown conventions and whether a later renderer produces publication formats
remain implementation questions. The preprint is manuscript content, not an
arXiv upload bundle.

## Work Items

1. Record the provisional model-boundary decision in [ADR 0003](../adr/0003-draft-artifacts.md)
  and revisit it after the minimal POC passes.
2. Extend the project model with only the artifact distinctions and metadata
   required by the example workflow.
3. Define how each artifact selects and orders shared research material.
4. Implement deterministic content renderers and CLI build targets.
5. Add an example project and focused tests for valid, missing, and partial
   research inputs.
6. Confirm each artifact can be built independently and repeated builds match.

## Verification

- Build the presentation while result material is absent or marked unavailable.
- Build the poster and preprint independently from the same project.
- Confirm outputs include only the material selected for that artifact.
- Confirm missing required inputs fail with actionable diagnostics.
- Build each output twice and compare its content.
- Run all checks without AI providers, network access, or external document tools.

## Open Questions

- Which Markdown conventions best represent slides and poster content while
  keeping outputs readable without a specialized renderer?
- Which title, author, date, and section metadata should be shared versus
  artifact-specific?
- Which arXiv-specific packaging and format checks, if any, belong in a later
  unit?
- Should incomplete material be omitted, labeled as preliminary, or cause a
  validation warning for each artifact type?

## Exit Criteria

- The example project builds an early presentation without a completed paper.
- Poster and preprint drafts build independently from shared research materials.
- The project does not enforce a fixed presentation, poster, and preprint order.
- Builds are deterministic, offline, and covered by focused tests.
- Any model-boundary change is recorded in an ADR before it becomes a project
  convention.
