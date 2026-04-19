# Claude Code Stack (Personal Sandbox)

This is my personal workspace for testing and refining [Claude Code](https://code.anthropic.com/) configurations. I use this repository to organize my project instructions, rules, and agentic workflows.

## 🚀 Quick Bootstrap

You can initialize any project with this setup using a single command.

### Bun (Recommended)
```bash
bun run https://raw.githubusercontent.com/szerookii/claude-code-stack/main/setup.js
# OR
bun -e "fetch('https://raw.githubusercontent.com/szerookii/claude-code-stack/main/setup.js').then(r=>r.text()).then(eval)"
```

### Node.js (18+)
```bash
node -e "fetch('https://raw.githubusercontent.com/szerookii/claude-code-stack/main/setup.js').then(r=>r.text()).then(eval)"
```

## 🎯 Main Features

This setup automates the repetitive parts of project initialization:

- **Interactive Setup**: A CLI to pick exactly which rules and **custom skills** to apply.
- **Environment Check**: Verifies if Claude Code is installed and helps set it up.
- **Skill Laboratory**: Optional integration for experimental tools:
  - `caveman`: Token compression for terser communication.
  - `cavemem`: Local memory for cross-session context.
  - `ui-ux-pro-max`: Design intelligence for UI generation.
- **Structured Knowledge**: 10+ rule files (`.claude/rules/`) and custom skills (`.claude/skills/`).

## 🤖 Agentic Workflow

This configuration transforms Claude into an orchestrator:

1. **Strategic Delegation**: Research is handled by `codebase_investigator`, and batch tasks (3+ files) by the `generalist` sub-agent.
2. **On-Demand Skills**: Custom skills like `/atomic-commit` are loaded only when needed to save context.
3. **Context Sync**: Uses `cavemem` to maintain facts and decisions across sessions.

## 🛠️ Rule & Skill Arsenal

| Rule/Skill | Focus |
| :--- | :--- |
| **atomic-commit** (Skill) | Logical breakdown of changes into atomic commits. |
| **typescript.md** | Type safety and Svelte 5 Runes. |
| **svelte.md** | SvelteKit patterns and Tailwind tokens. |
| **golang.md** | Idiomatic Go and error handling. |
| **security.md** | Basic security standards and validation. |
| **performance.md** | Optimization and resource efficiency. |
| **database.md** | Migrations and indexing. |
| **testing.md** | Table-driven tests (Go) and Vitest (TS). |
| **devops.md** | Docker builds and CI workflows. |
| **prisma.md** / **drizzle.md** | ORM schema patterns and best practices. |

## 📄 License

MIT © [szerookii](https://github.com/szerookii)
