module.exports = {
    displayName: 'classes-mapped-types',
    preset: '../../../jest.preset.ts',
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
        },
    },
    transform: {
        '^.+\\.[tj]s$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'js', 'html'],
    coverageDirectory: '../../../coverage/packages/classes/mapped-types',
};
