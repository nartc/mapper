import type {
    Dictionary,
    Mapping,
    MappingConfiguration,
    MappingProperty,
    ModelIdentifier,
} from '../types';
import { MappingClassId } from '../types';
import { getMapping } from '../utils/get-mapping';
import { isSamePath } from '../utils/is-same-path';

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

        // For a wide parent the per-prop `.find(isSamePath)` is O(P_parent ×
        // P_custom). Above the gate, index the present keys in a Set (null-byte
        // join — collision-proof, equivalent to isSamePath) and add on push, so
        // dedup within this extend batch is preserved. Below the gate the .find
        // avoids the Set-construction overhead.
        const EXTEND_SIZE_GATE = 30;
        if (propsToExtend.length > EXTEND_SIZE_GATE) {
            const present = new Set(
                customProperties.map(([pKey]) => pKey.join('\0'))
            );
            for (let i = 0, length = propsToExtend.length; i < length; i++) {
                const [
                    propToExtendKey,
                    propToExtendMappingProp,
                    propToExtendNestedMapping,
                ] = propsToExtend[i];
                const key = propToExtendKey.join('\0');
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
            return;
        }

        for (let i = 0, length = propsToExtend.length; i < length; i++) {
            const [
                propToExtendKey,
                propToExtendMappingProp,
                propToExtendNestedMapping,
            ] = propsToExtend[i];
            const existProp = customProperties.find(([pKey]) =>
                isSamePath(pKey, propToExtendKey)
            );
            if (existProp) continue;
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
