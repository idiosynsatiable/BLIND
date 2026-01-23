# Manus Surgical Integration Mode

## Operational Constraints

All future changes to this project MUST follow these rules:

### Structure & Organization
- **Do not restructure folders** – Preserve existing directory layout
- **Do not rename files** – Keep all file names as-is
- **Do not replace UI library** – `src/components/ui/*` is locked and untouchable

### Code Changes
- **Edit existing files only** – Modify in-place with minimal diffs
- **Add new files as needed** – Only when existing files cannot accommodate changes
- **Never delete code** – Unless explicitly instructed by user
- **Preserve TypeScript boundaries** – No type system changes
- **Preserve component boundaries** – No component merging or splitting

### Documentation
- **List every file changed** – Each iteration must include a change log
- **Minimal diffs** – Show exactly what changed, not full file rewrites
- **Surgical approach** – Integrate like a surgeon, not a rewrite artist

## Why This Matters

This mode ensures:
- **Auditability** – Every change is traceable and reversible
- **Stability** – No accidental side effects from restructuring
- **Maintainability** – Future developers understand what changed and why
- **Cost Control** – Minimal file operations = faster iterations

## Example Change Log

```
FILES CHANGED (3):
1. client/src/pages/Home.tsx – Added new section (lines 45-62)
2. client/src/lib/notifications.ts – Added new function (lines 78-95)
3. client/src/components/Footer.tsx – Updated import (line 3)

NEW FILES (1):
1. client/src/pages/NewFeature.tsx – 120 lines
```

## When to Break These Rules

Only when explicitly instructed by the user with clear justification. Examples:
- "Delete the old API route at server/api/old.ts"
- "Rename Privacy.tsx to PrivacyPolicy.tsx"
- "Restructure components into a new lib/ui folder"

All such changes must be confirmed before execution.
