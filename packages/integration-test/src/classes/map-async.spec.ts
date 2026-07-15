import { AutoMap, classes } from '@automapper/classes';
import {
    afterMap,
    beforeMap,
    createMap,
    createMapper,
    forMember,
    ignore,
    mapFrom,
} from '@automapper/core';
import { SimpleUserDto } from './dtos/simple-user.dto';
import { SimpleUser } from './models/simple-user';

class AsyncNestedSource {
    @AutoMap()
    value!: string;
}

class AsyncNestedDestination {
    @AutoMap()
    value!: string;
}

class AsyncParentSource {
    @AutoMap(() => AsyncNestedSource)
    nested!: AsyncNestedSource;
}

class AsyncParentDestination {
    @AutoMap(() => AsyncNestedDestination)
    nested!: AsyncNestedDestination;

    @AutoMap()
    summary!: string;
}

describe('Map Async Classes', () => {
    const mapper = createMapper({ strategyInitializer: classes() });

    it('should map', async () => {
        createMap(
            mapper,
            SimpleUser,
            SimpleUserDto,
            forMember((d) => d.fullName, ignore()),
            afterMap(async (_, destination) => {
                const fullName = await Promise.resolve().then(
                    () => 'Tran Chau'
                );
                Object.assign(destination, { fullName });
            })
        );

        const dto = await mapper.mapAsync(
            new SimpleUser('Chau', 'Tran'),
            SimpleUser,
            SimpleUserDto
        );
        expect(dto.fullName).toEqual('Tran Chau');
    });

    it('awaits an async mapFrom member resolver', async () => {
        const localMapper = createMapper({ strategyInitializer: classes() });
        createMap(
            localMapper,
            SimpleUser,
            SimpleUserDto,
            forMember(
                (d) => d.fullName,
                mapFrom(
                    async (s) =>
                        await Promise.resolve(`${s.firstName} ${s.lastName}`)
                )
            )
        );

        const dto = await localMapper.mapAsync(
            new SimpleUser('Chau', 'Tran'),
            SimpleUser,
            SimpleUserDto
        );
        // the destination member must be the resolved value, not a Promise
        expect(dto.fullName).toEqual('Chau Tran');
    });

    it('throws when sync map receives an async member resolver', () => {
        const localMapper = createMapper({ strategyInitializer: classes() });
        createMap(
            localMapper,
            SimpleUser,
            SimpleUserDto,
            forMember(
                (d) => d.fullName,
                mapFrom(async (s) =>
                    Promise.resolve(`${s.firstName} ${s.lastName}`)
                )
            )
        );

        expect(() =>
            localMapper.map(
                new SimpleUser('Chau', 'Tran'),
                SimpleUser,
                SimpleUserDto
            )
        ).toThrow(/Use mapAsync\(\) or mapArrayAsync\(\)/);
    });

    it('awaits async members across mapArrayAsync', async () => {
        const localMapper = createMapper({ strategyInitializer: classes() });
        createMap(
            localMapper,
            SimpleUser,
            SimpleUserDto,
            forMember(
                (d) => d.fullName,
                mapFrom(
                    async (s) =>
                        await Promise.resolve(`${s.firstName} ${s.lastName}`)
                )
            )
        );

        const dtos = await localMapper.mapArrayAsync(
            [new SimpleUser('Chau', 'Tran'), new SimpleUser('John', 'Doe')],
            SimpleUser,
            SimpleUserDto
        );
        expect(dtos.map((d) => d.fullName)).toEqual(['Chau Tran', 'John Doe']);
    });

    it('runs afterMap only after async members have resolved', async () => {
        const localMapper = createMapper({ strategyInitializer: classes() });
        createMap(
            localMapper,
            SimpleUser,
            SimpleUserDto,
            forMember(
                (d) => d.fullName,
                mapFrom(
                    async (s) =>
                        await Promise.resolve(`${s.firstName} ${s.lastName}`)
                )
            ),
            afterMap((_, destination) => {
                // afterMap must observe the resolved async member, not a Promise
                Object.assign(destination, {
                    fullName: `${destination.fullName}!`,
                });
            })
        );

        const dto = await localMapper.mapAsync(
            new SimpleUser('Chau', 'Tran'),
            SimpleUser,
            SimpleUserDto
        );
        expect(dto.fullName).toEqual('Chau Tran!');
    });

    it('awaits async beforeMap before mapping members', async () => {
        const localMapper = createMapper({ strategyInitializer: classes() });
        createMap(
            localMapper,
            SimpleUser,
            SimpleUserDto,
            forMember(
                (d) => d.fullName,
                mapFrom(async (s) =>
                    Promise.resolve(`${s.firstName} ${s.lastName}`)
                )
            ),
            beforeMap(async (source) => {
                await Promise.resolve();
                source.firstName = 'Async';
            })
        );

        const dto = await localMapper.mapAsync(
            new SimpleUser('Chau', 'Tran'),
            SimpleUser,
            SimpleUserDto
        );

        expect(dto.fullName).toEqual('Async Tran');
    });

    it('runs parent afterMap after nested async beforeMap and nested afterMap', async () => {
        const localMapper = createMapper({ strategyInitializer: classes() });
        createMap(
            localMapper,
            AsyncNestedSource,
            AsyncNestedDestination,
            beforeMap(async (source) => {
                await Promise.resolve();
                source.value = 'before';
            }),
            afterMap((_source, destination) => {
                destination.value = `${destination.value}-child-after`;
            })
        );
        createMap(
            localMapper,
            AsyncParentSource,
            AsyncParentDestination,
            afterMap((_source, destination) => {
                destination.summary = destination.nested.value;
            })
        );

        const source = new AsyncParentSource();
        source.nested = new AsyncNestedSource();
        source.nested.value = 'initial';

        const dto = await localMapper.mapAsync(
            source,
            AsyncParentSource,
            AsyncParentDestination
        );

        expect(dto.nested.value).toEqual('before-child-after');
        expect(dto.summary).toEqual('before-child-after');
    });
});
