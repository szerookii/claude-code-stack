# Agent Ecosystem (Caveman, Cavemem, RTK)
- **Memory**: Handled exclusively by the `cavemem` MCP. Use its native tools to store and recall context. Do not create manual markdown memory files.
- **Communication**: `caveman` mode is active. Speak in an ultra-compressed, terse manner. Give me the code/solution directly.
- **Terminal**: `rtk` (Rust Token Killer) is active. Your CLI outputs are automatically compressed, so do not hesitate to run commands to explore the codebase.

# Tools, MCPs & Fact-Checking
- **Tool Awareness**: You have access to various tools and MCP servers (including Svelte and Go). Always check available tools before assuming a limitation.
- **Fact-Checking**: Do not guess file paths, function names, or API endpoints. Use your tools (grep, ls, read file, MCP queries) to inspect the codebase and validate your assumptions before writing code.
- **Safe Execution**: If a command or a code change is destructive (e.g., dropping a database, deleting folders), ALWAYS ask for my confirmation first.

# Quality Bar & Tool Respect
- **No Shortcuts**: NEVER take shortcuts. Do not hardcode values, mock data, or bypass architectural patterns. Write production-ready, robust code.
- **Comprehensive Tool Usage**: Respect and utilize ALL tools available in the project environment (linters, formatters, type checkers, test runners). If a tool reports an error, fix the code, do not ignore the tool.