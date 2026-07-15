import { classes } from '@automapper/classes';
import {
    addProfile,
    afterMapArray,
    beforeMapArray,
    CamelCaseNamingConvention,
    createMap,
    createMapper,
    forMember,
    mapFrom,
} from '@automapper/core';
import { SimpleUserDto } from './dtos/simple-user.dto';
import { SimpleUser } from './models/simple-user';
import { simpleUserProfileFactory } from './profiles/simple-user.profile';

describe('Map - Map Callback', () => {
    const mapper = createMapper({
        strategyInitializer: classes(),
        namingConventions: new CamelCaseNamingConvention(),
    });

    afterEach(() => {
        mapper.dispose();
    });

    it('should map with mapping callbacks', () => {
        const beforeMap = vi.fn();
        const afterMap = vi.fn();

        addProfile(mapper, simpleUserProfileFactory({ beforeMap, afterMap }));

        const simpleUser = new SimpleUser('Chau', 'Tran');

        expect(beforeMap).not.toHaveBeenCalled();
        expect(afterMap).not.toHaveBeenCalled();

        const dto = mapper.map(simpleUser, SimpleUser, SimpleUserDto);
        assertSimpleUser(dto, simpleUser);

        expect(beforeMap).toHaveBeenCalled();
        expect(afterMap).toHaveBeenCalled();
    });

    it('should map with map callbacks', () => {
        const beforeMap = vi.fn();
        const afterMap = vi.fn();

        addProfile(mapper, simpleUserProfileFactory());

        const simpleUser = new SimpleUser('Chau', 'Tran');

        expect(beforeMap).not.toHaveBeenCalled();
        expect(afterMap).not.toHaveBeenCalled();

        const dto = mapper.map(simpleUser, SimpleUser, SimpleUserDto, {
            beforeMap,
            afterMap,
        });

        assertSimpleUser(dto, simpleUser);

        expect(beforeMap).toHaveBeenCalled();
        expect(afterMap).toHaveBeenCalled();
    });

    it('should run with map callbacks if both map/mapping callbacks are provided', () => {
        const beforeMap = vi.fn();
        const afterMap = vi.fn();
        const mappingBeforeMap = vi.fn();
        const mappingAfterMap = vi.fn();

        addProfile(
            mapper,
            simpleUserProfileFactory({
                beforeMap: mappingBeforeMap,
                afterMap: mappingAfterMap,
            })
        );

        const simpleUser = new SimpleUser('Chau', 'Tran');

        expect(beforeMap).not.toHaveBeenCalled();
        expect(afterMap).not.toHaveBeenCalled();
        expect(mappingBeforeMap).not.toHaveBeenCalled();
        expect(mappingAfterMap).not.toHaveBeenCalled();

        const dto = mapper.map(simpleUser, SimpleUser, SimpleUserDto, {
            beforeMap,
            afterMap,
        });
        assertSimpleUser(dto, simpleUser);

        expect(beforeMap).toHaveBeenCalled();
        expect(afterMap).toHaveBeenCalled();
        expect(mappingBeforeMap).not.toHaveBeenCalled();
        expect(mappingAfterMap).not.toHaveBeenCalled();
    });

    it('should skip mapping callbacks with mapArray', () => {
        const beforeMap = vi.fn();
        const afterMap = vi.fn();

        addProfile(mapper, simpleUserProfileFactory({ beforeMap, afterMap }));

        const simpleUser = new SimpleUser('Chau', 'Tran');

        expect(beforeMap).not.toHaveBeenCalled();
        expect(afterMap).not.toHaveBeenCalled();

        const dtos = mapper.mapArray([simpleUser], SimpleUser, SimpleUserDto);
        dtos.forEach((dto) => {
            assertSimpleUser(dto, simpleUser);
        });

        expect(beforeMap).not.toHaveBeenCalled();
        expect(afterMap).not.toHaveBeenCalled();
    });

    it('should run map callbacks with mapArray', () => {
        const beforeMap = vi.fn();
        const afterMap = vi.fn();

        addProfile(mapper, simpleUserProfileFactory());

        const simpleUser = new SimpleUser('Chau', 'Tran');

        expect(beforeMap).not.toHaveBeenCalled();
        expect(afterMap).not.toHaveBeenCalled();

        const dtos = mapper.mapArray([simpleUser], SimpleUser, SimpleUserDto, {
            beforeMap,
            afterMap,
        });
        dtos.forEach((dto) => {
            assertSimpleUser(dto, simpleUser);
        });

        expect(beforeMap).toHaveBeenCalled();
        expect(afterMap).toHaveBeenCalled();
    });

    it('should run mapping-level array callbacks with mapArray', () => {
        const beforeMap = vi.fn();
        const afterMap = vi.fn();

        createMap(
            mapper,
            SimpleUser,
            SimpleUserDto,
            forMember(
                (d) => d.fullName,
                mapFrom((s) => s.firstName + ' ' + s.lastName)
            ),
            beforeMapArray(beforeMap),
            afterMapArray(afterMap)
        );

        const simpleUser = new SimpleUser('Chau', 'Tran');
        const dtos = mapper.mapArray([simpleUser], SimpleUser, SimpleUserDto);

        dtos.forEach((dto) => {
            assertSimpleUser(dto, simpleUser);
        });
        expect(beforeMap).toHaveBeenCalledWith([simpleUser], dtos);
        expect(afterMap).toHaveBeenCalledWith([simpleUser], dtos);
    });

    it('should prefer mapArray call callbacks over mapping-level array callbacks', () => {
        const beforeMap = vi.fn();
        const afterMap = vi.fn();
        const mappingBeforeMap = vi.fn();
        const mappingAfterMap = vi.fn();

        createMap(
            mapper,
            SimpleUser,
            SimpleUserDto,
            forMember(
                (d) => d.fullName,
                mapFrom((s) => s.firstName + ' ' + s.lastName)
            ),
            beforeMapArray(mappingBeforeMap),
            afterMapArray(mappingAfterMap)
        );

        const simpleUser = new SimpleUser('Chau', 'Tran');
        const dtos = mapper.mapArray([simpleUser], SimpleUser, SimpleUserDto, {
            beforeMap,
            afterMap,
        });

        dtos.forEach((dto) => {
            assertSimpleUser(dto, simpleUser);
        });
        expect(beforeMap).toHaveBeenCalled();
        expect(afterMap).toHaveBeenCalled();
        expect(mappingBeforeMap).not.toHaveBeenCalled();
        expect(mappingAfterMap).not.toHaveBeenCalled();
    });

    it('should await mapping-level array callbacks with mapArrayAsync', async () => {
        const beforeMap = vi.fn(async (source: SimpleUser[]) => {
            await Promise.resolve();
            source[0].firstName = 'Async';
        });
        const afterMap = vi.fn(
            async (_source: SimpleUser[], destination: SimpleUserDto[]) => {
                await Promise.resolve();
                destination[0].fullName = `${destination[0].fullName}!`;
            }
        );

        createMap(
            mapper,
            SimpleUser,
            SimpleUserDto,
            forMember(
                (d) => d.fullName,
                mapFrom((s) => s.firstName + ' ' + s.lastName)
            ),
            beforeMapArray(beforeMap),
            afterMapArray(afterMap)
        );

        const simpleUser = new SimpleUser('Chau', 'Tran');
        const dtos = await mapper.mapArrayAsync(
            [simpleUser],
            SimpleUser,
            SimpleUserDto
        );

        expect(beforeMap).toHaveBeenCalled();
        expect(afterMap).toHaveBeenCalled();
        expect(dtos).toHaveLength(1);
        expect(dtos[0].firstName).toEqual('Async');
        expect(dtos[0].lastName).toEqual('Tran');
        expect(dtos[0].fullName).toEqual('Async Tran!');
    });
});

function assertSimpleUser(dto: SimpleUserDto, user: SimpleUser) {
    expect(dto.firstName).toEqual(user.firstName);
    expect(dto.lastName).toEqual(user.lastName);
    expect(dto.fullName).toEqual(user.firstName + ' ' + user.lastName);
}
