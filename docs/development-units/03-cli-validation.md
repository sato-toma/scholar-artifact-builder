# Development Unit 03: CLI and Validation

## Goal

Provide the smallest CLI that can initialize, validate, and build the POC.

## In Scope

- `sab init`.
- `sab validate`.
- `sab build paper`.
- `sab clean`.
- Clear exit codes and diagnostics.

## Out of Scope

- `sab inspect`, `sab doctor`, and other convenience commands.
- Interactive project editing.
- Remote services.
- Full static analysis of research claims.
- Build orchestration beyond what the PoC needs.

## Expected Outputs

- A new project skeleton can be created locally.
- Validation reports file paths and stable diagnostic identifiers.
- Generated output can be removed without touching research sources.
- Commands work from a project directory or an explicit project path.

## Work Items

1. Define command names and minimal options.
2. Implement project discovery and explicit project paths.
3. Add validation stages for configuration, files, and references.
4. Define error and warning behavior.
5. Add command-level tests and invalid fixtures.
6. Document the POC CLI examples.

## Verification

- Run `sab init` in a temporary directory.
- Validate a correct fixture.
- Validate fixtures with missing files, duplicate IDs, and invalid references.
- Check non-zero exit codes for errors.
- Confirm `sab clean` only removes generated files.

## Open Questions

- CLI framework and output formatting library.
- Whether diagnostics should support JSON in the PoC.
- Exact naming and numbering of diagnostic codes.

## Exit Criteria

A user can initialize a project, identify basic problems, build a Markdown
paper, and clean generated output without reading implementation details.
