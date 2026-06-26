import { createRequire } from 'node:module';

describe('Diagnostics - package resolution', () => {
    it('prints automapper resolution from inside Vitest', () => {
        const requireFromSpec = createRequire(import.meta.url);
        const importMetaResolve = (
            import.meta as ImportMeta & {
                resolve?: (specifier: string) => string;
            }
        ).resolve;

        console.log(`vitest import.meta.url -> ${import.meta.url}`);

        for (const packageName of ['@automapper/core', '@automapper/classes']) {
            console.log(
                `node require ${packageName} -> ${requireFromSpec.resolve(packageName)}`
            );
            console.log(
                `import.meta.resolve ${packageName} -> ${
                    importMetaResolve?.(packageName) ?? '<unavailable>'
                }`
            );
        }

        expect(requireFromSpec.resolve('@automapper/core')).toContain(
            '/packages/core/src/index.ts'
        );
        expect(requireFromSpec.resolve('@automapper/classes')).toContain(
            '/packages/classes/src/index.ts'
        );
    });
});
