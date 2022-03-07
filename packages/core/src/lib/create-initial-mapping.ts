import { getPathRecursive } from './get-path-recursive';
import { getFlatteningSourcePaths, getSourcePath } from './get-source-path';
import { isPrimitiveArrayEqual } from './is-primitive-array-equal';
import { mapInitialize } from './map-initialize';
import { getMetadataMap } from './metadata';
import { getNamingConventions } from './naming-conventions';
import { getTypeConverters } from './type-converters';
import type {
    ApplyMetadataFn,
    DestinationConstructor,
    Dictionary,
    Mapper,
    Mapping,
    MappingConfiguration,
    MappingTransformation,
    MetadataIdentifier,
    Primitive,
    PrimitiveConstructor,
    Selector,
} from './types';
import {
    MapFnClassId,
    MappingClassId,
    MappingPropertiesClassId,
    MappingTransformationClassId,
    MetadataClassId,
} from './types';

export function createInitialMapping<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>
>(
    mapper: Mapper,
    source: MetadataIdentifier<TSource>,
    destination: MetadataIdentifier<TDestination>,
    applyMetadataFn: ApplyMetadataFn,
    destinationConstructor: DestinationConstructor<TSource, TDestination>,
    configurations: MappingConfiguration<TSource, TDestination>[] = []
): Mapping {
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
        let sourcePath = namingConventions
            ? getSourcePath(destinationPath, namingConventions)
            : destinationPath;

        if (namingConventions) {
            sourcePath = getFlatteningSourcePaths(
                sourceObject,
                sourcePath,
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

        let nestedMappingPair:
            | [
                  MetadataIdentifier | Primitive | Date,
                  MetadataIdentifier | Primitive | Date
              ]
            | undefined = undefined;

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
            const mappingTypeConverters =
                mapping[MappingClassId.typeConverters];
            if (mappingTypeConverters) {
                typeConverter = mappingTypeConverters
                    .get(
                        nestedMappingPair[1] as
                            | MetadataIdentifier
                            | PrimitiveConstructor
                            | DateConstructor
                    )
                    ?.get(
                        nestedMappingPair[0] as
                            | MetadataIdentifier
                            | PrimitiveConstructor
                            | DateConstructor
                    );
            }

            if (!typeConverter) {
                const mapperTypeConverters = getTypeConverters(mapper);
                typeConverter = mapperTypeConverters
                    .get(
                        nestedMappingPair[1] as
                            | MetadataIdentifier
                            | PrimitiveConstructor
                            | DateConstructor
                    )
                    ?.get(
                        nestedMappingPair[0] as
                            | MetadataIdentifier
                            | PrimitiveConstructor
                            | DateConstructor
                    );
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
            metadataAtSource && metadataAtDestination
                ? [
                      metadataAtDestination[MetadataClassId.metaFn](),
                      metadataAtSource[MetadataClassId.metaFn](),
                  ]
                : undefined,
        ]);
    }

    return mapping;
}
