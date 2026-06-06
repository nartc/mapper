import type { Mapping } from '../../types';
import { MappingClassId } from '../../types';
import { constructUsing } from '../construct-using';
import { describe, it, expect, vi } from 'vitest';

describe(constructUsing.name, () => {
    it('should update destinationConstructor for the mapping', () => {
        const mapping = [] as unknown as Mapping;
        const constructor = vi.fn();
        constructUsing(constructor)(mapping);
        expect(mapping[MappingClassId.destinationConstructor]).toBe(
            constructor
        );
    });
});
