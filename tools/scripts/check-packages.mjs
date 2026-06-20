// Validate every built package's publish contract: publint (packaging) +
// @arethetypeswrong/cli (types resolution across node10/node16-cjs/esm/bundler).
// Run after `pnpm run package`. Exits non-zero on any problem.
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const PKGS = ['core', 'classes', 'pojos', 'nestjs', 'mikro', 'sequelize'];

let failed = false;
for (const p of PKGS) {
    const dir = resolve(ROOT, 'dist/packages', p);
    if (!existsSync(dir)) {
        console.error(`✗ ${p}: dist not found — run \`pnpm run package\` first`);
        failed = true;
        continue;
    }
    console.log(`\n──────── @automapper/${p} ────────`);
    try {
        execFileSync('npx', ['-y', 'publint@latest', dir], { cwd: ROOT, stdio: 'inherit' });
    } catch {
        failed = true;
    }
    try {
        execFileSync('npx', ['-y', '@arethetypeswrong/cli@latest', '--pack', dir], {
            cwd: ROOT,
            stdio: 'inherit',
        });
    } catch {
        failed = true;
    }
}

if (failed) {
    console.error('\n✗ package contract check failed');
    process.exit(1);
}
console.log('\n✔ all packages pass publint + attw');
