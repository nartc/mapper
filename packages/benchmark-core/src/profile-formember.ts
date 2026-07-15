import 'reflect-metadata';
import { createMapper } from '@automapper/core';
import { classes } from '@automapper/classes';
import { makeUser, registerUserMaps, User, UserView } from './fixtures';

// ===========================================================================
// Focused CPU-profile driver for the common path: classes strategy,
// synchronous map(), forMember(mapFrom). Run under:
//   node --cpu-prof --cpu-prof-dir ./profiles --import tsx src/profile-formember.ts
// then analyze the emitted .cpuprofile with `pnpm tsx src/analyze-cpuprofile.ts`.
// Unlike mitata, this runs a single straight hot loop so self-time attributes
// cleanly to map()/set()/mapMember()/step-closures rather than the harness.
// ===========================================================================

const mapper = createMapper({ strategyInitializer: classes() });
registerUserMaps(mapper); // registers User -> UserView (among others)

const POOL = 64;
const pool = Array.from({ length: POOL }, (_, i) => makeUser(i));
const arr = Array.from({ length: 1000 }, (_, i) => makeUser(i));

// Warmup so TurboFan tiers up before the profiled steady state.
for (let i = 0; i < 200_000; i++) mapper.map(pool[i & (POOL - 1)], User, UserView);

const ITERS = 4_000_000;
let sink = 0;
const t0 = process.hrtime.bigint();
for (let i = 0; i < ITERS; i++) {
    const v = mapper.map(pool[i & (POOL - 1)], User, UserView) as {
        fullName: string;
    };
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
