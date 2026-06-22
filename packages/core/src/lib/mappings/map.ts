import { MapMemberError } from '../errors';
import { getErrorHandler } from '../symbols';
import type {
    CompiledMapping,
    CompiledMappingProperty,
    Constructor,
    Dictionary,
    ErrorHandler,
    MapInitializeReturn,
    Mapper,
    MapOptions,
    Mapping,
    MetadataIdentifier,
} from '../types';
import { MapFnClassId, MappingClassId, TransformationType } from '../types';
import {
    assertUnmappedProperties,
    computeUnmappedCandidateKeys,
} from '../utils/assert-unmapped-properties';
import { get } from '../utils/get';
import { getMapping } from '../utils/get-mapping';
import { isMappableIdentifier } from '../utils/is-mappable-identifier';
import { isEmpty } from '../utils/is-empty';
import { isPrimitiveConstructor } from '../utils/is-primitive-constructor';
import { set, setMutate } from '../utils/set';
import { compileMapping } from './compile-mapping';
import { mapMember } from './map-member';

// Well-known Symbol.toStringTag, hoisted once. A genuine File (and any
// File-like value) reports `[object File]`, i.e. its [Symbol.toStringTag] is
// 'File'; reading the symbol directly avoids the per-call
// `Object.prototype.toString.call(x).slice(8, -1)` string allocation on the hot
// MapInitialize path. NOT constructor.name, which false-positives on user
// classes named "File".
const FILE_TAG = Symbol.toStringTag;

// Direct per-member writer (no per-member closure). set() returns the same
// object reference for a non-empty path, so the old `destination = set(...)`
// reassignment was a no-op and is dropped.
function setMemberReturnFn<TDestination extends Dictionary<TDestination> = any>(
    destinationMemberPath: string[],
    destination: TDestination | undefined,
    value: unknown
) {
    if (destination) {
        set(destination, destinationMemberPath, value);
    }
}

export function mapReturn<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>
>(
    mapping: Mapping<TSource, TDestination>,
    sourceObject: TSource,
    options: MapOptions<TSource, TDestination>,
    isMapArray = false
): TDestination {
    return map<TSource, TDestination>({
        mapping,
        sourceObject,
        options,
        setMemberFn: setMemberReturnFn,
        isMapArray,
    });
}

function setMemberMutateFn(destinationObj: Record<string, unknown>) {
    return (
        destinationMember: string[],
        _destination: unknown,
        value: unknown
    ) => {
        if (value !== undefined) {
            setMutate(destinationObj, destinationMember, value);
        }
    };
}

function getMemberMutateFn(destinationObj: Record<string, unknown>) {
    return (memberPath: string[] | undefined) =>
        get(destinationObj, memberPath) as Record<string, unknown>;
}

export function mapMutate<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>
>(
    mapping: Mapping<TSource, TDestination>,
    sourceObject: TSource,
    destinationObj: TDestination,
    options: MapOptions<TSource, TDestination>,
    isMapArray = false
): void {
    map({
        sourceObject,
        mapping,
        setMemberFn: setMemberMutateFn(destinationObj),
        getMemberFn: getMemberMutateFn(destinationObj),
        options,
        isMapArray,
    });
}

interface MapParameter<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>
> {
    sourceObject: TSource;
    mapping: Mapping<TSource, TDestination>;
    options: MapOptions<TSource, TDestination>;
    setMemberFn: (
        destinationMemberPath: string[],
        destination: TDestination | undefined,
        value: unknown
    ) => void;
    getMemberFn?: (
        destinationMemberPath: string[] | undefined
    ) => Record<string, unknown>;
    isMapArray?: boolean;
}

// TRUE async support. The map engine itself is synchronous, but
// mapAsync()/mapArrayAsync()/mutate(Array)Async() run it inside an "async
// context" so they can await work that only resolves later:
//   - async member resolvers (mapFrom/convertUsing/mapWith/... returning a
//     promise): the resolved value is assigned once it settles, instead of a
//     Promise leaking onto the destination;
//   - async before-map callbacks: collected and awaited;
//   - after-map callbacks: DEFERRED until members have settled, so they observe
//     a fully-mapped destination (and are awaited too if async).
// In the synchronous path the context is null and behaviour/throughput are
// unchanged (one null-check per member).
export interface AsyncMapContext {
    // member-value + before-map promises, awaited before the deferred after-maps
    pending: Promise<unknown>[];
    // after-map thunks, run in collection order (depth-first) once pending settles
    deferredAfterMaps: Array<{
        fn: () => unknown;
        depth: number;
        order: number;
    }>;
    nextAfterMapOrder: number;
}

let asyncMapContext: AsyncMapContext | null = null;
let asyncMapDepth = 0;

export function isAsyncMapActive(): boolean {
    return asyncMapContext !== null;
}

export function getAsyncMapContext(): AsyncMapContext | null {
    return asyncMapContext;
}

export function runInAsyncMapContext<T>(
    context: AsyncMapContext,
    fn: () => T
): T {
    const previous = asyncMapContext;
    asyncMapContext = context;
    try {
        return fn();
    } finally {
        asyncMapContext = previous;
    }
}

export function isThenable(value: unknown): value is Promise<unknown> {
    return (
        value != null &&
        typeof (value as { then?: unknown }).then === 'function'
    );
}

// Run a synchronous map() call inside a fresh async context and hand back the
// context. Nested map() calls share whichever context is active, so a nested
// map's async members/after-maps are collected by the outermost mapAsync().
export function runAsyncMap<T>(fn: () => T): [T, AsyncMapContext] {
    const previous = asyncMapContext;
    const previousDepth = asyncMapDepth;
    const context: AsyncMapContext = {
        pending: [],
        deferredAfterMaps: [],
        nextAfterMapOrder: 0,
    };
    asyncMapContext = context;
    asyncMapDepth = 0;
    try {
        return [fn(), context];
    } finally {
        asyncMapContext = previous;
        asyncMapDepth = previousDepth;
    }
}

// Await everything a context collected: pending member/before-map promises
// first, then the deferred after-maps (sequentially; each may be async).
export async function settleAsyncMap(context: AsyncMapContext): Promise<void> {
    while (context.pending.length) {
        await Promise.all(context.pending.splice(0));
    }
    while (context.deferredAfterMaps.length) {
        context.deferredAfterMaps.sort(
            (a, b) => b.depth - a.depth || a.order - b.order
        );
        const { fn } = context.deferredAfterMaps.shift()!;
        const result = runInAsyncMapContext(context, fn);
        if (isThenable(result)) await result;
        while (context.pending.length) {
            await Promise.all(context.pending.splice(0));
        }
    }
}

// Collect a promise (e.g. an async before-map) to await before after-maps run.
export function pushAsyncPending(value: unknown): void {
    if (asyncMapContext !== null && isThenable(value)) {
        asyncMapContext.pending.push(value as Promise<unknown>);
    }
}

// Defer an after-map (array-level or mapping-level) past member resolution when
// running async; runs it immediately when synchronous.
function runAtAsyncMapDepth<T>(depth: number, fn: () => T): T {
    const previousDepth = asyncMapDepth;
    asyncMapDepth = depth;
    try {
        return fn();
    } finally {
        asyncMapDepth = previousDepth;
    }
}

export function deferAsyncAfterMap(
    fn: () => unknown,
    depth = asyncMapDepth
): void {
    if (asyncMapContext !== null) {
        asyncMapContext.deferredAfterMaps.push({
            fn,
            depth,
            order: asyncMapContext.nextAfterMapOrder++,
        });
    } else {
        fn();
    }
}

export function deferAsyncAfterMapAfterPending(
    fn: () => unknown,
    depth = asyncMapDepth
): void {
    if (asyncMapContext !== null && asyncMapContext.pending.length) {
        const context = asyncMapContext;
        const pendingBeforeAfterMap = context.pending.slice();
        context.pending.push(
            Promise.all(pendingBeforeAfterMap).then(() =>
                runInAsyncMapContext(context, () =>
                    deferAsyncAfterMap(fn, depth)
                )
            )
        );
        return;
    }

    deferAsyncAfterMap(fn, depth);
}

// Wrap a member failure (sync throw or async rejection) as MapMemberError and
// route it through the mapper's error handler. Module-level so the hot map loop
// allocates no per-member closure for it.
function makeMemberError(
    destinationMemberPath: string[],
    destinationIdentifier: MetadataIdentifier,
    errorHandler: ErrorHandler,
    originalError: unknown
): MapMemberError {
    const destinationName =
        (destinationIdentifier as Constructor)['prototype']?.constructor
            ?.name || destinationIdentifier.toString();
    // note: do NOT JSON.stringify(destination) here — it throws on circular
    // references and floods logs on large objects.
    const error = new MapMemberError(
        String(destinationMemberPath),
        destinationName,
        originalError
    );
    errorHandler.handle(error.message);
    return error;
}

// Per-call state handed to each compiled step. Built once per map() call; the
// step closures capture everything that is invariant per mapping (paths,
// transformation fns, precomputed identifier flags) at compile time and read
// only the call-varying bits from here.
interface MapStepContext<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>
> {
    sourceObject: TSource;
    destination: TDestination;
    extraArguments: Record<string, unknown> | undefined;
    extraArgs: MapOptions<TSource, TDestination>['extraArgs'];
    mapper: Mapper;
    errorHandler: ErrorHandler;
    destinationIdentifier: MetadataIdentifier;
    setMemberFn: MapParameter<TSource, TDestination>['setMemberFn'];
    getMemberFn: MapParameter<TSource, TDestination>['getMemberFn'];
}

type MapStep<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>
> = (context: MapStepContext<TSource, TDestination>) => void;

// Assign an already-resolved value onto the destination. In an async context a
// thenable is awaited and the *resolved* value assigned (the promise is collected
// as pending); async rejections wrap via makeMemberError. NO try/catch here — the
// caller wraps sync throws so the failure is wrapped exactly once.
function assignResolved<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>
>(
    value: unknown,
    destinationMemberPath: string[],
    ctx: MapStepContext<TSource, TDestination>
): void {
    if (isThenable(value)) {
        if (asyncMapContext === null) {
            throw new Error(
                'Async member mapping returned a Promise during synchronous map(). Use mapAsync() or mapArrayAsync() instead.'
            );
        }

        asyncMapContext.pending.push(
            Promise.resolve(value)
                .then((resolved) =>
                    ctx.setMemberFn(
                        destinationMemberPath,
                        ctx.destination,
                        resolved
                    )
                )
                .catch((originalError) => {
                    throw makeMemberError(
                        destinationMemberPath,
                        ctx.destinationIdentifier,
                        ctx.errorHandler,
                        originalError
                    );
                })
        );
        return;
    }
    ctx.setMemberFn(destinationMemberPath, ctx.destination, value);
}

// Assign a precomputed auto-map value (its production already happened). This is
// the hot path — a same-identifier / primitive / Date / array value assigned
// as-is — so it uses the async-first short-circuit and never tests isThenable on
// the synchronous path. (An auto-mapped source value that is itself a thenable is
// awaited under mapAsync() and assigned as-is under map(), matching the original
// pre-async behavior; the sync-thenable guard intentionally lives on the resolver
// path in assignResolved, where async member resolvers actually originate.)
function assignMember<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>
>(
    value: unknown,
    destinationMemberPath: string[],
    ctx: MapStepContext<TSource, TDestination>
): void {
    try {
        if (asyncMapContext !== null && isThenable(value)) {
            asyncMapContext.pending.push(
                Promise.resolve(value)
                    .then((resolved) =>
                        ctx.setMemberFn(
                            destinationMemberPath,
                            ctx.destination,
                            resolved
                        )
                    )
                    .catch((originalError) => {
                        throw makeMemberError(
                            destinationMemberPath,
                            ctx.destinationIdentifier,
                            ctx.errorHandler,
                            originalError
                        );
                    })
            );
            return;
        }
        ctx.setMemberFn(destinationMemberPath, ctx.destination, value);
    } catch (originalError) {
        throw makeMemberError(
            destinationMemberPath,
            ctx.destinationIdentifier,
            ctx.errorHandler,
            originalError
        );
    }
}

// Produce a value (which may throw — nested map(), mapMember(), etc.) then assign
// it. A single try wraps both production and assignment, matching the original
// per-member setMember semantics (one MapMemberError wrap on failure).
function setMemberValue<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>
>(
    valueFn: () => unknown,
    destinationMemberPath: string[],
    ctx: MapStepContext<TSource, TDestination>
): void {
    try {
        assignResolved(valueFn(), destinationMemberPath, ctx);
    } catch (originalError) {
        throw makeMemberError(
            destinationMemberPath,
            ctx.destinationIdentifier,
            ctx.errorHandler,
            originalError
        );
    }
}

// Specialize one property into a step closure. The TransformationType switch and
// the per-mapping-invariant identifier equality are resolved here, once, so the
// map() loop is straight-line `steps[i](context)`.
function compileStep<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>
>(
    prop: CompiledMappingProperty<TSource, TDestination>
): MapStep<TSource, TDestination> {
    const {
        destinationMemberPath,
        transformationMapFn,
        transformationType,
        transformationPreConditionPredicate: preCond,
        transformationPreConditionDefaultValue: preCondDefault,
        destinationMemberIdentifier,
        sourceMemberIdentifier,
    } = prop;

    // MapFrom is the most common member transform. Call the selector directly
    // and assign, skipping both the per-member `() => mapMember(...)` thunk and
    // the mapMember() type switch — mapMember's MapFrom arm is exactly
    // `value = mapFn(sourceObject)` (no implicit member mapping), so this is
    // equivalent. One try/catch wraps production + assignment in a single
    // MapMemberError, matching setMemberValue.
    if (transformationType === TransformationType.MapFrom) {
        const mapFromFn = transformationMapFn[MapFnClassId.fn] as (
            source: TSource
        ) => unknown;
        return (ctx) => {
            if (preCond && !preCond(ctx.sourceObject)) {
                assignMember(preCondDefault, destinationMemberPath, ctx);
                return;
            }
            try {
                assignResolved(
                    mapFromFn(ctx.sourceObject),
                    destinationMemberPath,
                    ctx
                );
            } catch (originalError) {
                throw makeMemberError(
                    destinationMemberPath,
                    ctx.destinationIdentifier,
                    ctx.errorHandler,
                    originalError
                );
            }
        };
    }

    // Everything else that isn't MapInitialize dispatches through mapMember();
    // no identifier/value-shape inspection is needed here.
    if (transformationType !== TransformationType.MapInitialize) {
        return (ctx) => {
            if (preCond && !preCond(ctx.sourceObject)) {
                assignMember(preCondDefault, destinationMemberPath, ctx);
                return;
            }
            setMemberValue(
                () =>
                    mapMember(
                        transformationMapFn,
                        ctx.sourceObject,
                        ctx.destination,
                        destinationMemberPath,
                        ctx.extraArguments,
                        ctx.mapper,
                        sourceMemberIdentifier,
                        destinationMemberIdentifier
                    ),
                destinationMemberPath,
                ctx
            );
        };
    }

    // MapInitialize. Hoist the invariant pieces: the initialize fn, the
    // typeConverter flag, the identifier-equality *candidate* (the registry
    // lookup that completes it stays at runtime), and whether the destination
    // identifier is a primitive constructor.
    const mapInitializeFn = transformationMapFn[
        MapFnClassId.fn
    ] as MapInitializeReturn<TSource, TDestination>[MapFnClassId.fn];
    const isTypedConverted = transformationMapFn[MapFnClassId.isConverted];
    const sameIdentifierCandidate =
        isMappableIdentifier(destinationMemberIdentifier) &&
        isMappableIdentifier(sourceMemberIdentifier) &&
        sourceMemberIdentifier === destinationMemberIdentifier;
    const destinationIsPrimitive = isPrimitiveConstructor(
        destinationMemberIdentifier
    );

    return (ctx) => {
        if (preCond && !preCond(ctx.sourceObject)) {
            assignMember(preCondDefault, destinationMemberPath, ctx);
            return;
        }

        const mapInitializedValue = mapInitializeFn(ctx.sourceObject);

        // Scalar fast-path: null/undefined and primitives are assigned as-is and
        // can never be a Date/File/Array or carry a nested mapping of their own,
        // so they skip the identifier registry probe and the Date/File tag checks
        // entirely. This is the bulk of @AutoMap members (same-name primitives).
        if (
            mapInitializedValue == null ||
            typeof mapInitializedValue !== 'object'
        ) {
            assignMember(mapInitializedValue, destinationMemberPath, ctx);
            return;
        }

        // From here mapInitializedValue is a non-null object. A same identifier
        // that isn't a Date/File AND has no mapping of its own is assigned as-is;
        // getMapping is only consulted when the (invariant) candidate held.
        const hasSameIdentifier =
            sameIdentifierCandidate &&
            !getMapping(
                ctx.mapper,
                sourceMemberIdentifier as MetadataIdentifier,
                destinationMemberIdentifier as MetadataIdentifier,
                true
            );

        if (
            mapInitializedValue instanceof Date ||
            (mapInitializedValue as Record<symbol, unknown>)[FILE_TAG] ===
                'File' ||
            hasSameIdentifier ||
            isTypedConverted
        ) {
            assignMember(mapInitializedValue, destinationMemberPath, ctx);
            return;
        }

        if (Array.isArray(mapInitializedValue)) {
            const [first] = mapInitializedValue;
            // primitive/Date/File element array — shallow copy. The optional
            // chain keeps a null first element on the empty/isEmpty path below.
            if (
                typeof first !== 'object' ||
                first instanceof Date ||
                (first as Record<symbol, unknown> | null)?.[FILE_TAG] === 'File'
            ) {
                assignMember(
                    mapInitializedValue.slice(),
                    destinationMemberPath,
                    ctx
                );
                return;
            }

            if (isEmpty(first)) {
                assignMember([], destinationMemberPath, ctx);
                return;
            }

            // object array but destination identifier is primitive — skip
            if (destinationIsPrimitive) {
                return;
            }

            setMemberValue(
                () =>
                    mapInitializedValue.map((each) =>
                        mapReturn(
                            getMapping(
                                ctx.mapper,
                                sourceMemberIdentifier as MetadataIdentifier,
                                destinationMemberIdentifier as MetadataIdentifier
                            ),
                            each,
                            { extraArgs: ctx.extraArgs }
                        )
                    ),
                destinationMemberPath,
                ctx
            );
            return;
        }

        // non-null, non-array object: map it through its nested mapping. (The
        // scalar fast-path above already handled primitives, so this is the only
        // remaining case — no `typeof === 'object'` guard needed.)
        const nestedMapping = getMapping(
            ctx.mapper,
            sourceMemberIdentifier as MetadataIdentifier,
            destinationMemberIdentifier as MetadataIdentifier
        );

        // nested mutate — recurse directly (unwrapped, as before)
        if (ctx.getMemberFn) {
            const memberValue = ctx.getMemberFn(destinationMemberPath);
            if (memberValue !== undefined) {
                map({
                    sourceObject: mapInitializedValue as TSource,
                    mapping: nestedMapping,
                    options: { extraArgs: ctx.extraArgs },
                    setMemberFn: setMemberMutateFn(memberValue),
                    getMemberFn: getMemberMutateFn(memberValue),
                });
            }
            return;
        }

        setMemberValue(
            () =>
                map({
                    mapping: nestedMapping,
                    sourceObject: mapInitializedValue as TSource,
                    options: { extraArgs: ctx.extraArgs },
                    setMemberFn: setMemberReturnFn,
                }),
            destinationMemberPath,
            ctx
        );
    };
}

// Build the full compiled plan for a mapping's properties: flat descriptors,
// configured keys, and the specialized step closures. Called once at createMap.
export function buildMapPlan<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>
>(
    propsToMap: Mapping<TSource, TDestination>[MappingClassId.properties],
    destinationMetadata: TDestination
): CompiledMapping<TSource, TDestination> {
    const { props, configuredKeys } = compileMapping<TSource, TDestination>(
        propsToMap
    );
    const steps: MapStep<TSource, TDestination>[] = new Array(props.length);
    for (let i = 0, length = props.length; i < length; i++) {
        steps[i] = compileStep(props[i]);
    }
    // Precompute the unmapped-candidate residual (writable destination keys this
    // mapping doesn't configure) once, here, so assertUnmappedProperties never
    // rebuilds a per-call Set nor rescans the full writable-key list on the hot
    // path (it runs on every map() / every mapArray element).
    const unmappedCandidateKeys = computeUnmappedCandidateKeys(
        destinationMetadata as object,
        configuredKeys
    );
    // props + configuredKeys are build-time only — not retained on the plan.
    return { steps, unmappedCandidateKeys };
}

export function map<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>
>({
    mapping,
    sourceObject,
    options,
    setMemberFn,
    getMemberFn,
    isMapArray = false,
}: MapParameter<TSource, TDestination>): TDestination {
    // destructure mapping
    const [
        [sourceIdentifier, destinationIdentifier],
        [, destinationWithMetadata],
        propsToMap,
        ,
        mapper,
        destinationConstructor,
        ,
        [mappingBeforeCallback, mappingAfterCallback] = [],
    ] = mapping;

    // deconstruct MapOptions
    const {
        beforeMap: mapBeforeCallback,
        afterMap: mapAfterCallback,
        destinationConstructor:
            mapDestinationConstructor = destinationConstructor,
        extraArgs,
    } = options ?? {};

    const errorHandler = getErrorHandler(mapper);

    const destination: TDestination = mapDestinationConstructor(
        sourceObject,
        destinationIdentifier
    );

    // get extraArguments
    const extraArguments = extraArgs?.(mapping, destination);

    // Compiled plan (specialized step closures + configured keys). Built eagerly
    // at createMap and hung on the mapping; the lazy fallback only fires for a
    // mapping constructed outside the normal createMap path.
    let compiledPlan = mapping[MappingClassId.compiledPlan];
    if (compiledPlan === undefined) {
        compiledPlan = buildMapPlan(propsToMap, destinationWithMetadata);
        mapping[MappingClassId.compiledPlan] = compiledPlan;
    }
    const { steps, unmappedCandidateKeys } = compiledPlan;

    // Build the per-call context once, then run each compiled step. All the
    // per-member branching/destructuring was resolved at compile time.
    const context: MapStepContext<TSource, TDestination> = {
        sourceObject,
        destination,
        extraArguments,
        extraArgs,
        mapper,
        errorHandler,
        destinationIdentifier,
        setMemberFn,
        getMemberFn,
    };

    // Synchronous fast path: no mapAsync()/mapArrayAsync() context is active, so
    // there is nothing to await, defer, or order by depth. Run before-map →
    // steps → unmapped-assert → after-map straight-line with zero per-call
    // closures — this is the hot path the compiled plan is built for. (A
    // thenable returned by a sync before-map is dropped, matching prior
    // behavior; async before-maps require mapAsync().)
    if (asyncMapContext === null) {
        if (!isMapArray) {
            const beforeMap = mapBeforeCallback ?? mappingBeforeCallback;
            if (beforeMap) {
                beforeMap(sourceObject, destination, extraArguments);
            }
        }

        for (let i = 0, length = steps.length; i < length; i++) {
            (steps[i] as MapStep<TSource, TDestination>)(context);
        }

        assertUnmappedProperties(
            destination,
            unmappedCandidateKeys,
            sourceIdentifier,
            destinationIdentifier,
            errorHandler
        );

        if (!isMapArray) {
            const afterMap = mapAfterCallback ?? mappingAfterCallback;
            if (afterMap) {
                afterMap(sourceObject, destination, extraArguments);
            }
        }

        return destination;
    }

    // Async path: a mapAsync()/mapArrayAsync() context is active. Track this
    // map's depth so nested after-maps settle before their parents, and defer
    // after-maps past member resolution.
    const currentMapDepth = asyncMapDepth + 1;

    const runStepsAndAssert = () => {
        return runAtAsyncMapDepth(currentMapDepth, () => {
            for (let i = 0, length = steps.length; i < length; i++) {
                (steps[i] as MapStep<TSource, TDestination>)(context);
            }

            // Check unmapped properties after mapping steps have had a chance to
            // assign destination values. When an async beforeMap gates the steps,
            // this assertion runs inside the gated async work as well.
            assertUnmappedProperties(
                destination,
                unmappedCandidateKeys,
                sourceIdentifier,
                destinationIdentifier,
                errorHandler
            );
        });
    };

    let stepsDeferredUntilBeforeMap = false;
    const queueAfterMap = () => {
        if (!isMapArray) {
            const afterMap = mapAfterCallback ?? mappingAfterCallback;
            if (afterMap) {
                deferAsyncAfterMapAfterPending(
                    () => afterMap(sourceObject, destination, extraArguments),
                    currentMapDepth
                );
            }
        }
    };

    if (!isMapArray) {
        const beforeMap = mapBeforeCallback ?? mappingBeforeCallback;
        if (beforeMap) {
            const beforeMapResult = beforeMap(
                sourceObject,
                destination,
                extraArguments
            );
            if (isThenable(beforeMapResult)) {
                const asyncCtx = asyncMapContext;
                stepsDeferredUntilBeforeMap = true;
                asyncMapContext.pending.push(
                    Promise.resolve(beforeMapResult).then(() =>
                        runInAsyncMapContext(asyncCtx, () => {
                            runStepsAndAssert();
                            queueAfterMap();
                        })
                    )
                );
            } else {
                pushAsyncPending(beforeMapResult);
            }
        }
    }

    if (!stepsDeferredUntilBeforeMap) {
        runStepsAndAssert();
        queueAfterMap();
    }

    return destination;
}
