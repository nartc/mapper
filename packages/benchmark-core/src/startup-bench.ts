import 'reflect-metadata';
import { createMap, createMapper, forMember, mapFrom } from '@automapper/core';
import { AutoMap, classes } from '@automapper/classes';

// ===========================================================================
// 408-createMap startup + retained-memory bench.
//
// A large app may call createMap hundreds of times at boot (classes strategy, many @AutoMap
// decorators), and every compiled plan is retained for the process lifetime of
// a long-running NestJS service. The steady-state `bench.ts` cannot see this:
// it measures map() throughput post-tiering, not the one-shot compile cost or
// the resident-memory footprint of the retained plans.
//
// This harness builds a tail-skewed class-size distribution representative of a
// large app (most classes small, a few very wide), runs all createMaps once
// (the realistic boot path — no warmup/tiering), and reports:
//   - wall time of createMap + buildMapPlan via process.hrtime.bigint()
//   - retained heapUsed after global.gc() x3 (requires --expose-gc)
// It is the instrument for the startup/memory optimizations.
// Run: `node --expose-gc --import tsx src/startup-bench.ts`.
// ===========================================================================

// --- tail-skewed @AutoMap class-size distribution, total ~408 plans ----------
function buildSizeDistribution(): number[] {
    const sizes: number[] = [];
    sizes.push(197, 188); // the long tail (a couple of god-DTOs)
    for (let i = 0; i < 4; i++) sizes.push(100);
    for (let i = 0; i < 10; i++) sizes.push(60);
    for (let i = 0; i < 44; i++) sizes.push(21); // mid-size tier
    // remainder are small classes (5..10 props): deterministic spread
    while (sizes.length < 408) sizes.push(5 + (sizes.length % 6));
    return sizes;
}

// Build a class with `numProps` @AutoMap string properties, applied imperatively
// (identical to the `@AutoMap(() => String)` field decorator). The decorator's
// O(P^2) metadata spread (automap.ts) is intentionally exercised.
function makeMetadataClass(numProps: number): new () => Record<string, unknown> {
    const C = class {} as new () => Record<string, unknown>;
    for (let i = 0; i < numProps; i++) {
        AutoMap(() => String)(C.prototype as object, 'p' + i);
    }
    return C;
}

interface TrialResult {
    plans: number;
    totalProps: number;
    wallMs: number;
    retainedMB: number;
}

const retained: unknown[] = []; // hold references so plans aren't collected pre-measure

function gcTimes(n: number): void {
    const gc = (globalThis as { gc?: () => void }).gc;
    if (!gc) return;
    for (let i = 0; i < n; i++) gc();
}

function runTrial(sizes: number[]): TrialResult {
    const mapper = createMapper({ strategyInitializer: classes() });
    // Pre-create the class pairs (decorator cost) BEFORE the timed region so the
    // measurement isolates createMap + buildMapPlan, not decoration.
    const pairs = sizes.map((n) => ({
        Source: makeMetadataClass(n),
        Dest: makeMetadataClass(n),
        n,
    }));
    const totalProps = sizes.reduce((a, b) => a + b, 0);

    gcTimes(3);
    const heapBefore = process.memoryUsage().heapUsed;

    const t0 = process.hrtime.bigint();
    for (const { Source, Dest } of pairs) {
        // 2 forMember(mapFrom) per plan exercises the config path (getMetadataAtMember,
        // getNestedMappingPair, processSourcePath) exercised by forMember/mapFrom.
        createMap(
            mapper,
            Source,
            Dest,
            forMember(
                (d: Record<string, unknown>) => d['p0'],
                mapFrom((s: Record<string, unknown>) => s['p0'])
            ),
            forMember(
                (d: Record<string, unknown>) => d['p1'],
                mapFrom((s: Record<string, unknown>) => s['p1'])
            )
        );
    }
    const t1 = process.hrtime.bigint();

    gcTimes(3);
    const heapAfter = process.memoryUsage().heapUsed;

    retained.push(mapper, pairs);

    return {
        plans: sizes.length,
        totalProps,
        wallMs: Number(t1 - t0) / 1e6,
        retainedMB: (heapAfter - heapBefore) / (1024 * 1024),
    };
}

const sizes = buildSizeDistribution();
const TRIALS = 3;

if (!(globalThis as { gc?: () => void }).gc) {
    console.warn(
        '[startup-bench] global.gc is unavailable — run with `node --expose-gc --import tsx src/startup-bench.ts` for accurate retained-memory numbers.'
    );
}

console.log(
    `\n408-createMap startup bench — ${sizes.length} plans, ${sizes.reduce(
        (a, b) => a + b,
        0
    )} total props (max ${Math.max(...sizes)}), classes strategy, 2 forMember(mapFrom) each\n`
);
console.log('trial |   plans | totalProps |   wall (ms) | retained (MB)');
console.log('------+---------+------------+-------------+--------------');
const results: TrialResult[] = [];
for (let t = 0; t < TRIALS; t++) {
    const r = runTrial(sizes);
    results.push(r);
    console.log(
        `${String(t + 1).padStart(5)} | ${String(r.plans).padStart(
            7
        )} | ${String(r.totalProps).padStart(10)} | ${r.wallMs
            .toFixed(2)
            .padStart(11)} | ${r.retainedMB.toFixed(2).padStart(12)}`
    );
}

const avg = (xs: number[]) => xs.reduce((a, b) => a + b, 0) / xs.length;
console.log('------+---------+------------+-------------+--------------');
console.log(
    `  avg |         |            | ${avg(results.map((r) => r.wallMs))
        .toFixed(2)
        .padStart(11)} | ${avg(results.map((r) => r.retainedMB))
        .toFixed(2)
        .padStart(12)}`
);
console.log(
    '\nNote: retained MB is heapUsed delta across the createMap loop after gc x3 — the resident cost of the compiled plans + stored metadata. It is the before/after instrument for the dropped plan array and O(P^2) startup fixes.\n'
);
