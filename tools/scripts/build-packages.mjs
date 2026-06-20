// Build all publishable @automapper packages with tsdown (ESM-only: .mjs + .d.mts)
// and generate the dist package.json (ESM exports map, module/types). 9.0 dropped
// the CommonJS output — `require('@automapper/...')` no longer resolves (the v8
// line stays dual/CJS for consumers that need it).
// Usage: node tools/scripts/build-packages.mjs [pkgName ...]   (default: all)
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, copyFileSync, mkdirSync, existsSync, rmSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const TSDOWN = resolve(ROOT, 'node_modules/.bin/tsdown');
const HEAP = '--max-old-space-size=8192';

// One published npm package = one entry here. `subpaths` build into subdirs and
// become subpath exports of the same package (the @automapper/classes case).
const PACKAGES = [
    { dir: 'packages/core', out: 'dist/packages/core' },
    {
        dir: 'packages/classes',
        out: 'dist/packages/classes',
        // Frontend bundler-alias shim (no-op @AutoMap); published as shim/index.js,
        // compiled with bare tsc to match the 8.x contract. Not in the exports map.
        shim: 'packages/classes/shim/index.ts',
        subpaths: [
            { key: './mapped-types', srcDir: 'packages/classes/mapped-types', sub: 'mapped-types' },
            { key: './transformer-plugin', srcDir: 'packages/classes/transformer-plugin', sub: 'transformer-plugin' },
        ],
    },
    { dir: 'packages/pojos', out: 'dist/packages/pojos' },
    { dir: 'packages/nestjs', out: 'dist/packages/nestjs' },
    { dir: 'packages/mikro', out: 'dist/packages/mikro' },
    { dir: 'packages/sequelize', out: 'dist/packages/sequelize' },
    { dir: 'packages/zod', out: 'dist/packages/zod' },
];

// Always external (compiler/runtime helpers); `typescript/lib/tsserverlibrary`
// is a subpath specifier that `typescript` alone does not match.
const ALWAYS_EXTERNAL = ['typescript', 'typescript/lib/tsserverlibrary', 'tslib'];

// Everything third-party lives in the ROOT package.json (deps + devDeps) since
// this isn't a pnpm workspace yet; treat all of it as external so only each
// package's own source is bundled. The packages themselves under-declare peers.
const rootManifest = JSON.parse(readFileSync(resolve(ROOT, 'package.json'), 'utf8'));
const ROOT_EXTERNAL = [
    ...Object.keys(rootManifest.dependencies || {}),
    ...Object.keys(rootManifest.devDependencies || {}),
    '@automapper/core',
    '@automapper/classes',
];

// Derive externals: root third-party + this package's own deps/peerDeps + the
// always-external compiler/runtime helpers. Anything a consumer is expected to
// provide (reflect-metadata, @automapper/*, nest, mikro, sequelize, rxjs...)
// stays external rather than being bundled in.
function deriveExternal(srcDir) {
    const p = resolve(ROOT, srcDir, 'package.json');
    const m = existsSync(p) ? JSON.parse(readFileSync(p, 'utf8')) : {};
    return [
        ...new Set([
            ...ROOT_EXTERNAL,
            ...Object.keys(m.dependencies || {}),
            ...Object.keys(m.peerDependencies || {}),
            ...ALWAYS_EXTERNAL,
        ]),
    ];
}

const only = process.argv.slice(2);
const targets = only.length ? PACKAGES.filter((p) => only.includes(p.dir.split('/').pop())) : PACKAGES;

function tsdown({ entry, outDir, external, tsconfig }) {
    const args = [entry, '--format', 'esm', '--dts', '--out-dir', outDir];
    for (const e of external) args.push('--external', e);
    if (tsconfig) args.push('--tsconfig', tsconfig);
    execFileSync(TSDOWN, args, {
        cwd: ROOT,
        stdio: 'inherit',
        env: { ...process.env, NODE_OPTIONS: `${process.env.NODE_OPTIONS || ''} ${HEAP}`.trim() },
    });
}

// ESM-only conditions: no `require` branch (CommonJS is intentionally dropped in 9.0).
const condFor = (prefix) => ({
    types: `${prefix}index.d.mts`,
    import: `${prefix}index.mjs`,
});

for (const pkg of targets) {
    const srcPkgPath = resolve(ROOT, pkg.dir, 'package.json');
    const manifest = JSON.parse(readFileSync(srcPkgPath, 'utf8'));
    const outAbs = resolve(ROOT, pkg.out);
    rmSync(outAbs, { recursive: true, force: true });
    mkdirSync(outAbs, { recursive: true });

    // main entry
    tsdown({
        entry: resolve(ROOT, pkg.dir, 'src/index.ts'),
        outDir: pkg.out,
        external: deriveExternal(pkg.dir),
        tsconfig: existsSync(resolve(ROOT, pkg.dir, 'tsconfig.lib.json')) ? resolve(ROOT, pkg.dir, 'tsconfig.lib.json') : undefined,
    });

    const exportsMap = { '.': condFor('./') };

    // subpaths (classes)
    for (const sp of pkg.subpaths || []) {
        tsdown({
            entry: resolve(ROOT, sp.srcDir, 'src/index.ts'),
            outDir: `${pkg.out}/${sp.sub}`,
            external: deriveExternal(sp.srcDir),
            tsconfig: existsSync(resolve(ROOT, sp.srcDir, 'tsconfig.lib.json')) ? resolve(ROOT, sp.srcDir, 'tsconfig.lib.json') : undefined,
        });
        exportsMap[sp.key] = condFor(`./${sp.sub}/`);
    }

    // frontend shim (classes): bare tsc, matches the 8.x published shim/index.js
    if (pkg.shim) {
        execFileSync(
            resolve(ROOT, 'node_modules/.bin/tsc'),
            [resolve(ROOT, pkg.shim), '--outDir', resolve(outAbs, 'shim')],
            { cwd: ROOT, stdio: 'inherit' }
        );
    }

    // dist package.json: preserve metadata, set ESM entry points + exports map.
    // No `main` — there is no CommonJS entry; `module`/`types` point at the ESM build.
    delete manifest.main;
    manifest.module = './index.mjs';
    manifest.types = './index.d.mts';
    manifest.exports = exportsMap;
    writeFileSync(resolve(outAbs, 'package.json'), JSON.stringify(manifest, null, 2) + '\n');

    // README asset
    const readme = resolve(ROOT, pkg.dir, 'src/README.md');
    if (existsSync(readme)) copyFileSync(readme, resolve(outAbs, 'README.md'));

    console.log(`\n✔ packaged ${manifest.name} -> ${pkg.out}`);
}
