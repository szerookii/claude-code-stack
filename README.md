# Claude Code Stack (Personal Sandbox)

This is my personal workspace for testing and refining [Claude Code](https://code.anthropic.com/) configurations. I use this repository to organize my project instructions, rules, and automation scripts.

## 🚀 Quick Bootstrap

I use this script to quickly initialize new or existing projects with my preferred configuration.

### Using Bun
```bash
bun run https://raw.githubusercontent.com/szerookii/claude-code-stack/main/setup.js
```

### Using Node.js
```bash
node -e "fetch('https://raw.githubusercontent.com/szerookii/claude-code-stack/main/setup.js').then(r=>r.text()).then(eval)"
```

## 🎯 Main Features

This setup is built to automate the repetitive parts of project initialization:

- **Interactive Setup**: A CLI to pick exactly which rules to apply to a project.
- **Environment Check**: Verifies if Claude Code is installed and helps set it up if needed.
- **Skill Integration**: Optional installation for my experimental tools:
  - `caveman`: Token compression for terser communication.
  - `cavemem`: Local memory for cross-session context.
  - `ui-ux-pro-max`: Design intelligence for UI generation.
- **Structured Rules**: 10+ rule files (`.claude/rules/`) formatted for Claude Code.

## 🤖 Agentic Workflow

This configuration encourages Claude to act as an orchestrator by using delegation:

1. **Strategic Delegation**: Deep research is handled by `codebase_investigator`, and batch tasks (3+ files) by the `generalist` sub-agent.
2. **Compression**: Uses `caveman` to prioritize code and technical results over long conversations.
3. **Context Sync**: Uses `cavemem` to maintain facts and decisions across different agent sessions.

## 🛠️ Rule Arsenal

| Rule | Focus |
| :--- | :--- |
| **typescript.md** | Type safety and Svelte 5 Runes. |
| **svelte.md** | SvelteKit patterns and Tailwind tokens. |
| **golang.md** | Idiomatic Go and error handling. |
| **git-conventions.md** | Atomic commits and Conventional Commits. |
| **security.md** | Basic security standards and validation. |
| **performance.md** | Optimization and resource efficiency. |
| **database.md** | Migrations and indexing. |
| **testing.md** | Table-driven tests (Go) and Vitest (TS). |
| **devops.md** | Docker builds and CI workflows. |
| **javascript.md** | Modern ES6+ standards and JSDoc. |
| **prisma.md** | Schema patterns and client singletons. |
| **drizzle.md** | Type-safe inference and schema organization. |

## 📄 License

MIT © [szerookii](https://github.com/szerookii)
