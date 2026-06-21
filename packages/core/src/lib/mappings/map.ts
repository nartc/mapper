import { MapMemberError } from '../errors';
import { getErrorHandler } from '../symbols';
import type {
    Constructor,
    Dictionary,
    ErrorHandler,
    MapInitializeReturn,
    MapOptions,
    Mapping,
    MemberMapReturn,
    MetadataIdentifier,
    Primitive,
} from '../types';
import { MapFnClassId, MappingClassId, TransformationType } from '../types';
import { assertUnmappedProperties } from '../utils/assert-unmapped-properties';
import { get } from '../utils/get';
import { getMapping } from '../utils/get-mapping';
import { isMappableIdentifier } from '../utils/is-mappable-identifier';
import { isEmpty } from '../utils/is-empty';
import { isPrimitiveConstructor } from '../utils/is-primitive-constructor';
import { set, setMutate } from '../utils/set';
import { mapMember } from './map-member';

function setMemberReturnFn<TDestination extends Dictionary<TDestination> = any>(
    destinationMemberPath: string[],
    destination: TDestination | undefined
) {
    return (value: unknown) => {
        if (destination) {
            destination = set(destination, destinationMemberPath, value);
        }
    };
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
    return (destinationMember: string[]) => (value: unknown) => {
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
        destination?: TDestination
    ) => (value: unknown) => void;
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
    deferredAfterMaps: Array<() => unknown>;
}

let asyncMapContext: AsyncMapContext | null = null;

export function isAsyncMapActive(): boolean {
    return asyncMapContext !== null;
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
    const context: AsyncMapContext = { pending: [], deferredAfterMaps: [] };
    asyncMapContext = context;
    try {
        return [fn(), context];
    } finally {
        asyncMapContext = previous;
    }
}

// Await everything a context collected: pending member/before-map promises
// first, then the deferred after-maps (sequentially; each may be async).
export async function settleAsyncMap(context: AsyncMapContext): Promise<void> {
    if (context.pending.length) {
        await Promise.all(context.pending);
    }
    for (let i = 0, len = context.deferredAfterMaps.length; i < len; i++) {
        const result = context.deferredAfterMaps[i]();
        if (isThenable(result)) await result;
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
export function deferAsyncAfterMap(fn: () => unknown): void {
    if (asyncMapContext !== null) {
        asyncMapContext.deferredAfterMaps.push(fn);
    } else {
        fn();
    }
}

// --- Compiled mapping plan -------------------------------------------------
// Every property in a mapping's `properties` array is a positional tuple whose
// shape is fixed at createMap time. The interpreter previously re-destructured
// that nested tuple (with its default fallbacks) and rebuilt the configuredKeys
// array on *every* map() call. Both are invariant per mapping, so we destructure
// once into a flat descriptor list and cache it keyed by the (immutable)
// properties array. `hasSameIdentifier` is intentionally NOT cached — it depends
// on the mapper's mapping registry, which can grow after this mapping is created.
interface CompiledMappingProperty<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>
> {
    destinationMemberPath: string[];
    transformationMapFn: MemberMapReturn<TSource, TDestination>;
    transformationType: TransformationType;
    transformationPreConditionPredicate?: (source: TSource) => boolean;
    transformationPreConditionDefaultValue?: unknown;
    destinationMemberIdentifier?: MetadataIdentifier | Primitive | Date;
    sourceMemberIdentifier?: MetadataIdentifier | Primitive | Date;
}

interface CompiledMapping<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>
> {
    props: CompiledMappingProperty<TSource, TDestination>[];
    configuredKeys: string[];
}

const compiledMappingCache = new WeakMap<object, CompiledMapping<any, any>>();

function getCompiledMapping<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>
>(
    propsToMap: Mapping<TSource, TDestination>[MappingClassId.properties]
): CompiledMapping<TSource, TDestination> {
    const cached = compiledMappingCache.get(propsToMap);
    if (cached !== undefined) {
        return cached as CompiledMapping<TSource, TDestination>;
    }

    const props: CompiledMappingProperty<TSource, TDestination>[] = [];
    const configuredKeys: string[] = [];

    for (let i = 0, length = propsToMap.length; i < length; i++) {
        const [
            destinationMemberPath,
            [
                ,
                [
                    transformationMapFn,
                    [
                        transformationPreConditionPredicate,
                        transformationPreConditionDefaultValue = undefined,
                    ] = [],
                ],
            ],
            [destinationMemberIdentifier, sourceMemberIdentifier] = [],
        ] = propsToMap[i];

        props.push({
            destinationMemberPath,
            transformationMapFn,
            transformationType: transformationMapFn[MapFnClassId.type],
            transformationPreConditionPredicate,
            transformationPreConditionDefaultValue,
            destinationMemberIdentifier,
            sourceMemberIdentifier,
        });
        configuredKeys.push(destinationMemberPath[0]);
    }

    const compiled: CompiledMapping<TSource, TDestination> = {
        props,
        configuredKeys,
    };
    compiledMappingCache.set(propsToMap, compiled);
    return compiled;
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

    // Pre-compiled (cached) property descriptors + the invariant set of keys
    // that this mapping configures — destructured once per mapping, not per call.
    const { props: compiledProps, configuredKeys } =
        getCompiledMapping(propsToMap);

    if (!isMapArray) {
        const beforeMap = mapBeforeCallback ?? mappingBeforeCallback;
        if (beforeMap) {
            pushAsyncPending(
                beforeMap(sourceObject, destination, extraArguments)
            );
        }
    }

    // map
    for (let i = 0, length = compiledProps.length; i < length; i++) {
        const {
            destinationMemberPath,
            transformationMapFn,
            transformationType,
            transformationPreConditionPredicate,
            transformationPreConditionDefaultValue,
            destinationMemberIdentifier,
            sourceMemberIdentifier,
        } = compiledProps[i];

        let hasSameIdentifier =
            isMappableIdentifier(destinationMemberIdentifier) &&
            isMappableIdentifier(sourceMemberIdentifier) &&
            sourceMemberIdentifier === destinationMemberIdentifier;

        if (hasSameIdentifier) {
            // at this point, we have a same identifier that aren't primitive or date
            // we then check if there is a mapping created for this identifier
            hasSameIdentifier = !getMapping(
                mapper,
                sourceMemberIdentifier as MetadataIdentifier,
                destinationMemberIdentifier as MetadataIdentifier,
                true
            );
        }

        // Set up a shortcut function to set destinationMemberPath on destination
        // with the value as argument. In an async context a thenable value is
        // awaited and the *resolved* value is assigned (instead of the promise).
        // Errors (sync throw or async rejection) wrap via the module-level
        // makeMemberError — no per-member closure on the hot path.
        const setMember = (valFn: () => unknown) => {
            try {
                const value = valFn();
                const setValue = setMemberFn(destinationMemberPath, destination);
                if (asyncMapContext !== null && isThenable(value)) {
                    asyncMapContext.pending.push(
                        Promise.resolve(value)
                            .then(setValue)
                            .catch((originalError) => {
                                throw makeMemberError(
                                    destinationMemberPath,
                                    destinationIdentifier,
                                    errorHandler,
                                    originalError
                                );
                            })
                    );
                    return;
                }
                return setValue(value);
            } catch (originalError) {
                throw makeMemberError(
                    destinationMemberPath,
                    destinationIdentifier,
                    errorHandler,
                    originalError
                );
            }
        };

        // Pre Condition check
        if (
            transformationPreConditionPredicate &&
            !transformationPreConditionPredicate(sourceObject)
        ) {
            setMember(() => transformationPreConditionDefaultValue);
            continue;
        }

        // Start with all the mapInitialize
        if (transformationType === TransformationType.MapInitialize) {
            const mapInitializedValue = (
                transformationMapFn[MapFnClassId.fn] as MapInitializeReturn<
                    TSource,
                    TDestination
                >[MapFnClassId.fn]
            )(sourceObject);
            const isTypedConverted =
                transformationMapFn[MapFnClassId.isConverted];

            // if null/undefined
            // if isDate, isFile
            // if it has same identifier that are not primitives or Date
            // if the initialized value was converted with typeConverter
            if (
                mapInitializedValue == null ||
                mapInitializedValue instanceof Date ||
                Object.prototype.toString
                    .call(mapInitializedValue)
                    .slice(8, -1) === 'File' ||
                hasSameIdentifier ||
                isTypedConverted
            ) {
                setMember(() => mapInitializedValue);
                continue;
            }

            // if isArray
            if (Array.isArray(mapInitializedValue)) {
                const [first] = mapInitializedValue;
                // if first item is a primitive
                if (
                    typeof first !== 'object' ||
                    first instanceof Date ||
                    Object.prototype.toString.call(first).slice(8, -1) ===
                        'File'
                ) {
                    setMember(() => mapInitializedValue.slice());
                    continue;
                }

                // if first is empty
                if (isEmpty(first)) {
                    setMember(() => []);
                    continue;
                }

                // if first is object but the destination identifier is a primitive
                // then skip completely
                if (isPrimitiveConstructor(destinationMemberIdentifier)) {
                    continue;
                }

                setMember(() =>
                    mapInitializedValue.map((each) =>
                        mapReturn(
                            getMapping(
                                mapper,
                                sourceMemberIdentifier as MetadataIdentifier,
                                destinationMemberIdentifier as MetadataIdentifier
                            ),
                            each,
                            { extraArgs }
                        )
                    )
                );
                continue;
            }

            if (typeof mapInitializedValue === 'object') {
                const nestedMapping = getMapping(
                    mapper,
                    sourceMemberIdentifier as MetadataIdentifier,
                    destinationMemberIdentifier as MetadataIdentifier
                );

                // nested mutate
                if (getMemberFn) {
                    const memberValue = getMemberFn(destinationMemberPath);
                    if (memberValue !== undefined) {
                        map({
                            sourceObject: mapInitializedValue as TSource,
                            mapping: nestedMapping,
                            options: { extraArgs },
                            setMemberFn: setMemberMutateFn(memberValue),
                            getMemberFn: getMemberMutateFn(memberValue),
                        });
                    }
                    continue;
                }

                setMember(() =>
                    map({
                        mapping: nestedMapping,
                        sourceObject: mapInitializedValue as TSource,
                        options: { extraArgs },
                        setMemberFn: setMemberReturnFn,
                    })
                );
                continue;
            }

            // if is primitive
            setMember(() => mapInitializedValue);
            continue;
        }

        setMember(() =>
            mapMember(
                transformationMapFn,
                sourceObject,
                destination,
                destinationMemberPath,
                extraArguments,
                mapper,
                sourceMemberIdentifier,
                destinationMemberIdentifier
            )
        );
    }

    if (!isMapArray) {
        const afterMap = mapAfterCallback ?? mappingAfterCallback;
        if (afterMap) {
            deferAsyncAfterMap(() =>
                afterMap(sourceObject, destination, extraArguments)
            );
        }
    }

    // Check unmapped properties
    assertUnmappedProperties(
        destination,
        destinationWithMetadata,
        configuredKeys,
        sourceIdentifier,
        destinationIdentifier,
        errorHandler
    );

    return destination;
}
