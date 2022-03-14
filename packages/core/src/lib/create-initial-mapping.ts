import { getPathRecursive } from './get-path-recursive';
import { getFlatteningSourcePaths, getSourcePath } from './get-source-path';
import { isPrimitiveArrayEqual } from './is-primitive-array-equal';
import { mapInitialize } from './map-initialize';
import { getMetadataMap } from './metadata';
import { getNamingConventions } from './naming-conventions';
import { getStrategy } from './strategy';
import {
    Dictionary,
    MapFnClassId,
    Mapper,
    Mapping,
    MappingClassId,
    MappingConfiguration,
    MappingPropertiesClassId,
    MappingTransformation,
    MappingTransformationClassId,
    MetadataClassId,
    MetadataIdentifier,
    NestedMappingPair,
    NestedMappingPairClassId,
    Selector,
} from './types';

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

    const mapping: Mapping<TSource, TDestination> = [
        [source, destination],
        [],
        mapper,
        destinationConstructor,
    ];

    for (let i = 0, length = configurations.length; i < length; i++) {
        const configuration = configurations[i];
        if (typeof configuration === 'function') {
            configuration(mapping);
        }
    }
    if (mapping[MappingClassId.namingConventions] == null) {
        // try to inherit naming conventions from mapper
        mapping[MappingClassId.namingConventions] =
            getNamingConventions(mapper);
    }

    const destinationObject = applyMetadataFn(destination);
    const sourceObject = applyMetadataFn(source);

    const destinationPaths = getPathRecursive(destinationObject);

    const mappingProperties = mapping[MappingClassId.properties];
    const hasCustomMappingProperties = mappingProperties.length > 0;

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
            mappingProperties.some((property) =>
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
            sourcePath = getFlatteningSourcePaths(
                sourceObject,
                getSourcePath(destinationPath, namingConventions),
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
            }
        }

        mappingProperties.push([
            destinationPath,
            [destinationPath, transformation],
            nestedMappingPair,
        ]);
    }

    return mapping;
}
