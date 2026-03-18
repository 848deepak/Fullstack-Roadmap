# Folder Naming Migration Plan (Safe Rollout)

## Migration Status (March 2026)

- ✅ Canonical folder created: `22_Bonus_Industry_Skills/`
- ✅ Root documentation updated to canonical path
- ✅ Legacy folder `03-bonus-industry-skills/` removed after link migration
- ✅ Empty legacy folder `01-javascript/` removed

This document defines a low-risk path to normalize folder naming while keeping existing links usable.

## Current Status

### Canonical (already good)
- Top-level modules follow `NN_Title_With_Underscores`:
  - `00_Fundamentals` ... `21_Real_World_Projects`
- Standard module subfolders follow `NN_snake_case`:
  - `01_code_examples`, `02_practice_problems`, `03_interview_questions`, `04_mini_project`, `05_advanced_deep_dive`

### Outliers
- None active after March 2026 cleanup.

## Target Naming

- Rename `03-bonus-industry-skills/` → `22_Bonus_Industry_Skills/`
- `01-javascript/` cleanup completed (folder removed)

Why `22_Bonus_Industry_Skills`:
- Preserves ordered roadmap model (`00` to `22`)
- Matches existing module naming convention
- Avoids collision with `03_JavaScript`

## Migration Strategy (No Broken Links)

### Phase 1: Prepare
1. Create new folder `22_Bonus_Industry_Skills/` with same content.
2. Keep `03-bonus-industry-skills/` in place temporarily.
3. Update all root docs to point to `22_Bonus_Industry_Skills/`.

### Phase 2: Compatibility Window
1. (Completed) Temporary compatibility period used during migration.
2. (Completed) Canonical path communicated in root docs.
3. If hosting docs externally, optionally add redirect rules from old path to new path.

### Phase 3: Cleanup
1. ✅ Removed stale active links to `03-bonus-industry-skills/`.
2. ✅ Removed legacy folder after migration.
3. ✅ Removed empty `01-javascript/` after final search validation.

## Validation Checklist

Run these checks before and after rename:

- Search for old path references:
  - `03-bonus-industry-skills`
  - `01-javascript`
- Verify all markdown links resolve in VS Code preview.
- Verify README navigation still works from repository root.

## Suggested Commands (when you choose to execute)

```bash
# From fullstack/
mkdir -p 22_Bonus_Industry_Skills
# copy content from legacy folder to new folder
cp -R 03-bonus-industry-skills/* 22_Bonus_Industry_Skills/

# then update references in docs before deleting old folder
```

## Recommendation

- Keep this as a planned migration (safe + reversible).
- Do not force an immediate folder rename in one shot unless all downstream references are automatically updated and validated.
