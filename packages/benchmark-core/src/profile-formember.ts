import 'reflect-metadata';
import { createMap, createMapper, forMember, mapFrom } from '@automapper/core';
import { AutoMap, classes } from '@automapper/classes';

// ===========================================================================
// Focused CPU-profile driver for the common path: classes strategy,
// synchronous map(), forMember(mapFrom). Run under:
//   node --cpu-prof --cpu-prof-dir ./profiles --import tsx src/profile-formember.ts
// then analyze the emitted .cpuprofile with `pnpm tsx src/analyze-cpuprofile.ts`.
// Unlike mitata, this runs a single straight hot loop so self-time attributes
// cleanly to map()/set()/mapMember()/step-closures rather than the harness.
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

const mapper = createMapper({ strategyInitializer: classes() });
createMap(
    mapper,
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

const POOL = 64;
const pool = Array.from({ length: POOL }, (_, i) => makeUser(i));
const arr = Array.from({ length: 1000 }, (_, i) => makeUser(i));

// Warmup so TurboFan tiers up before the profiled steady state.
for (let i = 0; i < 200_000; i++) mapper.map(pool[i & (POOL - 1)], User, UserView);

const ITERS = 4_000_000;
let sink = 0;
const t0 = process.hrtime.bigint();
for (let i = 0; i < ITERS; i++) {
    const v = mapper.map(pool[i & (POOL - 1)], User, UserView);
    sink += v.fullName.length;
}
// a few large mapArray passes too (per-element compounding)
for (let i = 0; i < 2000; i++) {
    const out = mapper.mapArray(arr, User, UserView);
    sink += out.length;
}
const t1 = process.hrtime.bigint();

console.log(
    `profiled ${ITERS.toLocaleString()} single maps + 2000 mapArray(1000) in ${(
        Number(t1 - t0) / 1e6
    ).toFixed(0)} ms (sink=${sink}); ~${(Number(t1 - t0) / ITERS).toFixed(
        1
    )} ns/map. .cpuprofile written to ./profiles on exit.`
);
