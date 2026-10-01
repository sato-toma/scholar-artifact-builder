# Development Unit 06: Integrations and AI

## Goal

Add optional integrations only after the local deterministic pipeline is useful.

## In Scope

- Optional GitHub and Jupyter adapters.
- Optional AI adapters for organization, drafting, and analysis.
- VS Code and MCP integrations as separate consumers of the CLI or model.
- Explicit privacy and network-access reporting.

## Out of Scope

- Making AI required for validation or building.
- Silent changes to source data, references, equations, or results.
- A cloud backend required by local projects.
- A general-purpose AI chatbot.

## Expected Outputs

- The core build remains usable offline.
- AI-generated content is labeled and reviewable.
- External integrations can be disabled without breaking the core.
- Credentials never enter generated artifacts or build logs.

## Work Items

1. Define adapter boundaries after the core interfaces stabilize.
2. Add explicit opt-in configuration for network access.
3. Classify content as source, derived, generated, or unverified.
4. Add human review checkpoints for generated research content.
5. Test the same project with integrations disabled.

## Verification

- Build and validate with no provider credentials.
- Verify network access is visible and configurable.
- Verify generated content carries its origin and review state.
- Verify secrets are excluded from logs and artifacts.

## Open Questions

- Which providers or protocols are worth supporting.
- Whether AI features need a separate package or command group.
- Which integration should be implemented first.

## Exit Criteria

Integrations are useful but optional, and they do not weaken deterministic
builds, provenance, privacy, or reproducibility.
