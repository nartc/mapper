import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import swc from 'unplugin-swc';
import { defineConfig, type UserConfig } from 'vitest/config';

// Repo root, resolved from this file's location (NOT process.cwd(), which is the
// per-package dir when nx runs `vitest run` inside packages/<name>).
const root = dirname(fileURLToPath(import.meta.url));
const r = (p: string) => resolve(root, p);

// @automapper/* -> source entry points, mirroring the tsconfig.base.json paths
// that ts-jest used. Order matters: more-specific subpaths must precede the bare
// package alias, since Rollup matches `find` as a path-boundary prefix.
const alias = [
    { find: '@automapper/classes/mapped-types', replacement: r('packages/classes/mapped-types/src/index.ts') },
    { find: '@automapper/classes/transformer-plugin', replacement: r('packages/classes/transformer-plugin/src/index.ts') },
    { find: '@automapper/classes', replacement: r('packages/classes/src/index.ts') },
    { find: '@automapper/core', replacement: r('packages/core/src/index.ts') },
    { find: '@automapper/pojos', replacement: r('packages/pojos/src/index.ts') },
    { find: '@automapper/mikro', replacement: r('packages/mikro/src/index.ts') },
    { find: '@automapper/nestjs', replacement: r('packages/nestjs/src/index.ts') },
    { find: '@automapper/sequelize', replacement: r('packages/sequelize/src/index.ts') },
    { find: '@automapper/zod', replacement: r('packages/zod/src/index.ts') },
];

// Single source of truth for every package's Vitest config.
//
// swc transpiles TS + *legacy* decorators with emitDecoratorMetadata, so the
// @AutoMap()/reflect-metadata path keeps emitting `design:type` exactly like
// ts-jest did — and, unlike ts-jest, it is fully decoupled from the installed
// TypeScript version (this is why Vitest lands before the TS 6 bump).
//
// keepClassNames is required: the mapper uses `constructor.name` as a model
// identifier, so swc must not mangle class names.
export function vitestConfig(testOverrides: UserConfig['test'] = {}) {
    return defineConfig({
        resolve: { alias },
        plugins: [
            swc.vite({
                jsc: {
                    parser: { syntax: 'typescript', decorators: true },
                    transform: {
                        legacyDecorator: true,
                        decoratorMetadata: true,
                    },
                    target: 'es2022',
                    keepClassNames: true,
                },
            }),
        ],
        test: {
            globals: true,
            environment: 'node',
            setupFiles: ['reflect-metadata'],
            include: ['src/**/*.spec.ts'],
            passWithNoTests: true,
            ...testOverrides,
        },
    });
}
