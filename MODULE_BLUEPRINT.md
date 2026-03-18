# Module Blueprint (Used Across 00–21)

This repository follows a unified learning architecture for every module.

## Required Folder Structure

```text
<module>/
├── README.md
├── 01_code_examples/
│   └── README.md
├── 02_practice_problems/
│   └── README.md
├── 03_interview_questions/
│   └── README.md
├── 04_mini_project/
│   └── README.md
└── 05_advanced_deep_dive/
    └── README.md
```

## README Quality Standard

Each module README should include:
1. Concept overview
2. Theory from scratch
3. Internal working (under the hood)
4. Why used in production systems
5. Architecture diagram (ASCII or Mermaid)
6. Performance considerations
7. Security considerations
8. Common mistakes
9. Interview questions
10. Production best practices

## Content Style Standard

- Explain concepts for beginners first, then add advanced depth.
- Use practical examples that map to real engineering systems.
- Highlight trade-offs, not only happy-path implementation.
- Keep naming conventions and folder organization consistent.
- Add comments for both beginner understanding and advanced design rationale.

## Folder Naming Standard

- Top-level modules: `NN_Title_With_Underscores`.
    - Example: `03_JavaScript`, `06_NextJS`, `15_CI_CD`.
- Module blueprint subfolders: `NN_snake_case`.
    - Example: `01_code_examples`, `05_advanced_deep_dive`.
- Lesson/project subfolders can use `NN-kebab-case` for readability.
    - Example: `08-state-management-patterns`.
- Legacy naming exceptions should be listed and tracked in `FOLDER_NAMING_MIGRATION_PLAN.md`.

## Portfolio Readiness Standard

Each mini project should contain:
- Problem statement
- Architecture/design notes
- Setup and run instructions
- Testing strategy
- Performance and security checklist
- What to improve next
