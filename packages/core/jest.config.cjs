module.exports = {
    displayName: 'core',
    preset: '../../jest.preset.ts',
    transform: {
        '^.+\\.[tj]s$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'js', 'html'],
    coverageDirectory: '../../coverage/packages/core',
};
