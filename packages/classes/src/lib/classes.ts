import type {
    ApplyMetadata,
    ApplyMetadataFn,
    Constructor,
    DestinationConstructor,
    Mapper,
    MappingStrategy,
    MappingStrategyInitializer,
} from '@automapper/core';
import {
    exploreMetadata,
    getMetadataMap,
    getRecursiveCount,
    getRecursiveDepth,
    getRecursiveValue,
    isDateConstructor,
    isEmpty,
    isPrimitiveConstructor,
    MetadataClassId,
    setMutate,
    setRecursiveValue,
} from '@automapper/core';
import 'reflect-metadata';
import { getStandaloneConstructors } from './decorators/automap-standalone';
import { getMetadataList } from './get-metadata-list';

function defaultApplyMetadata(
    strategy: MappingStrategy<Constructor>
): ApplyMetadataFn {
    const mapper = strategy.mapper;
    const metadataMap = getMetadataMap(mapper);
    const recursiveCountMap = getRecursiveCount(mapper);
    const recursiveDepthMap = getRecursiveDepth(mapper);

    function applyMetadata(model: Constructor) {
        // get the metadata of the model
        const metadata = metadataMap.get(model);

        // instantiate a model
        const instance = {};

        // if metadata is empty, return the instance early
        if (isEmpty(metadata) || !metadata) {
            return instance;
        }

        // walking the metadata
        for (let i = 0, length = metadata.length; i < length; i++) {
            // destructure the metadata
            const key = metadata[i][MetadataClassId.propertyKeys];
            const metaFn = metadata[i][MetadataClassId.metaFn];
            const isArray = metadata[i][MetadataClassId.isArray];
            const isGetterOnly = metadata[i][MetadataClassId.isGetterOnly];

            // skip getter only completely
            if (isGetterOnly) {
                continue;
            }

            // call the meta fn to get the metaResult of the current key
            const metaResult = metaFn();

            // if the metadata is an Array, then assign an empty array
            if (isArray) {
                setMutate(instance as Record<string, unknown>, key, []);
                continue;
            }

            // if is String, Number, Boolean
            // null meta means this has any type or an arbitrary object, treat as primitives
            if (isPrimitiveConstructor(metaResult) || metaResult === null) {
                setMutate(instance as Record<string, unknown>, key, undefined);
                continue;
            }

            // if is Date, assign a new Date value if valueAtKey is defined, otherwise, undefined
            if (isDateConstructor(metaResult)) {
                setMutate(instance as Record<string, unknown>, key, new Date());
                continue;
            }

            // get depth and count of the current key on the current model
            // Eg: Foo {bar: Bar}, model here is Foo and key is bar
            const depth = getRecursiveValue(recursiveDepthMap, model, key);
            const count = getRecursiveValue(recursiveCountMap, model, key) || 0;

            // if no depth, just instantiate with new keyword without recursive
            if (depth === 0) {
                setMutate(instance as Record<string, unknown>, key, {});
                continue;
            }

            // if depth equals count, meaning instantiate has run enough loop.
            // reset the count then assign with new keyword
            if (depth === count) {
                setRecursiveValue(recursiveCountMap, model, key, 0);
                setMutate(instance as Record<string, unknown>, key, {});
                continue;
            }

            // increment the count and recursively call instantiate
            setRecursiveValue(recursiveCountMap, model, key, count + 1);
            setMutate(
                instance as Record<string, unknown>,
                key,
                applyMetadata(metaResult as Constructor)
            );
        }

        // after all, resetAllCount on the current model
        recursiveCountMap.get(model)?.clear();
        return instance;
    }

    return applyMetadata as ApplyMetadataFn;
}

export function classes(
    applyMetadata: ApplyMetadata = defaultApplyMetadata,
    destinationConstructor: DestinationConstructor = (
        _,
        destinationIdentifier
    ) => new (destinationIdentifier as Constructor)()
): MappingStrategyInitializer<Constructor> {
    return (mapper: Mapper) => {
        function extractMetadata(model: Constructor) {
            const metadataMap = getMetadataMap(mapper);

            if (!metadataMap.has(model)) {
                exploreMetadata(mapper, model, getMetadataList(model));
            }

            const standaloneConstructors = getStandaloneConstructors(model);
            for (const standaloneConstructor of standaloneConstructors) {
                if (!metadataMap.has(standaloneConstructor)) {
                    exploreMetadata(
                        mapper,
                        standaloneConstructor,
                        getMetadataList(standaloneConstructor)
                    );
                }
            }
        }

        return {
            get applyMetadata(): ApplyMetadataFn {
                return applyMetadata(this);
            },
            destinationConstructor,
            mapper,
            exploreMetadata(...identifiers) {
                for (let i = 0, length = identifiers.length; i < length; i++) {
                    extractMetadata(identifiers[i]);
                }
            },
        };
    };
}
