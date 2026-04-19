# Atomic Commit Skill

This skill provides a structured workflow for breaking down a large set of changes into clean, atomic, and logical Git commits.

## Workflow

When the user asks for an atomic commit or uses the `/atomic-commit` command, follow these steps:

### 1. Analysis
- Run `git status` to see which files are modified.
- Run `git diff` (or use `read_file` on modified files) to understand the semantic changes.
- Identify logical groups of changes (e.g., "Refactor: extracted component", "Fix: corrected API endpoint", "Style: updated buttons").

### 2. Planning
- Propose a plan to the user.
- List each proposed commit with:
    - The **type** (feat, fix, refactor, docs, chore, etc.).
    - A **short description** (imperative mood, "why" over "what").
    - The **list of files** included in that commit.

### 3. Execution (After User Approval)
- For each approved commit in the plan:
    1. Stage only the relevant files: `git add <files>`.
    2. Create the commit: `git commit -m "<type>: <description>"`.
    3. Verify success with `git status`.

## Standards
- **Conventional Commits**: Strictly follow the format `<type>: <description>`.
- **Atomicity**: Never mix unrelated changes (e.g., don't mix a bug fix with a new feature).
- **Imperative**: "add", not "added" or "adds".
- **No Global Add**: Do not use `git add .` unless the entire diff belongs to a single logical change.
- **No Co-Author**: Never add co-author field on the commit.
