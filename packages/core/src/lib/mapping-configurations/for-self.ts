import { createInitialMapping } from '../mappings/create-initial-mapping';
import { getStrategy } from '../symbols';
import type {
    Dictionary,
    Mapping,
    MappingConfiguration,
    MappingTransformation,
    MetadataIdentifier,
    ModelIdentifier,
    Selector,
} from '../types';
import {
    MapFnClassId,
    MappingClassId,
    MappingPropertiesClassId,
    MappingPropertyClassId,
    MappingTransformationClassId,
} from '../types';
import { get } from '../utils/get';
import { isPrimitiveArrayEqual } from '../utils/is-primitive-array-equal';
import { storeMetadata } from '../utils/store-metadata';

export function forSelf<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>,
    TSelfSource extends Dictionary<TSelfSource>
>(
    sourceOrMapping:
        | ModelIdentifier<TSelfSource>
        | Mapping<TSelfSource, TDestination>,
    selector: Selector<TSource, TSelfSource>
): MappingConfiguration<TSource, TDestination> {
    let selfMapping = Array.isArray(sourceOrMapping)
        ? sourceOrMapping
        : undefined;

    return (mapping) => {
        if (selfMapping == null) {
            const [, destinationIdentifier] =
                mapping[MappingClassId.identifiers];
            const mapper = mapping[MappingClassId.mapper];
            const strategy = getStrategy(mapper);
            // turn string into symbol for identifier
            const sourceIdentifier: MetadataIdentifier<TSource> =
                typeof sourceOrMapping === 'string'
                    ? Symbol.for(sourceOrMapping)
                    : (sourceOrMapping as MetadataIdentifier<TSource>);
            const strategyMetadataMap =
                strategy.retrieveMetadata(sourceIdentifier);

            strategyMetadataMap.forEach((metadataList, identifier) => {
                storeMetadata(mapper, identifier, metadataList);
            });

            selfMapping = createInitialMapping(
                mapper,
                sourceIdentifier,
                destinationIdentifier
            );
        }

        const selfMapProperties = selfMapping[MappingClassId.properties];

        for (let i = 0, length = selfMapProperties.length; i < length; i++) {
            const mapProperty = selfMapProperties[i];
            if (
                mapping[MappingClassId.properties].some((property) =>
                    isPrimitiveArrayEqual(
                        property[MappingPropertiesClassId.path],
                        mapProperty[MappingPropertiesClassId.path]
                    )
                )
            ) {
                continue;
            }
            const transformation: MappingTransformation =
                mapProperty[MappingPropertiesClassId.mappingProperty][
                    MappingPropertyClassId.transformation
                ];
            transformation[MappingTransformationClassId.memberMapFn][
                MapFnClassId.fn
            ] = (sourceObj: TSource) =>
                get(
                    selector(sourceObj),
                    mapProperty[MappingPropertiesClassId.path]
                );
            mapping[MappingClassId.properties].push([
                mapProperty[MappingPropertiesClassId.path],
                [mapProperty[MappingPropertiesClassId.path], transformation],
                mapProperty[MappingPropertiesClassId.nestedMappingPair],
            ]);
        }
    };
}
