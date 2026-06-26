import { createRequire } from 'node:module';
import { cwd, env, version } from 'node:process';

const requireFromSpec = createRequire(
    `${cwd()}/src/classes/map-self-reference.spec.ts`
);

console.log(`cwd -> ${cwd()}`);
console.log(`node -> ${version}`);

for (const key of [
    'CI',
    'GITHUB_SHA',
    'NX_AGENT_LAUNCH_TEMPLATE',
    'NX_CLOUD_DISTRIBUTED_EXECUTION',
    'NX_TASK_TARGET_PROJECT',
    'NX_TASK_TARGET_TARGET',
]) {
    console.log(`${key} -> ${env[key] ?? '<unset>'}`);
}

for (const packageName of ['@automapper/core', '@automapper/classes']) {
    console.log(`${packageName} -> ${requireFromSpec.resolve(packageName)}`);
}
