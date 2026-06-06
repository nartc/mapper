import { resolve } from 'node:path';
import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    root: __dirname,
    cacheDir: '../../node_modules/.vite/libs/integration-test',
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
        conditions: [
            'development',
            'import',
            'module',
            'browser',
            'default',
        ],
        alias: [
            {
                find: /^@automapper\/classes\/transformer-plugin$/,
                replacement: resolve(
                    __dirname,
                    '../classes/transformer-plugin/src/index.ts'
                ),
            },
            {
                find: /^@automapper\/core$/,
                replacement: resolve(__dirname, '../core/src/index.ts'),
            },
            {
                find: /^@automapper\/classes$/,
                replacement: resolve(__dirname, '../classes/src/index.ts'),
            },
            {
                find: /^@automapper\/nestjs$/,
                replacement: resolve(__dirname, '../nestjs/src/index.ts'),
            },
            {
                find: /^@automapper\/pojos$/,
                replacement: resolve(__dirname, '../pojos/src/index.ts'),
            },
        ],
    },
    test: {
        name: '@automapper/integration-test',
        watch: false,
        globals: true,
        environment: 'node',
        reporters: ['default'],
        include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        setupFiles: ['../../vitest.setup.ts'],
        coverage: {
            reportsDirectory: '../../coverage/packages/integration-test',
            provider: 'v8',
        },
    },
});
