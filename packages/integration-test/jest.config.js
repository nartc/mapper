const fs = require('fs');

// Reading the SWC compilation config and remove the "exclude"
// for the test files to be compiled by SWC
const { exclude: _, ...swcJestConfig } = JSON.parse(
    fs.readFileSync(`${__dirname}/.lib.swcrc`, 'utf-8')
);

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
