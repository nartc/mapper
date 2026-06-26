import { createRequire } from 'node:module';

describe('Diagnostics - package resolution', () => {
    it('prints automapper resolution from inside Vitest', async () => {
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

        const core = await import('@automapper/core');
        const classes = await import('@automapper/classes');

        console.log(
            `core exports -> ${Object.keys(core).slice(0, 15).join(',')}`
        );
        console.log(
            `classes exports -> ${Object.keys(classes).slice(0, 15).join(',')}`
        );

        expect(core.createMapper).toBeTypeOf('function');
        expect(classes.classes).toBeTypeOf('function');
    });
});
