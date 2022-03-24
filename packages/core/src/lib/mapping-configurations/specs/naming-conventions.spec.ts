import { CamelCaseNamingConvention } from '../../naming-conventions/camel-case-naming-convention';
import { PascalCaseNamingConvention } from '../../naming-conventions/pascal-case-naming-convention';
import type { Mapping } from '../../types';
import { MappingClassId } from '../../types';
import { namingConventions } from '../naming-conventions';

describe(namingConventions.name, () => {
    const camelCaseNamingConvention = new CamelCaseNamingConvention();
    const pascalCaseNamingConvention = new PascalCaseNamingConvention();

    it('should update namingConventions for the mapping', () => {
        const mapping = [] as unknown as Mapping;
        namingConventions(camelCaseNamingConvention)(mapping);

        expect(mapping[MappingClassId.namingConventions]).toEqual([
            camelCaseNamingConvention,
            camelCaseNamingConvention,
        ]);

        namingConventions({
            source: camelCaseNamingConvention,
            destination: pascalCaseNamingConvention,
        })(mapping);
        expect(mapping[MappingClassId.namingConventions]).toEqual([
            camelCaseNamingConvention,
            pascalCaseNamingConvention,
        ]);
    });
});
