import type {
    Dictionary,
    Mapping,
    MappingConfiguration,
    MappingProperty,
    ModelIdentifier,
} from '../types';
import { MappingClassId } from '../types';
import { getMapping } from '../utils/get-mapping';
import { pathKey } from '../utils/path-key';

export function extend<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>,
    TExtendSource extends Dictionary<TExtendSource>,
    TExtendDestination extends Dictionary<TExtendDestination>
>(
    mapping: Mapping<TExtendSource, TExtendDestination>
): MappingConfiguration<TSource, TDestination>;
export function extend<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>,
    TExtendSource extends Dictionary<TExtendSource>,
    TExtendDestination extends Dictionary<TExtendDestination>
>(
    source: ModelIdentifier<TExtendSource>,
    destination: ModelIdentifier<TExtendDestination>
): MappingConfiguration<TSource, TDestination>;
export function extend<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>,
    TExtendSource extends Dictionary<TExtendSource>,
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
        const customProperties = mapping[MappingClassId.customProperties];

        // Don't overwrite a destination already configured by a forMember.
        // Index present keys in a Set (O(1) lookups instead of an O(custom)
        // `.find` per parent prop) and add on push so dedup within this batch is
        // preserved. Compile-time only, so the Set is cheap at any size.
        const present = new Set(
            customProperties.map(([pKey]) => pathKey(pKey))
        );
        for (let i = 0, length = propsToExtend.length; i < length; i++) {
            const [
                propToExtendKey,
                propToExtendMappingProp,
                propToExtendNestedMapping,
            ] = propsToExtend[i];
            const key = pathKey(propToExtendKey);
            if (present.has(key)) continue;
            present.add(key);
            customProperties.push([
                propToExtendKey,
                propToExtendMappingProp as MappingProperty<
                    TSource,
                    TDestination
                >,
                propToExtendNestedMapping,
            ]);
        }
    };
}
