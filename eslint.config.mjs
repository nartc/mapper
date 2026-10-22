import nx from '@nx/eslint-plugin';

export default [
    ...nx.configs['flat/base'],
    {
        files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
        rules: {
            '@nx/enforce-module-boundaries': [
                'error',
                {
                    enforceBuildableLibDependency: true,
                    allow: [],
                    depConstraints: [
                        {
                            sourceTag: '*',
                            onlyDependOnLibsWithTags: ['*'],
                        },
                    ],
                },
            ],
        },
    },
    ...nx.configs['flat/typescript'],
    ...nx.configs['flat/javascript'],
    {
        files: ['**/vitest.config.ts', 'vitest.shared.ts'],
        rules: {
            '@nx/enforce-module-boundaries': 'off',
        },
    },
];
