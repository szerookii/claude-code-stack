const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { execSync } = require('child_process');

const REPO = "szerookii/claude-code-stack";
const BRANCH = "main";
const RAW_URL = `https://raw.githubusercontent.com/${REPO}/${BRANCH}`;
const API_URL = `https://api.github.com/repos/${REPO}/contents/.claude/rules?ref=${BRANCH}`;

const C = {
    rst: '\x1b[0m', dim: '\x1b[2m', bold: '\x1b[1m',
    cyan: '\x1b[36m', green: '\x1b[32m', yellow: '\x1b[33m', red: '\x1b[31m'
};

const log = {
    info: (m) => console.log(`${C.cyan}ℹ${C.rst} ${m}`),
    success: (m) => console.log(`${C.green}✔${C.rst} ${m}`),
    warn: (m) => console.log(`${C.yellow}⚠${C.rst} ${m}`),
    error: (m) => console.log(`${C.red}✖${C.rst} ${m}`),
    step: (m) => console.log(`\n${C.bold}${C.cyan}◆ ${m}${C.rst}`),
};

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise(res => rl.question(`\n${C.cyan}?${C.rst} ${C.bold}${q}${C.rst} `, res));

async function select(msg, opts, multi = false) {
    let cursor = 0;
    let selected = new Set();
    process.stdout.write('\u001b[?25l'); // hide cursor

    const render = () => {
        process.stdout.write(`\n${C.cyan}?${C.rst} ${C.bold}${msg}${C.rst} ${C.dim}${multi ? '(Space to toggle, Enter to confirm)' : '(Arrows to move, Enter to select)'}${C.rst}\n`);
        opts.forEach((o, i) => {
            const isCur = i === cursor;
            const isSel = selected.has(i);
            const prefix = isCur ? `${C.cyan}❯${C.rst}` : ' ';
            const box = multi ? (isSel ? `${C.green}◉${C.rst}` : `${C.dim}◯${C.rst}`) : '';
            const color = isCur ? C.cyan : (isSel && multi ? C.green : C.rst);
            process.stdout.write(`  ${prefix} ${box} ${color}${o}${C.rst}\n`);
        });
    };

    render();

    return new Promise(resolve => {
        const onKey = (_, key) => {
            if (key.name === 'up') cursor = (cursor - 1 + opts.length) % opts.length;
            else if (key.name === 'down') cursor = (cursor + 1) % opts.length;
            else if (key.name === 'space' && multi) selected.has(cursor) ? selected.delete(cursor) : selected.add(cursor);
            else if (key.name === 'return') {
                process.stdin.removeListener('keypress', onKey);
                process.stdin.setRawMode(false);
                process.stdout.write('\u001b[?25h'); // show cursor
                const res = multi ? Array.from(selected).map(i => opts[i]) : opts[cursor];
                for (let i = 0; i <= opts.length + 1; i++) process.stdout.write('\u001b[1A\u001b[2K'); // Clear selection UI
                log.info(`${msg} ${C.green}${multi ? res.join(', ') || 'None' : res}${C.rst}`);
                return resolve(res);
            } else if (key.ctrl && key.name === 'c') process.exit(0);
            
            for (let i = 0; i <= opts.length + 1; i++) process.stdout.write('\u001b[1A\u001b[2K');
            render();
        };
        readline.emitKeypressEvents(process.stdin);
        process.stdin.setRawMode(true);
        process.stdin.on('keypress', onKey);
    });
}

async function setup() {
    console.log(`\n${C.bold}${C.cyan}⚡ Claude Code Stack Installer${C.rst}\n${C.dim}============================${C.rst}`);

    let manager = "npm";
    
    log.step("Checking Environment");
    try {
        execSync('claude -v', { stdio: 'ignore' });
        log.success("Claude Code is installed");
    } catch (e) {
        log.warn("Claude Code is not installed");
        if ((await ask("Install Claude Code now? (y/n)")).toLowerCase() === 'y') {
            manager = await select("Choose your package manager:", ["npm", "pnpm", "bun", "yarn"]);
            const cmd = manager === 'yarn' ? 'global add' : 'install -g';
            log.info(`Running: ${manager} ${cmd} @anthropic-ai/claude-code`);
            execSync(`${manager} ${cmd} @anthropic-ai/claude-code`, { stdio: 'inherit' });
        }
    }

    log.step("Plugins & Skills");
    if ((await ask("Install recommended tools (caveman, cavemem, ui-ux-pro-max)? (y/n)")).toLowerCase() === 'y') {
        const cmd = manager === 'yarn' ? 'global add' : 'install -g';
        
        log.info("Installing caveman...");
        try {
            execSync('claude plugin marketplace add JuliusBrussee/caveman', { stdio: 'ignore' });
            execSync('claude plugin install caveman@caveman', { stdio: 'ignore' });
            log.success("caveman plugin installed");
        } catch (e) {
            log.warn("Plugin install failed, falling back to hook...");
            if (process.platform === 'win32') execSync('powershell -Command "irm https://raw.githubusercontent.com/JuliusBrussee/caveman/main/hooks/install.ps1 | iex"', { stdio: 'ignore' });
            else execSync('curl -s https://raw.githubusercontent.com/JuliusBrussee/caveman/main/hooks/install.sh | bash', { stdio: 'ignore' });
        }

        log.info("Installing cavemem...");
        execSync(`${manager} ${cmd} cavemem`, { stdio: 'ignore' });
        try { execSync('cavemem install', { stdio: 'ignore' }); } catch(e) {}
        log.success("cavemem installed");

        log.info("Installing ui-ux-pro-max-skill...");
        execSync(`${manager} ${cmd} uipro-cli`, { stdio: 'ignore' });
        try { execSync('uipro init --ai claude --global', { stdio: 'ignore' }); } catch(e) {}
        log.success("ui-ux-pro-max-skill installed");
    }

    log.step("Project Configuration");
    const targetInput = await ask("Target directory path (default: .)");
    const target = path.resolve(targetInput || ".");
    
    if (!fs.existsSync(target)) {
        fs.mkdirSync(target, { recursive: true });
        log.info(`Created directory: ${target}`);
    }

    process.stdout.write(`${C.cyan}ℹ${C.rst} Fetching rules from GitHub...`);
    let rules = [];
    try {
        const r = await fetch(API_URL, { headers: { 'User-Agent': 'NodeJS' } });
        const d = await r.json();
        rules = d.filter(f => f.name.endsWith('.md')).map(f => f.name.replace('.md', ''));
        process.stdout.write(`\r\x1b[K${C.green}✔${C.rst} Fetched ${rules.length} rules\n`);
    } catch(e) {
        process.stdout.write(`\r\x1b[K${C.red}✖${C.rst} Failed to fetch rules\n`);
        process.exit(1);
    }

    const selected = await select("Which rules do you want to install?", rules, true);

    log.step("Applying Files");
    const get = async (src, dest, name) => {
        const r = await fetch(src);
        if (r.ok) {
            fs.writeFileSync(dest, await r.text());
            log.success(name);
        } else log.error(`Failed: ${name}`);
    };

    await get(`${RAW_URL}/CLAUDE.md`, path.join(target, "CLAUDE.md"), "CLAUDE.md");
    
    if (selected.length > 0) {
        const rDir = path.join(target, ".claude", "rules");
        if (!fs.existsSync(rDir)) fs.mkdirSync(rDir, { recursive: true });
        for (const r of selected) {
            await get(`${RAW_URL}/.claude/rules/${r}.md`, path.join(rDir, `${r}.md`), `.claude/rules/${r}.md`);
        }
    }

    console.log(`\n${C.bold}${C.green}✨ Setup complete! Happy coding.${C.rst}\n`);
    process.exit(0);
}

setup().catch(e => {
    console.error(`\n${C.red}An error occurred:${C.rst}`, e.message);
    process.exit(1);
});
