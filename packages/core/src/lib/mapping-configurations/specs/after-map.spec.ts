import type { Mapping } from '../../types';
import { MappingCallbacksClassId, MappingClassId } from '../../types';
import { afterMap } from '../after-map';

describe(afterMap.name, () => {
    it('should update mapping configuration with afterMap', () => {
        const mapping = [] as unknown as Mapping;
        const cb = jest.fn();
        afterMap(cb)(mapping);
        expect(
            mapping[MappingClassId.callbacks]![MappingCallbacksClassId.afterMap]
        ).toBe(cb);
    });
});
