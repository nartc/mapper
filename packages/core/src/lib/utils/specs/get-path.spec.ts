import { CamelCaseNamingConvention } from '../../naming-conventions/camel-case-naming-convention';
import { SnakeCaseNamingConvention } from '../../naming-conventions/snake-case-naming-convention';
import { getFlatteningPaths } from '../get-path';

describe(getFlatteningPaths.name, () => {
    const namingConventions: [
        SnakeCaseNamingConvention,
        CamelCaseNamingConvention
    ] = [new SnakeCaseNamingConvention(), new CamelCaseNamingConvention()];

    it('should keep similar-prefix source paths direct when the prefix is not an object', () => {
        const source = {
            deleted: undefined,
            deleted_by: undefined,
        };

        expect(
            getFlatteningPaths(source, ['deleted_by'], namingConventions)
        ).toEqual(['deleted_by']);
    });

    it('should keep longer similar-prefix source paths direct when the prefix is not an object', () => {
        const source = {
            inspection_order_status: undefined,
            inspection_order_status_id: undefined,
        };

        expect(
            getFlatteningPaths(
                source,
                ['inspection_order_status_id'],
                namingConventions
            )
        ).toEqual(['inspection_order_status_id']);
    });

    it('should not throw when the first similar-prefix source member is undefined', () => {
        const source = {
            password: undefined,
            password_reset_token: undefined,
        };

        expect(
            getFlatteningPaths(
                source,
                ['password_reset_token'],
                namingConventions
            )
        ).toEqual(['password_reset_token']);
    });

    it('should still flatten real nested object paths', () => {
        const source = {
            job: {
                title: undefined,
            },
        };

        expect(
            getFlatteningPaths(source, ['job_title'], namingConventions)
        ).toEqual(['job', 'title']);
    });
});
