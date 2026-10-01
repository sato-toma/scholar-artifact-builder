# ADR 0001: PoC Boundaries and Minimal Architecture

- Status: Accepted for the PoC
- Date: 2026-10-01
- Scope: First implementation only

## Context

The project aims to build reproducible scholarly artifacts from research
materials. The long-term design includes multiple renderers, provenance,
experiments, AI adapters, and external integrations. Choosing all of those
interfaces before implementing a small end-to-end path would create premature
constraints.

The PoC needs enough structure to test the central idea: one local research
project can be validated and transformed into a scholarly artifact.

## Decisions

1. The PoC targets a local-first workflow.
2. The implementation direction is Node.js and TypeScript, as stated in the
   main development plan.
3. The CLI is the first user interface.
4. The research model and intermediate representation must remain separate from
   any output format.
5. AI and network services are optional and must not be required to validate or
   build the PoC.
6. The first end-to-end path is a Markdown-based paper build with basic
   references and figures.

## Deliberately Undecided

This ADR does not choose:

- A package manager.
- A CLI framework.
- A schema library or validation implementation.
- A PDF, LaTeX, or document conversion tool.
- A monorepo tool.
- A database or hosted service.
- An AI provider.
- A final public API or plugin protocol.

These choices should be made only when a development unit needs them. The
choice should be recorded in a new ADR or an amendment with implementation
evidence.

## Consequences

### Positive

- The PoC tests the core value with a small surface area.
- The project remains portable and usable without network access.
- Future renderers can be added without making one format the source of truth.
- AI-related risk is isolated from the deterministic build path.

### Negative

- Some early interfaces may change after the PoC.
- Temporary adapters may be replaced.
- The first build will not cover the full research graph described in the vision.

## Revisit Conditions

Revisit this ADR when:

- The first end-to-end paper build passes its acceptance criteria.
- A second renderer or artifact type is implemented.
- A public plugin boundary is required.
- An external service becomes necessary for a user workflow.
