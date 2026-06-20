import { createMap, createMapper } from '@automapper/core';
import { pojos, PojosMetadataMap } from '@automapper/pojos';
import { bench, group, run } from 'mitata';

// ---------------------------------------------------------------------------
// Metadata (pojos strategy — exercises the same core map() hot path as classes
// without decorator/reflect-metadata setup).
// ---------------------------------------------------------------------------
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

// flat: 8 primitive members (default mapInitialize path -> set())
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

// nested: object member (2 levels) + primitive array
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

const mapper = createMapper({ strategyInitializer: pojos() });
createMap(mapper, 'Address', 'AddressDto');
createMap(mapper, 'User', 'UserDto');
createMap(mapper, 'Profile', 'ProfileDto');

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------
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

const user = makeUser(1);
const users100 = Array.from({ length: 100 }, (_, i) => makeUser(i));
const users1000 = Array.from({ length: 1000 }, (_, i) => makeUser(i));

const profile = makeProfile(1);
const profiles1000 = Array.from({ length: 1000 }, (_, i) => makeProfile(i));

// ---------------------------------------------------------------------------
// Benchmarks (mitata returns the value as a sink to defeat DCE)
// ---------------------------------------------------------------------------
group('pojos / flat (8 primitive members)', () => {
    bench('map x1', () => mapper.map(user, 'User', 'UserDto'));
    bench('mapArray x100', () => mapper.mapArray(users100, 'User', 'UserDto'));
    bench('mapArray x1000', () => mapper.mapArray(users1000, 'User', 'UserDto'));
});

group('pojos / nested (object member + array)', () => {
    bench('map x1', () => mapper.map(profile, 'Profile', 'ProfileDto'));
    bench('mapArray x1000', () =>
        mapper.mapArray(profiles1000, 'Profile', 'ProfileDto'));
});

await run();
