// Generates a clean, publishable package.json in each package's dist output.
//
// nx's modern TypeScript setup does not auto-generate the dist package.json
// (it throws on `generatePackageJson`), expecting the source package.json —
// whose `exports` already point at the built files — to be the published one.
// This script copies it over, stripping dev-only fields and the `development`
// source condition, and resolving `workspace:*` to the real version.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');

// source package dir -> dist output dir
const packages = {
    'packages/core': 'dist/packages/core',
    'packages/classes': 'dist/packages/classes',
    'packages/classes/mapped-types': 'dist/packages/classes/mapped-types',
    'packages/classes/transformer-plugin':
        'dist/packages/classes/transformer-plugin',
    'packages/pojos': 'dist/packages/pojos',
    'packages/nestjs': 'dist/packages/nestjs',
    'packages/mikro': 'dist/packages/mikro',
    'packages/sequelize': 'dist/packages/sequelize',
    'packages/zod': 'dist/packages/zod',
};

const stripDevelopmentCondition = (value) => {
    if (Array.isArray(value)) return value.map(stripDevelopmentCondition);
    if (value && typeof value === 'object') {
        const out = {};
        for (const [k, v] of Object.entries(value)) {
            if (k === 'development') continue;
            out[k] = stripDevelopmentCondition(v);
        }
        return out;
    }
    return value;
};

const resolveWorkspaceDeps = (deps, version) => {
    if (!deps) return deps;
    const out = {};
    for (const [name, range] of Object.entries(deps)) {
        out[name] =
            typeof range === 'string' && range.startsWith('workspace:')
                ? range === 'workspace:*'
                    ? version
                    : range.replace('workspace:', '')
                : range;
    }
    return out;
};

let count = 0;
for (const [srcDir, distDir] of Object.entries(packages)) {
    const srcPath = join(root, srcDir, 'package.json');
    const distPath = join(root, distDir, 'package.json');
    if (!existsSync(join(root, distDir))) {
        console.warn(`! skip ${srcDir} (dist missing: ${distDir})`);
        continue;
    }
    const pkg = JSON.parse(readFileSync(srcPath, 'utf8'));

    delete pkg.nx;
    delete pkg.devDependencies;
    delete pkg.scripts;
    delete pkg.private;

    if (pkg.exports) pkg.exports = stripDevelopmentCondition(pkg.exports);
    pkg.dependencies = resolveWorkspaceDeps(pkg.dependencies, pkg.version);
    pkg.peerDependencies = resolveWorkspaceDeps(
        pkg.peerDependencies,
        pkg.version
    );
    if (pkg.dependencies && Object.keys(pkg.dependencies).length === 0)
        delete pkg.dependencies;
    if (pkg.peerDependencies && Object.keys(pkg.peerDependencies).length === 0)
        delete pkg.peerDependencies;

    writeFileSync(distPath, JSON.stringify(pkg, null, 2) + '\n');
    console.log(`✓ ${distDir}/package.json`);
    count++;
}
console.log(`\nFinalized ${count} package(s).`);
