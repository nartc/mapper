// eslint-disable-next-line no-undef
module.exports = {
  displayName: 'integration-test',
  preset: '../../jest.preset.js',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/packages/integration-test',
  setupFiles: ['./jest-setup.ts'],
  testPathIgnorePatterns: ['../../node_modules', 'src/lib/setup.spec.ts'],
};
