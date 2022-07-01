import version from '../../version.json' assert {type: 'json'};
import {readJsonFile, writeJsonFile} from "nx/src/utils/fileutils.js";

const peerDeps = [
  "@automapper/core",
  "@automapper/classes"
];

const distRoot = 'dist/packages';

const distPackageJson = [
  'classes',
  'classes/mapped-types',
  'classes/transformer-plugin',
  'core',
  'mikro',
  'nestjs',
  'pojos',
  'sequelize'
]

for (const path of distPackageJson) {
  const packageJsonPath = distRoot.concat('/', path, '/package.json');
  try {
    const content = readJsonFile(packageJsonPath);
    for (const peerDep of peerDeps) {
      if (content['peerDependencies']?.[peerDep] && content['peerDependencies']?.[peerDep] !== version.version) {
        content['peerDependencies'][peerDep] = version.version;
      }
    }

    writeJsonFile(packageJsonPath, content);
  } catch (e) {
    console.error(`Error processing json  file: ${path}`);
    console.error(e);
  }
}
