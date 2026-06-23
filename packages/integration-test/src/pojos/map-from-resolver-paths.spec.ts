import { createMap, createMapper, forMember, mapFrom } from '@automapper/core';
import { pojos, PojosMetadataMap } from '@automapper/pojos';

// Characterizes the mapFrom member path across return/mutate/error so the
// the per-member-writer + inlined-mapFrom refactor stays
// behavior-preserving.
describe('mapFrom resolver paths (return / mutate / error)', () => {
    afterEach(() => {
        PojosMetadataMap.reset();
    });

    function setup(resolver: (s: { a: string }) => unknown) {
        const mapper = createMapper({ strategyInitializer: pojos() });
        PojosMetadataMap.create('Src', { a: String, b: String });
        PojosMetadataMap.create('Dst', { a: String, b: String });
        createMap(
            mapper,
            'Src',
            'Dst',
            forMember(
                (d: { b: unknown }) => d.b,
                mapFrom(resolver as never)
            )
        );
        return mapper;
    }

    it('writes the mapFrom-computed value on the return path', () => {
        const mapper = setup((s) => s.a.toUpperCase());
        const dto = mapper.map({ a: 'x' }, 'Src', 'Dst') as {
            a: string;
            b: string;
        };
        expect(dto).toEqual({ a: 'x', b: 'X' });
    });

    it('wraps a throwing resolver (original error surfaced once)', () => {
        const mapper = setup(() => {
            throw new Error('boom');
        });
        expect(() => mapper.map({ a: 'x' }, 'Src', 'Dst')).toThrow(/boom/);
    });

    it('applies mapFrom onto an existing object on the mutate path', () => {
        const mapper = setup((s) => s.a.toUpperCase());
        const dest = { a: 'old', b: 'old' };
        mapper.mutate({ a: 'x' }, dest, 'Src', 'Dst');
        expect(dest).toEqual({ a: 'x', b: 'X' });
    });

    it('mutate skips an undefined resolver result (preserves the existing value)', () => {
        const mapper = setup(() => undefined);
        const dest = { a: 'old', b: 'keepme' };
        mapper.mutate({ a: 'x' }, dest, 'Src', 'Dst');
        expect(dest.b).toBe('keepme'); // undefined is NOT written on mutate
        expect(dest.a).toBe('x');
    });
});
