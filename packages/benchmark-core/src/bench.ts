import 'reflect-metadata';
import { createMap, createMapper } from '@automapper/core';
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

const user = makeUser(1);
const users100 = Array.from({ length: 100 }, (_, i) => makeUser(i));
const users1000 = Array.from({ length: 1000 }, (_, i) => makeUser(i));
const profile = makeProfile(1);
const profiles1000 = Array.from({ length: 1000 }, (_, i) => makeProfile(i));

// ===========================================================================
// pojos strategy
// ===========================================================================
PojosMetadataMap.create('Address', { street: String, city: String, zip: String });
PojosMetadataMap.create('AddressDto', { street: String, city: String, zip: String });
PojosMetadataMap.create('User', {
    firstName: String, lastName: String, email: String, age: Number,
    active: Boolean, role: String, score: Number, createdAt: String,
});
PojosMetadataMap.create('UserDto', {
    firstName: String, lastName: String, email: String, age: Number,
    active: Boolean, role: String, score: Number, createdAt: String,
});
PojosMetadataMap.create('Profile', {
    id: String, username: String, address: 'Address', tags: [String],
});
PojosMetadataMap.create('ProfileDto', {
    id: String, username: String, address: 'AddressDto', tags: [String],
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

const classesMapper = createMapper({ strategyInitializer: classes() });
createMap(classesMapper, Address, AddressDto);
createMap(classesMapper, User, UserDto);
createMap(classesMapper, Profile, ProfileDto);

// ===========================================================================
// Benchmarks (mitata uses the returned value as a sink to defeat DCE)
// ===========================================================================
group('pojos / flat (8 primitive members)', () => {
    bench('map x1', () => pojosMapper.map(user, 'User', 'UserDto'));
    bench('mapArray x1000', () => pojosMapper.mapArray(users1000, 'User', 'UserDto'));
});
group('classes / flat (8 primitive members)', () => {
    bench('map x1', () => classesMapper.map(user, User, UserDto));
    bench('mapArray x1000', () => classesMapper.mapArray(users1000, User, UserDto));
});
group('pojos / nested (object member + array)', () => {
    bench('map x1', () => pojosMapper.map(profile, 'Profile', 'ProfileDto'));
    bench('mapArray x1000', () => pojosMapper.mapArray(profiles1000, 'Profile', 'ProfileDto'));
});
group('classes / nested (object member + array)', () => {
    bench('map x1', () => classesMapper.map(profile, Profile, ProfileDto));
    bench('mapArray x1000', () => classesMapper.mapArray(profiles1000, Profile, ProfileDto));
});

await run();
