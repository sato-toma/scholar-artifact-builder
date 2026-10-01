# Development Unit 01: Foundation

## Goal

Create a small, portable workspace that can host the deterministic builder.

## In Scope

- Node.js and TypeScript project setup.
- Package scripts for formatting, linting, type-checking, and tests.
- Initial package boundaries aligned with the existing plan.
- Cross-platform path and process conventions.
- A minimal example project for integration tests.

## Out of Scope

- Selecting a final CLI framework.
- Selecting a final PDF or LaTeX toolchain.
- AI providers, cloud services, and a web UI.
- Implementing the complete research model.

## Expected Outputs

- A clean checkout can install dependencies.
- The repository has a repeatable check command.
- The example project has a documented directory structure.
- The initial package boundaries can change without a public API promise.

## Work Items

1. Create the package and TypeScript configuration.
2. Add the smallest useful package layout.
3. Add scripts for formatting, linting, type-checking, and testing.
4. Add the minimal example project and test fixture conventions.
5. Document commands and supported Node.js versions.

## Verification

- Run the install command from a clean checkout.
- Run formatting, linting, type-checking, and tests.
- Run the same commands on Windows, Linux, and macOS in CI when CI exists.

## Open Questions

- Which package manager should be used?
- Is a monorepo tool needed, or are workspaces sufficient?
- Which test runner and formatter best fit the implementation?

These questions remain open until the PoC requires an answer.

## Exit Criteria

The repository can accept the first implementation without hidden setup steps,
and all baseline checks have documented commands.
