import { isSamePath } from './is-same-path';
import { getMapping } from './mappings';
import {
    Dictionary,
    Mapping,
    MappingClassId,
    MappingConfiguration,
    MappingProperty,
    ModelIdentifier,
} from './types';

export function extend<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>,
    TExtendSource extends Dictionary<TSource>,
    TExtendDestination extends Dictionary<TExtendDestination>
>(
    mapping: Mapping<TExtendSource, TExtendDestination>
): MappingConfiguration<TSource, TDestination>;
export function extend<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>,
    TExtendSource extends Dictionary<TSource>,
    TExtendDestination extends Dictionary<TExtendDestination>
>(
    source: ModelIdentifier<TExtendSource>,
    destination: ModelIdentifier<TExtendDestination>
): MappingConfiguration<TSource, TDestination>;
export function extend<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>,
    TExtendSource extends Dictionary<TSource>,
    TExtendDestination extends Dictionary<TExtendDestination>
>(
    sourceOrMapping:
        | ModelIdentifier<TExtendSource>
        | Mapping<TExtendSource, TExtendDestination>,
    destination?: ModelIdentifier<TExtendDestination>
): MappingConfiguration<TSource, TDestination> {
    return (mapping) => {
        let mappingToExtend: Mapping<TExtendSource, TExtendDestination>;
        if (Array.isArray(sourceOrMapping)) {
            mappingToExtend = sourceOrMapping as Mapping<
                TExtendSource,
                TExtendDestination
            >;
        } else {
            const mapper = mapping[MappingClassId.mapper];
            mappingToExtend = getMapping(mapper, sourceOrMapping, destination!);
        }

        const propsToExtend = mappingToExtend[MappingClassId.properties];

        for (let i = 0, length = propsToExtend.length; i < length; i++) {
            const [propToExtendKey, propToExtendMappingProp] = propsToExtend[i];
            const existProp = mapping[MappingClassId.properties].find(
                ([pKey]) => isSamePath(pKey, propToExtendKey)
            );
            if (existProp) continue;
            mapping[MappingClassId.properties].push([
                propToExtendKey,
                propToExtendMappingProp as MappingProperty<
                    TSource,
                    TDestination
                >,
            ]);
        }
    };
}
