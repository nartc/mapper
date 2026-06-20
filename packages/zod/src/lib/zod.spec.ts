import { createMap, createMapper, forMember, mapFrom } from '@automapper/core';
import { PojosMetadataMap } from '@automapper/pojos';
import { z } from 'zod';
import { createMetadataMap, zod } from './zod';

describe('zod', () => {
    beforeEach(() => {
        PojosMetadataMap.reset();
    });

    it('derives metadata and maps a flat schema', () => {
        const User = z.object({ name: z.string(), age: z.number() });
        const UserDto = z.object({ name: z.string(), age: z.number() });
        createMetadataMap('User', User);
        createMetadataMap('UserDto', UserDto);

        const mapper = createMapper({ strategyInitializer: zod() });
        createMap<z.infer<typeof User>, z.infer<typeof UserDto>>(
            mapper,
            'User',
            'UserDto'
        );

        expect(
            mapper.map({ name: 'Chau', age: 30 }, 'User', 'UserDto')
        ).toEqual({ name: 'Chau', age: 30 });
    });

    it('unwraps optional/nullable/default and maps primitives', () => {
        const Source = z.object({
            a: z.string().optional(),
            b: z.number().nullable(),
            c: z.boolean().default(false),
            d: z.date(),
        });
        createMetadataMap('S', Source);
        createMetadataMap('D', Source);

        const mapper = createMapper({ strategyInitializer: zod() });
        createMap(mapper, 'S', 'D');

        const now = new Date();
        expect(
            mapper.map({ a: 'x', b: 1, c: true, d: now }, 'S', 'D')
        ).toEqual({ a: 'x', b: 1, c: true, d: now });
    });

    it('maps nested object schemas and arrays', () => {
        const Source = z.object({
            id: z.number(),
            address: z.object({ city: z.string(), zip: z.string() }),
            tags: z.array(z.string()),
            friends: z.array(z.object({ name: z.string() })),
        });
        createMetadataMap('Src', Source);
        createMetadataMap('Dst', Source);

        const mapper = createMapper({ strategyInitializer: zod() });
        // nested identifiers are derived as `${parent}.${key}`
        createMap(mapper, 'Src.address', 'Dst.address');
        createMap(mapper, 'Src.friends', 'Dst.friends');
        createMap(mapper, 'Src', 'Dst');

        const source = {
            id: 1,
            address: { city: 'NY', zip: '10001' },
            tags: ['a', 'b'],
            friends: [{ name: 'Sam' }, { name: 'Lee' }],
        };
        const result = mapper.map(source, 'Src', 'Dst');
        expect(result).toEqual(source);
        // deep copy, not reference
        expect(result.address).not.toBe(source.address);
        expect(result.friends[0]).not.toBe(source.friends[0]);
    });

    it('works with forMember over derived metadata', () => {
        const Source = z.object({ first: z.string(), last: z.string() });
        const Dest = z.object({
            first: z.string(),
            last: z.string(),
            full: z.string(),
        });
        createMetadataMap('P', Source);
        createMetadataMap('PDto', Dest);

        const mapper = createMapper({ strategyInitializer: zod() });
        createMap(
            mapper,
            'P',
            'PDto',
            forMember(
                (d: { full: string }) => d.full,
                mapFrom((s: { first: string; last: string }) =>
                    `${s.first} ${s.last}`
                )
            )
        );

        expect(
            mapper.map({ first: 'Chau', last: 'Tran' }, 'P', 'PDto')
        ).toEqual({ first: 'Chau', last: 'Tran', full: 'Chau Tran' });
    });
});
