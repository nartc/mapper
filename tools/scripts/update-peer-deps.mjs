import version from '../../version.json' assert { type: 'json' };
import { readJsonFile, writeJsonFile } from 'nx/src/utils/fileutils.js';

const peerDeps = ['@automapper/core', '@automapper/classes'];
const distRoot = 'dist/packages';
const distPackageJson = [
    'classes',
    'classes/mapped-types',
    'classes/transformer-plugin',
    'core',
    'zod',
    'mikro',
    'nestjs',
    'pojos',
    'sequelize',
];

for (const path of distPackageJson) {
    const packageJsonPath = distRoot.concat('/', path, '/package.json');
    try {
        const content = readJsonFile(packageJsonPath);
        for (const peerDep of peerDeps) {
            const deps = content['peerDependencies'];
            if (deps?.[peerDep] && deps[peerDep] !== version.version) {
                deps[peerDep] = version.version;
            }
        }

        writeJsonFile(packageJsonPath, content);
    } catch (e) {
        console.error(`Error processing json  file: ${path}`, e);
    }
}
