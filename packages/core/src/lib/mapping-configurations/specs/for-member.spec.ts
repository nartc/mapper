import { fromValue } from '../../member-map-functions/from-value';
import type { Mapping } from '../../types';
import { MappingClassId } from '../../types';
import { forMember } from '../for-member';

describe(forMember.name, () => {
    it('should update mapping properties with member map fn', () => {
        const mapping = [] as unknown as Mapping;
        mapping[MappingClassId.properties] = [];

        const memberMapFn = fromValue('foo');
        forMember((d: { foo: string }) => d.foo, memberMapFn)(mapping);

        expect(mapping[MappingClassId.properties]).toMatchSnapshot();
    });
});
