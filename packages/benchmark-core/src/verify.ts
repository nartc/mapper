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

// Independent validation of the bench: (1) assert every scenario maps CORRECTLY
// (so mitata isn't timing a silently no-op'd / wrong map), (2) re-time with a
// hand-rolled hrtime loop (no mitata) to corroborate the magnitude. Runs against
// whatever @automapper/* source is currently in the tree (this branch, or main
// when its src is overlaid), so the SAME assertions gate both sides.

let failures = 0;
const eq = (a: unknown, b: unknown, msg: string) => {
    if (JSON.stringify(a) !== JSON.stringify(b)) {
        failures++;
        console.error(`  FAIL: ${msg} — got ${JSON.stringify(a)}, want ${JSON.stringify(b)}`);
    }
};

const makeUser = (i: number) => ({
    firstName: `First${i}`,
    lastName: `Last${i}`,
    email: `USER${i}@Example.com`,
    age: 20 + (i % 50),
    active: i % 2 === 0,
    role: i % 3 === 0 ? 'admin' : 'user',
    score: i * 1.5,
    createdAt: 'Fri Jun 19 2026',
});
const makeSnakeUser = (i: number) => ({
    first_name: `First${i}`,
    last_name: `Last${i}`,
    email_address: `user${i}@example.com`,
    user_age: 20 + (i % 50),
    is_active: i % 2 === 0,
    user_role: i % 3 === 0 ? 'admin' : 'user',
});

PojosMetadataMap.create('User', {
    firstName: String, lastName: String, email: String, age: Number,
    active: Boolean, role: String, score: Number, createdAt: String,
});
PojosMetadataMap.create('UserDto', {
    firstName: String, lastName: String, email: String, age: Number,
    active: Boolean, role: String, score: Number, createdAt: String,
});
const pojosMapper = createMapper({ strategyInitializer: pojos() });
createMap(pojosMapper, 'User', 'UserDto');

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
class UserView {
    @AutoMap(() => String) firstName!: string;
    @AutoMap(() => String) lastName!: string;
    @AutoMap(() => String) fullName!: string;
    @AutoMap(() => String) emailLower!: string;
    @AutoMap(() => String) ageGroup!: string;
    @AutoMap(() => Boolean) isActive!: boolean;
    @AutoMap(() => String) roleLabel!: string;
    @AutoMap(() => Number) scoreRounded!: number;
}
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
const m = createMapper({ strategyInitializer: classes() });
createMap(m, User, UserDto);
createMap(m, User, UserView,
    forMember((d) => d.fullName, mapFrom((s) => `${s.firstName} ${s.lastName}`)),
    forMember((d) => d.emailLower, mapFrom((s) => s.email.toLowerCase())),
    forMember((d) => d.ageGroup, mapFrom((s) => (s.age < 30 ? 'young' : 'adult'))),
    forMember((d) => d.isActive, mapFrom((s) => s.active)),
    forMember((d) => d.roleLabel, mapFrom((s) => s.role.toUpperCase())),
    forMember((d) => d.scoreRounded, mapFrom((s) => Math.round(s.score))));
createMap(m, SnakeUser, CamelUserDto,
    namingConventions({ source: new SnakeCaseNamingConvention(), destination: new CamelCaseNamingConvention() }));

// ---- (1) correctness ----
console.log('correctness:');
const u = makeUser(7);
const KEYS = ['firstName','lastName','email','age','active','role','score','createdAt'] as const;

const pd = pojosMapper.map(u, 'User', 'UserDto') as Record<string, unknown>;
for (const k of KEYS) eq(pd[k], (u as never)[k], `pojos UserDto.${k}`);

const cd = m.map(u, User, UserDto) as Record<string, unknown>;
for (const k of KEYS) eq(cd[k], (u as never)[k], `classes UserDto.${k}`);

const v = m.map(u, User, UserView) as Record<string, unknown>;
eq(v.firstName, u.firstName, 'UserView.firstName (auto)');
eq(v.lastName, u.lastName, 'UserView.lastName (auto)');
eq(v.fullName, `${u.firstName} ${u.lastName}`, 'UserView.fullName (mapFrom)');
eq(v.emailLower, u.email.toLowerCase(), 'UserView.emailLower (mapFrom)');
eq(v.ageGroup, u.age < 30 ? 'young' : 'adult', 'UserView.ageGroup (mapFrom)');
eq(v.isActive, u.active, 'UserView.isActive (mapFrom)');
eq(v.roleLabel, u.role.toUpperCase(), 'UserView.roleLabel (mapFrom)');
eq(v.scoreRounded, Math.round(u.score), 'UserView.scoreRounded (mapFrom)');

const s = makeSnakeUser(7);
const nd = m.map(s, SnakeUser, CamelUserDto) as Record<string, unknown>;
eq(nd.firstName, s.first_name, 'CamelUserDto.firstName (naming)');
eq(nd.lastName, s.last_name, 'CamelUserDto.lastName (naming)');
eq(nd.emailAddress, s.email_address, 'CamelUserDto.emailAddress (naming)');
eq(nd.userAge, s.user_age, 'CamelUserDto.userAge (naming)');
eq(nd.isActive, s.is_active, 'CamelUserDto.isActive (naming)');
eq(nd.userRole, s.user_role, 'CamelUserDto.userRole (naming)');

console.log(failures ? `  ${failures} FAILURE(S)` : '  all correctness checks passed');

// ---- (2) independent hrtime timing (no mitata) ----
const POOL = 64;
const userPool = Array.from({ length: POOL }, (_, i) => makeUser(i));
const snakePool = Array.from({ length: POOL }, (_, i) => makeSnakeUser(i));
function time(label: string, fn: (i: number) => number, iters = 2_000_000) {
    for (let i = 0; i < 200_000; i++) fn(i); // warmup -> TurboFan
    let sink = 0;
    const t0 = process.hrtime.bigint();
    for (let i = 0; i < iters; i++) sink += fn(i);
    const t1 = process.hrtime.bigint();
    console.log(`  ${label.padEnd(22)} ${(Number(t1 - t0) / iters).toFixed(1).padStart(8)} ns/op  (sink ${sink & 255})`);
}
console.log('hrtime ns/op (independent of mitata):');
time('classes flat', (i) => (m.map(userPool[i & (POOL - 1)], User, UserDto) as { age: number }).age);
time('forMember+mapFrom', (i) => (m.map(userPool[i & (POOL - 1)], User, UserView) as { fullName: string }).fullName.length);
time('naming snake->camel', (i) => (m.map(snakePool[i & (POOL - 1)], SnakeUser, CamelUserDto) as { userAge: number }).userAge);

process.exit(failures ? 1 : 0);
