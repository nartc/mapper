import { defineConfig } from 'vitest/config';

export default defineConfig({
    root: __dirname,
    cacheDir: '../../node_modules/.vite/libs/pojos',
    resolve: {
        conditions: [
            'development',
            'import',
            'module',
            'browser',
            'default',
        ],
    },
    test: {
        name: '@automapper/pojos',
        watch: false,
        globals: true,
        environment: 'node',
        reporters: ['default'],
        include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        setupFiles: ['../../vitest.setup.ts'],
        coverage: {
            reportsDirectory: '../../coverage/packages/pojos',
            provider: 'v8',
        },
    },
});
