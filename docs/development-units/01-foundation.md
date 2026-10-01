# Development Unit 01: Foundation

## Goal

Create only the small, portable workspace needed to run the deterministic POC.

## In Scope

- Node.js and TypeScript project setup.
- The minimum package scripts needed to run and test the POC.
- A small source layout that can be reorganized after the POC.
- Cross-platform path and process conventions.
- One minimal example project for integration tests.

## Out of Scope

- Selecting a final CLI framework.
- Selecting a PDF or LaTeX toolchain.
- AI providers, cloud services, and a web UI.
- Implementing the complete research model.
- Creating a production-ready monorepo structure.

## Expected Outputs

- A clean checkout can install dependencies.
- The repository has a repeatable check command.
- The example project has a documented directory structure.
- The initial package boundaries can change without a public API promise.

## Work Items

1. Create the package and TypeScript configuration.
2. Add the smallest useful source layout.
3. Add scripts for type-checking and tests.
4. Add the minimal example project and test fixture conventions.
5. Document only the commands needed to run the POC.

## Verification

- Run the install command from a clean checkout.
- Run the type-check and test commands.
- Defer formatting and linting until the POC exposes a concrete need for them.
- Run the same commands on Windows, Linux, and macOS in CI when CI exists.

## Open Questions

- Which package manager should be used?
- Is a monorepo tool needed, or are workspaces sufficient?
- Which test runner and formatter best fit the implementation?

These questions remain open until the PoC requires an answer.

## Exit Criteria

The repository can run the POC without hidden setup steps, and the required
type-check and test commands have documented commands. Formatting and linting
remain intentionally deferred for the POC.
