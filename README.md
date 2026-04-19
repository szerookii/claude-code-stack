# Claude Code Stack (Personal Sandbox)

This is my personal, evolving configuration for [Claude Code](https://code.anthropic.com/). I use this repository to test and refine senior-level AI instructions, specialized rules, and agent orchestration workflows.

## 🚀 Quick Bootstrap

I can instantly initialize any project with this setup via the terminal. Works with **Bun** (recommended) or **Node.js**.

### Using Bun
```bash
bun run https://raw.githubusercontent.com/szerookii/claude-code-stack/main/setup.js
```

### Using Node.js
```bash
node -e "fetch('https://raw.githubusercontent.com/szerookii/claude-code-stack/main/setup.js').then(r=>r.text()).then(eval)"
```

## 🎯 Focus & Testing

My primary goal is to experiment with AI-driven development efficiency. This setup includes:

- **Interactive Setup**: A clean CLI to cherry-pick rules for specific test projects.
- **Environment Detection**: Automatic check and installation for Claude Code via npm, pnpm, bun, or yarn.
- **Skill Laboratory**: Optional integration for experimental tools:
  - `caveman`: Advanced token compression for ultra-terse AI communication.
  - `cavemem`: Shared persistent memory for long-term agent context.
  - `ui-ux-pro-max`: Design intelligence for rapid UI prototyping.
- **Standardized Rules**: 10+ rules (`.claude/rules/`) formatted to the official Claude Code specifications.

## 🤖 Agentic Architecture

This stack transforms Claude into a **Senior Orchestrator**. Instead of handling everything directly, it is instructed to delegate and manage sub-agents:

1. **Strategic Delegation**: Deep research is delegated to the `codebase_investigator` sub-agent, and repetitive batch tasks (3+ files) to the `generalist` sub-agent.
2. **Compression Mastery**: Uses `caveman` to keep token usage minimal and focus on code over conversation.
3. **Knowledge Sync**: Uses `cavemem` as a central "brain" to sync decisions and facts between the orchestrator and all sub-agents.

## 🛠️ Rule Arsenal

| Rule | Focus |
| :--- | :--- |
| **typescript.md** | Strict typing and Svelte 5 Runes. |
| **svelte.md** | SvelteKit patterns and Tailwind CSS tokens. |
| **golang.md** | Idiomatic Go, error handling, and concurrency. |
| **git-conventions.md** | Atomic commits and Conventional Commits. |
| **security.md** | Hardened standards and input validation. |
| **performance.md** | Bundle optimization and resource efficiency. |
| **database.md** | Non-destructive migrations and indexing. |
| **testing.md** | Table-driven tests (Go) and Vitest (TS). |
| **devops.md** | Optimized Docker builds and CI workflows. |
| **javascript.md** | Modern ES6+ standards and JSDoc. |
| **prisma.md** | Schema naming, migrations, and singleton patterns. |
| **drizzle.md** | Type-safe inference and schema splitting. |

## 📄 License

MIT © [szerookii](https://github.com/szerookii)
