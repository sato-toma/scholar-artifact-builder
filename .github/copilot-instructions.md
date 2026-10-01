# Project Instructions

## Project Context

This repository contains scholar-artifact-builder, a local-first system for
building reproducible scholarly artifacts from structured research materials.
Read `DEVELOPMENT_PLAN.md` and the relevant document in
`docs/development-units/` before making architectural changes.

## Working Rules

- Keep the core build deterministic and usable without AI or network access.
- Keep the research model independent from Markdown, LaTeX, Marp, HTML, and PDF.
- Treat external tools as optional adapters unless an ADR says otherwise.
- Prefer small, testable changes that match one development unit.
- Do not make broad technology choices without implementation evidence.
- Record a PoC-level architectural decision in `docs/adr/` when a choice affects boundaries or portability.
- Keep documentation in English unless the user explicitly requests another language.
- Keep comments concise and in English.
- Preserve user changes and avoid unrelated refactoring.

## Before Editing

1. Identify the relevant development unit.
2. Read its open questions and exit criteria.
3. State one local hypothesis about the change and one focused verification.
4. Make the smallest edit that can test the hypothesis.

## After Editing

- Run the narrowest available test, type-check, lint, or documentation check.
- Keep generated files under `build/`.
- Do not add AI, cloud, or integration requirements to the deterministic path.
- Update the relevant development-unit plan when scope or exit criteria change.
