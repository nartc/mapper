const { getJestProjects } = require('@nrwl/jest');

module.exports = {
  projects: [
    ...getJestProjects(),
    '<rootDir>/packages/experimental/transformer-plugin',
  ],
};
