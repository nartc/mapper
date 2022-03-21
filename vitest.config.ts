import { createFilter } from '@rollup/pluginutils';
import { transform } from '@swc/core';
import { resolve } from 'path';
import { defineConfig } from 'vitest/config';

const r = (p: string) => resolve(__dirname, p);
const queryRE = /\?.*$/;
const hashRE = /#.*$/;
const cleanUrl = (url: string) => url.replace(hashRE, '').replace(queryRE, '');

export function RollupPluginSwc(): Plugin {
    const filter = createFilter(/\.(tsx?|jsx)$/, /\.js$/);

    return {
        name: 'rollup-plugin-swc',
        // @ts-ignore
        async transform(code, id) {
            if (filter(id) || filter(cleanUrl(id))) {
                const result = await transform(code, {
                    jsc: {
                        target: 'es2019',
                        parser: {
                            syntax: 'typescript',
                            decorators: true,
                        },
                        transform: {
                            legacyDecorator: true,
                            decoratorMetadata: true,
                        },
                    },
                    filename: id,
                });
                return {
                    code: result.code,
                    map: result.map,
                };
            }
        },
    };
}

export default defineConfig({
    esbuild: false,
    plugins: [RollupPluginSwc()],
    test: {
        globals: true,
        environment: 'node',
        setupFiles: 'packages/integration-test/jest-setup.ts',
        include: ['packages/integration-test/**/*.spec.ts'],
        exclude: [
            'packages/integration-test/src/nestjs/**/*.controller.spec.ts',
        ],
        root: '.',
    },
    resolve: {
        alias: {
            '@automapper/classes/transformer-plugin': r(
                'packages/classes/transformer-plugin/src'
            ),
            '@automapper/classes': r('packages/classes/src'),
            '@automapper/core': r('packages/core/src'),
            '@automapper/pojos': r('packages/pojos/src'),
            '@automapper/nestjs': r('packages/nestjs/src'),
        },
    },
});
