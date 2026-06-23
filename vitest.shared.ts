import swc from 'unplugin-swc';
import { defineConfig, type UserConfig } from 'vitest/config';

// @automapper/* resolve via the pnpm workspace symlinks + each package's
// `exports` (source index.ts) — no explicit aliases needed, mirroring the tsc
// project-references setup (the tsconfig.base.json `paths` were dropped too).

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
