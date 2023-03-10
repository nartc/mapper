import { fromValue } from '../../member-map-functions/from-value';
import type { Mapping, Mapper } from '../../types';
import { MappingClassId } from '../../types';
import { forMember } from '../for-member';

describe(forMember.name, () => {
    it.skip('should update mapping properties with member map fn', () => {
        const mapping = [] as unknown as Mapping;
        mapping[MappingClassId.mapper] = {} as Mapper;
        mapping[MappingClassId.properties] = [];

        const memberMapFn = fromValue('foo');
        forMember((d: { foo: string }) => d.foo, memberMapFn)(mapping);

        expect(mapping[MappingClassId.properties]).toMatchSnapshot();
    });
});
