/* eslint-disable */
export default {
    displayName: 'integration-test',

    transform: {
        '^.+\\.[tj]s$': 'ts-jest',
    },
    setupFiles: ['./jest-setup.ts'],
    moduleFileExtensions: ['ts', 'js', 'html'],
    coverageDirectory: '../../coverage/packages/integration-test',
    preset: '../../jest.preset.js',
};
