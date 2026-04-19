const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { execSync } = require('child_process');

const REPO = "szerookii/claude-code-stack";
const BRANCH = "main";
const RAW_URL = `https://raw.githubusercontent.com/${REPO}/${BRANCH}`;
const API_URL = `https://api.github.com/repos/${REPO}/contents`;

const C = { rst: '\x1b[0m', dim: '\x1b[2m', bold: '\x1b[1m', cyan: '\x1b[36m', green: '\x1b[32m', yellow: '\x1b[33m', red: '\x1b[31m' };
const log = {
    info: (m) => console.log(`${C.cyan}ℹ${C.rst} ${m}`),
    success: (m) => console.log(`${C.green}✔${C.rst} ${m}`),
    warn: (m) => console.log(`${C.yellow}⚠${C.rst} ${m}`),
    error: (m) => console.log(`${C.red}✖${C.rst} ${m}`),
    step: (m) => console.log(`\n${C.bold}${C.cyan}◆ ${m}${C.rst}`),
};

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise(res => rl.question(`\n${C.cyan}?${C.rst} ${C.bold}${q}${C.rst} `, res));

function isInstalled(cmd) {
    try { execSync(cmd, { stdio: 'ignore' }); return true; } catch (e) { return false; }
}

async function select(msg, opts, multi = false) {
    let cursor = 0; let selected = new Set();
    process.stdout.write('\u001b[?25l');
    const render = () => {
        process.stdout.write(`\n${C.cyan}?${C.rst} ${C.bold}${msg}${C.rst} ${C.dim}${multi ? '(Space to toggle, Enter to confirm)' : '(Arrows to move, Enter to select)'}${C.rst}\n`);
        opts.forEach((o, i) => {
            const isCur = i === cursor; const isSel = selected.has(i);
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
                process.stdin.removeListener('keypress', onKey); process.stdin.setRawMode(false); process.stdout.write('\u001b[?25h');
                const res = multi ? Array.from(selected).map(i => opts[i]) : opts[cursor];
                for (let i = 0; i <= opts.length + 1; i++) process.stdout.write('\u001b[1A\u001b[2K');
                log.info(`${msg} ${C.green}${multi ? res.join(', ') || 'None' : res}${C.rst}`);
                return resolve(res);
            } else if (key.ctrl && key.name === 'c') process.exit(0);
            for (let i = 0; i <= opts.length + 1; i++) process.stdout.write('\u001b[1A\u001b[2K');
            render();
        };
        readline.emitKeypressEvents(process.stdin); process.stdin.setRawMode(true); process.stdin.on('keypress', onKey);
    });
}

async function setup() {
    console.log(`\n${C.bold}${C.cyan}⚡ Claude Code Stack Installer${C.rst}\n${C.dim}============================${C.rst}`);
    let manager = "npm";
    
    log.step("Checking Environment");
    if (isInstalled('claude -v')) log.success("Claude Code is installed");
    else {
        log.warn("Claude Code is not installed");
        if ((await ask("Install Claude Code now? (y/n)")).toLowerCase() === 'y') {
            manager = await select("Choose your package manager:", ["npm", "pnpm", "bun", "yarn"]);
            execSync(`${manager} ${manager === 'yarn' ? 'global add' : 'install -g'} @anthropic-ai/claude-code`, { stdio: 'inherit' });
        }
    }

    log.step("Checking Skills & Plugins");
    const skills = [
        { name: 'caveman', check: 'claude plugin list', installed: false },
        { name: 'cavemem', check: 'cavemem -v', installed: false },
        { name: 'ui-ux-pro-max', check: 'uipro --version', installed: false }
    ];

    for (let s of skills) {
        s.installed = isInstalled(s.check);
        if (s.installed) log.success(`${s.name} is already installed`);
        else log.warn(`${s.name} is missing`);
    }

    const missingSkills = skills.filter(s => !s.installed).map(s => s.name);
    if (missingSkills.length > 0) {
        if ((await ask(`Install missing tools (${missingSkills.join(', ')})? (y/n)`)).toLowerCase() === 'y') {
            const cmd = manager === 'yarn' ? 'global add' : 'install -g';
            if (!skills[0].installed) {
                log.info("Installing caveman...");
                try {
                    execSync('claude plugin marketplace add JuliusBrussee/caveman', { stdio: 'ignore' });
                    execSync('claude plugin install caveman@caveman', { stdio: 'ignore' });
                    log.success("caveman installed");
                } catch (e) {
                    if (process.platform === 'win32') execSync('powershell -Command "irm https://raw.githubusercontent.com/JuliusBrussee/caveman/main/hooks/install.ps1 | iex"', { stdio: 'ignore' });
                    else execSync('curl -s https://raw.githubusercontent.com/JuliusBrussee/caveman/main/hooks/install.sh | bash', { stdio: 'ignore' });
                }
            }
            if (!skills[1].installed) {
                log.info("Installing cavemem...");
                execSync(`${manager} ${cmd} cavemem`, { stdio: 'ignore' });
                try { execSync('cavemem install', { stdio: 'ignore' }); } catch(e) {}
                log.success("cavemem installed");
            }
            if (!skills[2].installed) {
                log.info("Installing ui-ux-pro-max...");
                execSync(`${manager} ${cmd} uipro-cli`, { stdio: 'ignore' });
                try { execSync('uipro init --ai claude --global', { stdio: 'ignore' }); } catch(e) {}
                log.success("ui-ux-pro-max installed");
            }
        }
    }

    log.step("Project Configuration");
    const target = path.resolve((await ask("Target directory path (default: .)")) || ".");
    if (!fs.existsSync(target)) fs.mkdirSync(target, { recursive: true });

    const fetchItems = async (dir) => {
        const r = await fetch(`${API_URL}/${dir}?ref=${BRANCH}`, { headers: { 'User-Agent': 'NodeJS' } });
        return r.ok ? await r.json() : [];
    };

    log.info("Fetching rules & skills from GitHub...");
    const rulesData = await fetchItems(".claude/rules");
    const skillsData = await fetchItems(".claude/skills");

    const rules = rulesData.filter(f => f.name.endsWith('.md')).map(f => f.name.replace('.md', ''));
    const customSkills = skillsData.filter(f => f.type === 'dir').map(f => f.name);

    const selectedRules = await select("Select rules to install:", rules, true);
    const selectedSkills = await select("Select custom skills to install:", customSkills, true);

    log.step("Applying Files");
    const get = async (src, dest) => {
        const r = await fetch(src);
        if (r.ok) {
            const parent = path.dirname(dest);
            if (!fs.existsSync(parent)) fs.mkdirSync(parent, { recursive: true });
            fs.writeFileSync(dest, await r.text());
        }
    };

    await get(`${RAW_URL}/CLAUDE.md`, path.join(target, "CLAUDE.md"));
    log.success("CLAUDE.md");

    for (const r of selectedRules) {
        await get(`${RAW_URL}/.claude/rules/${r}.md`, path.join(target, ".claude", "rules", `${r}.md`));
        log.success(`Rule: ${r}`);
    }

    for (const s of selectedSkills) {
        await get(`${RAW_URL}/.claude/skills/${s}/SKILL.md`, path.join(target, ".claude", "skills", s, "SKILL.md"));
        log.success(`Skill: ${s}`);
    }

    console.log(`\n${C.bold}${C.green}✨ Setup complete!${C.rst}\n`);
    process.exit(0);
}

setup().catch(e => { console.error(`\n${C.red}Error:${C.rst}`, e.message); process.exit(1); });
