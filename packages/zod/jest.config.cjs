module.exports = {
    displayName: 'zod',
    preset: '../../jest.preset.js',
    transform: {
        '^.+\\.[tj]s$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'js', 'html'],
    coverageDirectory: '../../coverage/packages/zod',
};
