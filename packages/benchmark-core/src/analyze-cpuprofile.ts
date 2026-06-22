import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

// Aggregate self-time from the newest V8 .cpuprofile in ./profiles by function
// (functionName @ url:line), so the dominant cost of the forMember/mapFrom path
// is attributable instead of guessed. Usage: pnpm tsx src/analyze-cpuprofile.ts
const dir = process.argv[2] ?? './profiles';
const files = readdirSync(dir)
    .filter((f) => f.endsWith('.cpuprofile'))
    .map((f) => ({ f, t: statSync(join(dir, f)).mtimeMs }))
    .sort((a, b) => b.t - a.t);

if (!files.length) {
    console.error(`No .cpuprofile found in ${dir}`);
    process.exit(1);
}

const path = join(dir, files[0].f);
const prof = JSON.parse(readFileSync(path, 'utf8')) as {
    nodes: Array<{
        id: number;
        hitCount?: number;
        callFrame: { functionName: string; url: string; lineNumber: number };
    }>;
    samples: number[];
    timeDeltas: number[];
};

const byId = new Map<number, (typeof prof.nodes)[number]>();
for (const n of prof.nodes) byId.set(n.id, n);

// accurate self time: sum the inter-sample delta charged to each sampled node
const selfUs = new Map<number, number>();
for (let i = 0; i < prof.samples.length; i++) {
    const id = prof.samples[i];
    const dt = prof.timeDeltas[i] ?? 0;
    selfUs.set(id, (selfUs.get(id) ?? 0) + dt);
}

const isAutomapper = (url: string) =>
    url.includes('/packages/core/') ||
    url.includes('/packages/classes/') ||
    url.includes('@automapper');

const agg = new Map<string, { us: number; automapper: boolean }>();
let total = 0;
for (const [id, us] of selfUs) {
    const node = byId.get(id);
    if (!node) continue;
    const cf = node.callFrame;
    const name = cf.functionName || '(anonymous)';
    const file = cf.url
        ? cf.url.replace(/^.*\/packages\//, 'packages/').replace(/^file:\/\//, '')
        : '(native)';
    const key = `${name}  ${file}:${cf.lineNumber + 1}`;
    const cur = agg.get(key) ?? { us: 0, automapper: isAutomapper(cf.url) };
    cur.us += us;
    agg.set(key, cur);
    total += us;
}

const rows = [...agg.entries()].sort((a, b) => b[1].us - a[1].us).slice(0, 30);
console.log(`\nCPU profile: ${path}`);
console.log(`Total sampled self-time: ${(total / 1000).toFixed(1)} ms\n`);
console.log('  self%   self(ms)  fn @ file:line');
console.log('  ------  --------  --------------');
let amTotal = 0;
for (const [key, { us, automapper }] of rows) {
    const pct = (100 * us) / total;
    if (automapper) amTotal += us;
    console.log(
        `  ${pct.toFixed(1).padStart(5)}%  ${(us / 1000)
            .toFixed(1)
            .padStart(7)}  ${automapper ? '*' : ' '} ${key}`
    );
}
console.log(
    `\n  (* = @automapper frame). @automapper self-time in top 30 ≈ ${(
        (100 * amTotal) /
        total
    ).toFixed(1)}% of total.\n`
);
