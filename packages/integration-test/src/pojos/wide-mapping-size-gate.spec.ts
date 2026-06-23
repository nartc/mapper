import { createMap, createMapper, extend, forMember, mapFrom } from '@automapper/core';
import { pojos, PojosMetadataMap, type PojoMetadata } from '@automapper/pojos';

// Exercises the size-gated cold-path branches (metadata index, extend
// Set) which only trigger above ~30 properties — wider than any class in the rest
// of the suite, so without this they'd be uncovered. Asserts the gated paths
// produce the same results as the small-class .find paths.
const WIDTH = 40; // > the 30 gate

function wideMeta(): Record<string, PojoMetadata> {
    const meta: Record<string, PojoMetadata> = {};
    for (let i = 0; i < WIDTH; i++) meta['p' + i] = String;
    return meta;
}

function wideSource(): Record<string, string> {
    const src: Record<string, string> = {};
    for (let i = 0; i < WIDTH; i++) src['p' + i] = 'v' + i;
    return src;
}

describe('wide mapping (size-gated cold paths)', () => {
    afterEach(() => {
        PojosMetadataMap.reset();
    });

    it('maps every member of a >30-property class (metadata index gate)', () => {
        const mapper = createMapper({ strategyInitializer: pojos() });
        PojosMetadataMap.create('WideSrc', wideMeta());
        PojosMetadataMap.create('WideDst', wideMeta());
        createMap(mapper, 'WideSrc', 'WideDst');

        const dto = mapper.map(wideSource(), 'WideSrc', 'WideDst') as Record<
            string,
            string
        >;

        for (let i = 0; i < WIDTH; i++) {
            expect(dto['p' + i]).toBe('v' + i);
        }
    });

    it('extend copies a >30-property base, preserving an existing custom member (extend Set gate)', () => {
        const mapper = createMapper({ strategyInitializer: pojos() });
        PojosMetadataMap.create('BaseSrc', wideMeta());
        PojosMetadataMap.create('BaseDst', wideMeta());
        PojosMetadataMap.create('ChildSrc', wideMeta());
        PojosMetadataMap.create('ChildDst', wideMeta());

        createMap(mapper, 'BaseSrc', 'BaseDst');
        createMap(
            mapper,
            'ChildSrc',
            'ChildDst',
            // a pre-existing custom member must NOT be overwritten by extend
            forMember(
                (d: Record<string, unknown>) => d['p0'],
                mapFrom(() => 'CUSTOM')
            ),
            extend('BaseSrc', 'BaseDst')
        );

        const dto = mapper.map(wideSource(), 'ChildSrc', 'ChildDst') as Record<
            string,
            string
        >;

        expect(dto['p0']).toBe('CUSTOM'); // dedup: existing custom wins
        for (let i = 1; i < WIDTH; i++) {
            expect(dto['p' + i]).toBe('v' + i);
        }
    });
});
