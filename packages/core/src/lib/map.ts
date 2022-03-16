import { assertUnmappedProperties } from './assert-unmapped-properties';
import { getErrorHandler } from './error-handler';
import { get } from './get';
import { isEmpty } from './is-empty';
import { isPrimitiveArrayEqual } from './is-primitive-array-equal';
import { mapMember } from './map-member';
import { getMapping } from './mappings';
import { getMetadataMap } from './metadata';
import { set, setMutate } from './set';
import {
    Constructor,
    Dictionary,
    MapFnClassId,
    MapInitializeReturn,
    MapOptions,
    Mapping,
    MetadataClassId,
    MetadataIdentifier,
    TransformationType,
} from './types';

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
        ,
        propsToMap,
        mapper,
        destinationConstructor,
        ,
        [mappingBeforeCallback, mappingAfterCallback] = [],
    ] = mapping;

    const errorHandler = getErrorHandler(mapper);
    const metadataMap = getMetadataMap(mapper);

    const destination: TDestination = destinationConstructor(
        sourceObject,
        destinationIdentifier
    );

    // initialize an array of keys that have already been configured
    const configuredKeys: string[] = [];

    // deconstruct MapOptions
    const {
        beforeMap: mapBeforeCallback,
        afterMap: mapAfterCallback,
        extraArgs,
    } = options ?? {};

    if (!isMapArray) {
        const beforeMap = mapBeforeCallback ?? mappingBeforeCallback;
        if (beforeMap) {
            beforeMap(sourceObject, destination);
        }
    }

    // map
    for (let i = 0, length = propsToMap.length; i < length; i++) {
        // destructure mapping property
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
            [destinationMemberIdenfitier, sourceMemberIdentifier] = [],
        ] = propsToMap[i];

        // Setup a shortcut function to set destinationMemberPath on destination with value as argument
        const setMember = (valFn: () => unknown) => {
            try {
                return setMemberFn(destinationMemberPath, destination)(valFn());
            } catch (originalError) {
                const errorMessage = `
Error at "${destinationMemberPath}" on ${
                    (destinationIdentifier as Constructor)['prototype']
                        ?.constructor?.name || destinationIdentifier
                } (${JSON.stringify(destination)})
---------------------------------------------------------------------
Original error: ${originalError}`;
                errorHandler.handle(errorMessage);
                throw new Error(errorMessage);
            }
        };

        // This destination key is being configured. Push to configuredKeys array
        configuredKeys.push(destinationMemberPath[0]);

        // Pre Condition check
        if (
            transformationPreConditionPredicate &&
            !transformationPreConditionPredicate(sourceObject)
        ) {
            setMember(() => transformationPreConditionDefaultValue);
            continue;
        }

        // Start with all the mapInitialize
        if (
            transformationMapFn[MapFnClassId.type] ===
            TransformationType.MapInitialize
        ) {
            // check if metadata as destinationMemberPath is null
            const destinationMetadata = metadataMap.get(destinationIdentifier);
            const hasNullMetadata =
                destinationMetadata &&
                destinationMetadata.find((metadata) =>
                    isPrimitiveArrayEqual(
                        metadata[MetadataClassId.propertyKeys],
                        destinationMemberPath
                    )
                ) === null;

            const mapInitializedValue = (
                transformationMapFn[MapFnClassId.fn] as MapInitializeReturn<
                    TSource,
                    TDestination
                >[MapFnClassId.fn]
            )(sourceObject);

            // if null/undefined
            // if isDate, isFile
            // if metadata is null, treat as-is
            if (
                mapInitializedValue == null ||
                mapInitializedValue instanceof Date ||
                Object.prototype.toString
                    .call(mapInitializedValue)
                    .slice(8, -1) === 'File' ||
                hasNullMetadata
            ) {
                setMember(() => mapInitializedValue);
                continue;
            }

            // if isArray
            if (Array.isArray(mapInitializedValue)) {
                const [first] = mapInitializedValue;
                // if first item is a primitive
                if (typeof first !== 'object' || first instanceof Date) {
                    setMember(() => mapInitializedValue.slice());
                    continue;
                }

                // if first is empty
                if (isEmpty(first)) {
                    setMember(() => []);
                    continue;
                }

                setMember(() =>
                    mapInitializedValue.map((each) =>
                        mapReturn(
                            getMapping(
                                mapper,
                                sourceMemberIdentifier as MetadataIdentifier,
                                destinationMemberIdenfitier as MetadataIdentifier
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
                    destinationMemberIdenfitier as MetadataIdentifier
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

                // for nested model, we do not care about mutate or return. we will always need to return
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
                extraArgs?.(mapping, destination),
                mapper
            )
        );
    }

    if (!isMapArray) {
        const afterMap = mapAfterCallback ?? mappingAfterCallback;
        if (afterMap) {
            afterMap(sourceObject, destination);
        }
    }

    // Check unmapped properties
    assertUnmappedProperties(
        destination,
        configuredKeys,
        sourceIdentifier,
        destinationIdentifier,
        errorHandler
    );

    return destination;
}
