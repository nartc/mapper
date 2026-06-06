import { resolve } from 'node:path';
import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    root: __dirname,
    cacheDir: '../../../node_modules/.vite/libs/classes-mapped-types',
    // SWC handles the TypeScript transform so `emitDecoratorMetadata` is emitted.
    // Vitest's default esbuild transform does not emit `design:type` metadata,
    // which `@AutoMap()` reads when no explicit type function is provided.
    plugins: [
        swc.vite({
            jsc: {
                target: 'es2021',
                parser: { syntax: 'typescript', decorators: true },
                transform: {
                    legacyDecorator: true,
                    decoratorMetadata: true,
                },
            },
        }),
    ],
    resolve: {
        conditions: ['development', 'import', 'module', 'browser', 'default'],
        alias: {
            '@automapper/core': resolve(__dirname, '../../core/src/index.ts'),
            '@automapper/classes': resolve(__dirname, '../../classes/src/index.ts'),
        },
    },
    test: {
        name: '@automapper/classes/mapped-types',
        watch: false,
        globals: true,
        environment: 'node',
        reporters: ['default'],
        include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        setupFiles: ['../../../vitest.setup.ts'],
        coverage: {
            reportsDirectory: '../../../coverage/packages/classes/mapped-types',
            provider: 'v8',
        },
    },
});
