# ADR 0002: Minimal Markdown POC Output

- Status: Accepted for the POC
- Date: 2026-10-01
- Scope: Development Unit 00 only

## Context

The original long-term plan includes PDF, LaTeX, citations, figures,
provenance, and several external tools. Implementing those features in the
first slice would make it difficult to tell whether a failure comes from the
research model or from an external document tool.

The POC needs to test the central transformation from a local research project
to a generated artifact. Markdown is sufficient to inspect that transformation
and does not require a global tool installation.

## Decision

The first POC output is a deterministic Markdown file:

```text
project.yaml + research/*.md -> build/paper.md
```

The POC will include only the commands and model fields required for this
path. PDF, LaTeX, BibTeX, figures, tables, equations, provenance, and external
integrations are deferred.

## Why This Is Minimal

This slice still tests the essential boundaries:

- Project configuration loading.
- A format-independent research model.
- Validation before generation.
- A renderer that consumes the model.
- CLI orchestration.
- Deterministic output.

It removes dependencies that are not necessary to test those boundaries.

## Consequences

### Positive

- The POC is locally runnable with few prerequisites.
- Failures are easier to attribute to the project model or builder.
- The generated output is easy to inspect and compare in tests.
- The model can be extended after the first workflow is proven.

### Negative

- The POC does not prove PDF production or publication-quality layout.
- Citation and figure handling remain untested.
- Some interfaces will change when later renderers are added.

## Revisit Conditions

Revisit this ADR after the POC exit criteria pass. Add a new ADR before
introducing an external document tool or changing the model boundary for a
second output format.
