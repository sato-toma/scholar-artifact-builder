# Development Units

A development unit is a small, independently understandable area of work. A
unit may contain several implementation tasks, but it should have one clear
purpose and one verifiable outcome.

## Units

| Unit | Purpose | Initial status |
|---|---|---|
| [00 Minimal POC Slice](./00-minimal-poc-slice.md) | Prove the smallest deterministic path from local sources to a generated artifact. | In progress |
| [01 Foundation](./01-foundation.md) | Establish only the workspace conventions needed by the POC. | In progress |
| [02 Project Model](./02-project-model.md) | Define and load the smallest format-independent research model. | In progress |
| [03 CLI and Validation](./03-cli-validation.md) | Provide only the POC commands and deterministic diagnostics. | Planned |
| [04 Rendering and Build](./04-rendering-build.md) | Generate a Markdown paper without external document tools. | Planned |
| [05 Traceability and Reproducibility](./05-traceability-reproducibility.md) | Add provenance, manifests, and dependency information. | Future |
| [06 Integrations and AI](./06-integrations-ai.md) | Add optional integrations after the deterministic core is proven. | Future |
| [07 Early Dissemination Artifacts](./07-early-dissemination-artifacts.md) | Build early presentations, posters, and preprint drafts from shared research materials. | In progress |

Unit 07 is a follow-up to the minimal deterministic build, not an expansion of
its acceptance criteria. It should support artifacts independently: an early
presentation does not require a complete paper, and a poster does not require
an arXiv-targeted preprint (or vice versa).

## Unit Template

Every unit should describe:

- Goal
- In scope
- Out of scope
- Inputs and outputs
- Work items
- Verification
- Open questions
- Exit criteria

A unit is complete only when its exit criteria are met and its verification
steps are recorded.
