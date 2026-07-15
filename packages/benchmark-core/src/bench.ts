import 'reflect-metadata';
import { createMap, createMapper } from '@automapper/core';
import { AutoMap, classes } from '@automapper/classes';
import { pojos, PojosMetadataMap } from '@automapper/pojos';
import { bench, group, run } from 'mitata';
import {
    CamelUserDto,
    makeSnakeUser,
    makeUser,
    registerUserMaps,
    SnakeUser,
    User,
    UserDto,
    UserView,
} from './fixtures';

// ===========================================================================
// Fixtures (plain source objects — map() reads by property name). The User /
// Snake model + mappings are shared via ./fixtures; Address/Profile below are
// bench-only (nested-mapping scenarios).
// ===========================================================================
const makeProfile = (i: number) => ({
    id: `id-${i}`,
    username: `user${i}`,
    address: { street: `${i} Main St`, city: 'Town', zip: `${10000 + i}` },
    tags: ['a', 'b', 'c'],
});

const user = makeUser(1);
const users1000 = Array.from({ length: 1000 }, (_, i) => makeUser(i));
const profile = makeProfile(1);
const profiles1000 = Array.from({ length: 1000 }, (_, i) => makeProfile(i));
const snakeUsers1000 = Array.from({ length: 1000 }, (_, i) => makeSnakeUser(i));

// Rotating source pools (>=64 distinct objects). mitata reuses the same fixture
// each iteration, which lets V8 constant-fold a resolver over one fixed object
// and overstate the win; rotating through a pool keeps the measured cost
// representative of production polymorphism.
const POOL = 64;
const userPool = Array.from({ length: POOL }, (_, i) => makeUser(i));
const snakePool = Array.from({ length: POOL }, (_, i) => makeSnakeUser(i));
let userIdx = 0;
let snakeIdx = 0;

// ===========================================================================
// pojos strategy
// ===========================================================================
PojosMetadataMap.create('Address', {
    street: String,
    city: String,
    zip: String,
});
PojosMetadataMap.create('AddressDto', {
    street: String,
    city: String,
    zip: String,
});
PojosMetadataMap.create('User', {
    firstName: String,
    lastName: String,
    email: String,
    age: Number,
    active: Boolean,
    role: String,
    score: Number,
    createdAt: String,
});
PojosMetadataMap.create('UserDto', {
    firstName: String,
    lastName: String,
    email: String,
    age: Number,
    active: Boolean,
    role: String,
    score: Number,
    createdAt: String,
});
PojosMetadataMap.create('Profile', {
    id: String,
    username: String,
    address: 'Address',
    tags: [String],
});
PojosMetadataMap.create('ProfileDto', {
    id: String,
    username: String,
    address: 'AddressDto',
    tags: [String],
});

const pojosMapper = createMapper({ strategyInitializer: pojos() });
createMap(pojosMapper, 'Address', 'AddressDto');
createMap(pojosMapper, 'User', 'UserDto');
createMap(pojosMapper, 'Profile', 'ProfileDto');

// ===========================================================================
// classes strategy (explicit @AutoMap types — esbuild/tsx has no
// emitDecoratorMetadata, so design:type is provided explicitly). Address /
// Profile are bench-only nested fixtures; the User* set comes from ./fixtures.
// ===========================================================================
class Address {
    @AutoMap(() => String) street!: string;
    @AutoMap(() => String) city!: string;
    @AutoMap(() => String) zip!: string;
}
class AddressDto {
    @AutoMap(() => String) street!: string;
    @AutoMap(() => String) city!: string;
    @AutoMap(() => String) zip!: string;
}
class Profile {
    @AutoMap(() => String) id!: string;
    @AutoMap(() => String) username!: string;
    @AutoMap(() => Address) address!: Address;
    @AutoMap(() => [String]) tags!: string[];
}
class ProfileDto {
    @AutoMap(() => String) id!: string;
    @AutoMap(() => String) username!: string;
    @AutoMap(() => AddressDto) address!: AddressDto;
    @AutoMap(() => [String]) tags!: string[];
}

const classesMapper = createMapper({ strategyInitializer: classes() });
createMap(classesMapper, Address, AddressDto);
createMap(classesMapper, Profile, ProfileDto);
// User -> UserDto, User -> UserView (forMember+mapFrom), SnakeUser -> CamelUserDto
registerUserMaps(classesMapper);

// ===========================================================================
// Benchmarks (mitata uses the returned value as a sink to defeat DCE).
// Run under `--expose-gc` (see package.json `bench` script) so mitata reports
// the heap/gc columns; allocation is the dominant variable cost and the metric
// most likely to regress. `.gc('inner')` is set on the resolver/naming groups
// to surface a clean per-iteration heap delta.
// ===========================================================================

// --- Identity auto-map baseline (regression guard; latency-focused) ---
group('pojos / flat (8 primitive members)', () => {
    bench('map x1', () => pojosMapper.map(user, 'User', 'UserDto'));
    bench('mapArray x1000', () =>
        pojosMapper.mapArray(users1000, 'User', 'UserDto')
    );
});
group('classes / flat (8 primitive members)', () => {
    bench('map x1', () => classesMapper.map(user, User, UserDto));
    bench('mapArray x1000', () =>
        classesMapper.mapArray(users1000, User, UserDto)
    );
});
group('pojos / nested (object member + array)', () => {
    bench('map x1', () => pojosMapper.map(profile, 'Profile', 'ProfileDto'));
    bench('mapArray x1000', () =>
        pojosMapper.mapArray(profiles1000, 'Profile', 'ProfileDto')
    );
});
group('classes / nested (object member + array)', () => {
    bench('map x1', () => classesMapper.map(profile, Profile, ProfileDto));
    bench('mapArray x1000', () =>
        classesMapper.mapArray(profiles1000, Profile, ProfileDto)
    );
});

// --- forMember + mapFrom (2 auto + 6 mapFrom) ---
group('classes / forMember+mapFrom (2 auto + 6 mapFrom)', () => {
    bench('map x1 (rotating pool)', () =>
        classesMapper.map(userPool[userIdx++ & (POOL - 1)], User, UserView)
    ).gc('inner');
    bench('mapArray x1000', () =>
        classesMapper.mapArray(users1000, User, UserView)
    ).gc('inner');
});

// --- snake_case -> camelCase naming convention ---
group('classes / naming snake->camel (6 members)', () => {
    bench('map x1 (rotating pool)', () =>
        classesMapper.map(
            snakePool[snakeIdx++ & (POOL - 1)],
            SnakeUser,
            CamelUserDto
        )
    ).gc('inner');
    bench('mapArray x1000', () =>
        classesMapper.mapArray(snakeUsers1000, SnakeUser, CamelUserDto)
    ).gc('inner');
});

await run();
