import { mapInitialize } from '../member-map-functions/map-initialize';
import {
    getMetadataMap,
    getMetadataObjectMap,
    getNamingConventions,
    getStrategy,
} from '../symbols';
import type {
    Dictionary,
    Mapper,
    Mapping,
    MappingConfiguration,
    MappingTransformation,
    MetadataIdentifier,
    NestedMappingPair,
    Selector,
} from '../types';
import {
    MapFnClassId,
    MappingClassId,
    MappingPropertiesClassId,
    MappingTransformationClassId,
    MetadataClassId,
    MetadataObjectMapClassId,
    NestedMappingPairClassId,
} from '../types';
import { getFlatteningPaths, getPath } from '../utils/get-path';
import { getPathRecursive } from '../utils/get-path-recursive';
import { isPrimitiveArrayEqual } from '../utils/is-primitive-array-equal';

export function createInitialMapping<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>
>(
    mapper: Mapper,
    source: MetadataIdentifier<TSource>,
    destination: MetadataIdentifier<TDestination>,
    configurations: MappingConfiguration<TSource, TDestination>[] = []
): Mapping {
    const strategy = getStrategy(mapper);
    const applyMetadataFn = strategy.applyMetadata.bind(strategy);
    const destinationConstructor =
        strategy.destinationConstructor.bind(strategy);

    const metadataObjectMap = getMetadataObjectMap(mapper);
    const sourceMetadataObjectMap = metadataObjectMap.get(source);
    const destinationMetadataObjectMap = metadataObjectMap.get(destination);

    const destinationObject =
        destinationMetadataObjectMap?.[
            MetadataObjectMapClassId.asDestination
        ] ||
        applyMetadataFn(destination, MetadataObjectMapClassId.asDestination);

    if (destinationMetadataObjectMap) {
        destinationMetadataObjectMap[MetadataObjectMapClassId.asDestination] =
            destinationObject;
    } else {
        metadataObjectMap.set(destination, [undefined, destinationObject]);
    }

    const sourceObject =
        sourceMetadataObjectMap?.[MetadataObjectMapClassId.asSource] ||
        applyMetadataFn(source, MetadataObjectMapClassId.asSource);

    if (sourceMetadataObjectMap) {
        sourceMetadataObjectMap[MetadataObjectMapClassId.asSource] =
            sourceObject;
    } else {
        metadataObjectMap.set(source, [sourceObject]);
    }

    const mapping: Mapping<TSource, TDestination> = [
        [source, destination],
        [sourceObject as TSource, destinationObject as TDestination],
        [],
        [],
        mapper,
        destinationConstructor,
    ];

    // try to inherit naming conventions from mapper
    mapping[MappingClassId.namingConventions] = getNamingConventions(mapper);

    // run configuration fn on mapping
    for (let i = 0, length = configurations.length; i < length; i++) {
        configurations[i](mapping);
    }

    const destinationPaths = getPathRecursive(destinationObject);

    const mappingProperties = mapping[MappingClassId.properties];
    const customMappingProperties = mapping[MappingClassId.customProperties];
    const hasCustomMappingProperties = customMappingProperties.length > 0;

    const namingConventions = mapping[MappingClassId.namingConventions];

    const metadataMap = getMetadataMap(mapper);
    const destinationMetadata = metadataMap.get(destination) || [];
    const sourceMetadata = metadataMap.get(source) || [];

    for (let i = 0, length = destinationPaths.length; i < length; i++) {
        const destinationPath = destinationPaths[i];

        // is a forMember (custom mapping configuration) already exists
        // for this destination path, skip it
        if (
            hasCustomMappingProperties &&
            customMappingProperties.some((property) =>
                isPrimitiveArrayEqual(
                    property[MappingPropertiesClassId.path],
                    destinationPath
                )
            )
        ) {
            continue;
        }

        const metadataAtDestination = destinationMetadata.find((metadata) =>
            isPrimitiveArrayEqual(
                metadata[MetadataClassId.propertyKeys],
                destinationPath
            )
        );

        // try getting the sourcePath that is associated with this destinationPath
        /**
         * with naming conventions: fooBar -> [foo, bar]
         * without naming conventions: fooBar -> fooBar
         */
        let sourcePath = destinationPath;

        if (namingConventions) {
            sourcePath = getFlatteningPaths(
                sourceObject,
                getPath(destinationPath, namingConventions),
                namingConventions
            );
        }

        // sourcePath is not in sourceObject. No AutoMap available
        if (!(sourcePath[0] in sourceObject)) {
            continue;
        }

        const metadataAtSource = sourceMetadata.find((metadata) =>
            isPrimitiveArrayEqual(
                metadata[MetadataClassId.propertyKeys],
                sourcePath
            )
        );

        let nestedMappingPair: NestedMappingPair | undefined = undefined;

        if (!metadataAtSource && !metadataAtDestination) continue;

        if (metadataAtSource && metadataAtDestination) {
            nestedMappingPair = [
                metadataAtDestination[MetadataClassId.metaFn](),
                metadataAtSource[MetadataClassId.metaFn](),
            ];
        }

        const transformation: MappingTransformation<TSource, TDestination> = [
            mapInitialize(sourcePath),
        ];

        if (nestedMappingPair) {
            let typeConverter: Selector | undefined;

            const isSourceArray = metadataAtSource![MetadataClassId.isArray];
            const isDestinationArray =
                metadataAtDestination![MetadataClassId.isArray];
            const mappingTypeConverters =
                mapping[MappingClassId.typeConverters];

            if (mappingTypeConverters) {
                const [sourceConverters, arraySourceConverters] =
                    mappingTypeConverters.get(
                        nestedMappingPair[
                            NestedMappingPairClassId.source
                        ] as MetadataIdentifier
                    ) || [];

                const [destinationConverter, arrayDestinationConverter] =
                    (isSourceArray
                        ? arraySourceConverters?.get(
                              nestedMappingPair[
                                  NestedMappingPairClassId.destination
                              ] as MetadataIdentifier
                          )
                        : sourceConverters?.get(
                              nestedMappingPair[
                                  NestedMappingPairClassId.destination
                              ] as MetadataIdentifier
                          )) || [];

                typeConverter = isDestinationArray
                    ? arrayDestinationConverter
                    : destinationConverter;
            }

            if (typeConverter) {
                const originalMapInitializeFn = transformation[
                    MappingTransformationClassId.memberMapFn
                ][MapFnClassId.fn] as Selector;
                transformation[MappingTransformationClassId.memberMapFn][
                    MapFnClassId.fn
                ] = (srcObj: TSource) =>
                    typeConverter!(originalMapInitializeFn(srcObj));

                transformation[MappingTransformationClassId.memberMapFn][
                    MapFnClassId.isConverted
                ] = true;
            }
        }

        mappingProperties.push([
            destinationPath,
            [destinationPath, transformation],
            nestedMappingPair,
        ]);
    }

    // consolidate mapping properties
    for (const customMappingProperty of customMappingProperties) {
        mappingProperties.push(customMappingProperty);
    }

    return mapping;
}
