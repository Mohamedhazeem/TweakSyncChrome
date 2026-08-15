# Spec Kit Workflow

This repo uses a Spec Kit SDD workflow (commands in `.kilo/commands/`, catalog in
`agents.md`).

## Pipelines

- New feature → `/speckit.specify` → (optional `/speckit.clarify`) → `/speckit.plan`
  → `/speckit.tasks` → `/speckit.analyze` (read-only gate) → `/speckit.implement`.
- Small change (1–5 files) → `/speckit.tinyspec.classify` to route to tinyspec vs. full SDD.

## Rules

- Every agent loads `.specify/memory/constitution.md`; a constitution conflict is a
  **CRITICAL** finding in `/speckit.analyze` and must be resolved by changing the code,
  not the principle.
- Don't run hooks' `condition` expressions yourself; mandatory `before_*`/`after_*`
  extension hooks are handled by the HookExecutor.
