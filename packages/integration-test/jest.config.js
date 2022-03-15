module.exports = {
    displayName: 'integration-test',
    preset: '../../jest.preset.js',
    transform: {
        '^.+\\.[tj]s$': 'ts-jest',
    },
    setupFiles: ['./jest-setup.ts'],
    moduleFileExtensions: ['ts', 'js', 'html'],
    coverageDirectory: '../../coverage/packages/integration-test',
};
