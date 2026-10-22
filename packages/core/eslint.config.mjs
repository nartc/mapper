import baseConfig from '../../eslint.config.mjs';

export default [
    ...baseConfig,
    {
        files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
        rules: {
            '@typescript-eslint/no-explicit-any': 0,
            '@typescript-eslint/no-empty-object-type': 0,
            '@typescript-eslint/no-unsafe-function-type': 0,
            '@typescript-eslint/no-wrapper-object-types': 0,
            '@typescript-eslint/no-non-null-assertion': 0,
        },
    },
    {
        files: ['**/*.ts', '**/*.tsx'],
        // Override or add rules here
        rules: {},
    },
    {
        files: ['**/*.js', '**/*.jsx'],
        // Override or add rules here
        rules: {},
    },
];
