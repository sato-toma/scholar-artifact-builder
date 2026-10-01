# Development Unit 05: Traceability and Reproducibility

## Goal

Make generated content explainable and rebuilds auditable after the PoC.

## In Scope

- Claims and evidence.
- Source locations and provenance.
- Figures, tables, equations, and experiment metadata.
- Dependency information.
- Build manifests and input fingerprints.
- Incremental rebuild analysis.

## Out of Scope

- Replacing Git, Jupyter, LaTeX, or reference managers.
- A hosted provenance database.
- Automatic acceptance of unsupported claims.

## Expected Outputs

- A claim can be traced to evidence.
- An artifact can report the sources it uses.
- A manifest records enough information to explain a build.
- A dependency graph can identify potentially affected artifacts.

## Work Items

1. Define stable identifiers and relationship rules.
2. Preserve source locations during parsing.
3. Add provenance to the intermediate representation.
4. Record builder, template, tool, and Git information when available.
5. Add dependency graph inspection.
6. Add stale and unsupported-content diagnostics.

## Verification

- Trace a fixture claim to a source and an artifact.
- Change one input and identify affected outputs.
- Test builds without Git or optional tools.
- Confirm provenance does not change research source files.

## Open Questions

- The exact provenance storage format.
- Content hashing and timestamp policy.
- Whether incremental builds belong in the first stable release.

## Exit Criteria

Traceability and reproducibility improve the build without becoming a required
cloud service or forcing a final schema too early.
