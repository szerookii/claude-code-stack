# Claude Code Stack (Personal Sandbox)

This is my personal, evolving configuration for [Claude Code](https://code.anthropic.com/). I use this repository to test and refine AI instructions, specialized rules, and developer skills for various tech stacks.

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

## 🤖 Ecosystem & Agents

This stack is optimized for my specific AI workflow:

- **Claude Code**: Primary agent for development and command execution.
- **Caveman**: Enforces "caveman-speak" to minimize token overhead.
- **Cavemem**: Cross-agent memory system used for long-term context persistence.
- **RTK (Rust Token Killer)**: Automatic CLI output compression.

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

## 📄 License

MIT © [szerookii](https://github.com/szerookii)
