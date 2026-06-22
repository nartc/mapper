import 'reflect-metadata';
import {
    CamelCaseNamingConvention,
    createMap,
    createMapper,
    forMember,
    mapFrom,
    namingConventions,
    SnakeCaseNamingConvention,
} from '@automapper/core';
import { AutoMap, classes } from '@automapper/classes';
import { pojos, PojosMetadataMap } from '@automapper/pojos';
import { bench, group, run } from 'mitata';

// ===========================================================================
// Shared fixtures (plain source objects — map() reads by property name)
// ===========================================================================
const makeUser = (i: number) => ({
    firstName: `First${i}`,
    lastName: `Last${i}`,
    email: `user${i}@example.com`,
    age: 20 + (i % 50),
    active: i % 2 === 0,
    role: i % 3 === 0 ? 'admin' : 'user',
    score: i * 1.5,
    createdAt: 'Fri Jun 19 2026',
});
const makeProfile = (i: number) => ({
    id: `id-${i}`,
    username: `user${i}`,
    address: { street: `${i} Main St`, city: 'Town', zip: `${10000 + i}` },
    tags: ['a', 'b', 'c'],
});
// snake_case source — exercises the source->dest naming-convention rename path
const makeSnakeUser = (i: number) => ({
    first_name: `First${i}`,
    last_name: `Last${i}`,
    email_address: `user${i}@example.com`,
    user_age: 20 + (i % 50),
    is_active: i % 2 === 0,
    user_role: i % 3 === 0 ? 'admin' : 'user',
});

const user = makeUser(1);
const users100 = Array.from({ length: 100 }, (_, i) => makeUser(i));
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
// emitDecoratorMetadata, so design:type is provided explicitly)
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
class User {
    @AutoMap(() => String) firstName!: string;
    @AutoMap(() => String) lastName!: string;
    @AutoMap(() => String) email!: string;
    @AutoMap(() => Number) age!: number;
    @AutoMap(() => Boolean) active!: boolean;
    @AutoMap(() => String) role!: string;
    @AutoMap(() => Number) score!: number;
    @AutoMap(() => String) createdAt!: string;
}
class UserDto {
    @AutoMap(() => String) firstName!: string;
    @AutoMap(() => String) lastName!: string;
    @AutoMap(() => String) email!: string;
    @AutoMap(() => Number) age!: number;
    @AutoMap(() => Boolean) active!: boolean;
    @AutoMap(() => String) role!: string;
    @AutoMap(() => Number) score!: number;
    @AutoMap(() => String) createdAt!: string;
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

// --- Realistic classes mapping: forMember + mapFrom resolvers ---
// 2 auto-mapped (same-name) + 6 mapFrom-derived members. forMember + mapFrom
// are a common real-world configuration; the existing identity
// groups exercise NONE of this path.
class UserView {
    @AutoMap(() => String) firstName!: string; // auto (same name)
    @AutoMap(() => String) lastName!: string; // auto (same name)
    @AutoMap(() => String) fullName!: string; // mapFrom
    @AutoMap(() => String) emailLower!: string; // mapFrom
    @AutoMap(() => String) ageGroup!: string; // mapFrom
    @AutoMap(() => Boolean) isActive!: boolean; // mapFrom
    @AutoMap(() => String) roleLabel!: string; // mapFrom
    @AutoMap(() => Number) scoreRounded!: number; // mapFrom
}

// --- Realistic classes mapping: snake_case -> camelCase rename ---
class SnakeUser {
    @AutoMap(() => String) first_name!: string;
    @AutoMap(() => String) last_name!: string;
    @AutoMap(() => String) email_address!: string;
    @AutoMap(() => Number) user_age!: number;
    @AutoMap(() => Boolean) is_active!: boolean;
    @AutoMap(() => String) user_role!: string;
}
class CamelUserDto {
    @AutoMap(() => String) firstName!: string;
    @AutoMap(() => String) lastName!: string;
    @AutoMap(() => String) emailAddress!: string;
    @AutoMap(() => Number) userAge!: number;
    @AutoMap(() => Boolean) isActive!: boolean;
    @AutoMap(() => String) userRole!: string;
}

const classesMapper = createMapper({ strategyInitializer: classes() });
createMap(classesMapper, Address, AddressDto);
createMap(classesMapper, User, UserDto);
createMap(classesMapper, Profile, ProfileDto);
createMap(
    classesMapper,
    User,
    UserView,
    forMember(
        (d) => d.fullName,
        mapFrom((s) => `${s.firstName} ${s.lastName}`)
    ),
    forMember(
        (d) => d.emailLower,
        mapFrom((s) => s.email.toLowerCase())
    ),
    forMember(
        (d) => d.ageGroup,
        mapFrom((s) => (s.age < 30 ? 'young' : 'adult'))
    ),
    forMember(
        (d) => d.isActive,
        mapFrom((s) => s.active)
    ),
    forMember(
        (d) => d.roleLabel,
        mapFrom((s) => s.role.toUpperCase())
    ),
    forMember(
        (d) => d.scoreRounded,
        mapFrom((s) => Math.round(s.score))
    )
);
createMap(
    classesMapper,
    SnakeUser,
    CamelUserDto,
    namingConventions({
        source: new SnakeCaseNamingConvention(),
        destination: new CamelCaseNamingConvention(),
    })
);

// ===========================================================================
// Benchmarks (mitata uses the returned value as a sink to defeat DCE).
// Run under `--expose-gc` (see package.json `bench` script) so mitata reports
// the heap/gc columns; allocation is the dominant variable cost and the metric
// most likely to regress. `.gc('inner')` is set on the resolver/naming
// groups to surface a clean per-iteration heap delta.
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

// keep the 100-element fixture referenced so it isn't tree-shaken from the
// module (used for ad-hoc tweaks); no-op at runtime.
void users100;
