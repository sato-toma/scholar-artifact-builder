---
name: scholar-development-planning
description: "Plan or implement a scholar-artifact-builder development unit. Use when selecting a unit, defining PoC scope, updating exit criteria, recording an architectural decision, or preparing the next AI agent to continue work."
argument-hint: "[development unit or task]"
user-invocable: true
disable-model-invocation: false
---

# Scholar Development Planning

## When to Use

Use this skill for work that changes project scope, development-unit plans,
PoC boundaries, architecture, AI workflow guidance, or acceptance criteria.

## Procedure

1. Read `DEVELOPMENT_PLAN.md`.
2. Read `docs/development-units/README.md` and the closest unit plan.
3. Check related ADRs in `docs/adr/`.
4. Identify the smallest development unit that owns the requested behavior.
5. State one falsifiable local hypothesis and one focused verification.
6. Keep unresolved technology choices open unless implementation evidence requires a decision.
7. Implement the smallest change that satisfies the unit's goal.
8. Run the narrowest available validation.
9. Update the unit plan, exit criteria, or ADR when the work changes them.
10. Report changed files, validation, and remaining open questions.

## Documentation Format

- Use bullet points for scope, outputs, work items, verification, and exit criteria.
- Keep explanatory paragraphs short and focused.
- Treat English development plans as canonical.
- When Japanese documentation is requested, create a concise derivative that explains the same scope.
- Mark Japanese derivatives as non-normative and keep them synchronized with the English plan.

## Planning Rules

- Keep the deterministic local build independent from AI and network services.
- Do not turn a future feature into a PoC requirement.
- Add a new ADR when a decision affects public boundaries, portability, privacy, or reproducibility.
- Prefer an amendment over silently changing an existing ADR.
- Keep development units independently understandable and testable.
