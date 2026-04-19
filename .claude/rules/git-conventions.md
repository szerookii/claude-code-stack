---
globs: ["**/*"]
description: Git conventions and atomic commit rules
---

# Git & Commits
- **Conventional Commits**: Use the [Conventional Commits](https://www.conventionalcommits.org/) specification (e.g., `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `test:`).
- **Atomic Commits**: Each commit must represent a single logical change. Split unrelated changes into separate, focused commits.
- **Message Content**: Focus on *why* a change was made, not *what* changed (the diff already shows that).
- **Imperative Mood**: Use the imperative mood in the subject line (e.g., "add feature" instead of "added feature").
- **Breaking Changes**: Clearly mark breaking changes with a `!` after the type or `BREAKING CHANGE:` in the footer.
- **No Global Add**: Avoid `git add .`. Explicitly stage files related to the specific atomic change.
- **Pre-commit Checks**: Ensure linting and tests pass before committing. Do not commit broken code.
