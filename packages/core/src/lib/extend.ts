import { isSamePath } from './is-same-path';
import { getMapping } from './mappings';
import {
    Dictionary,
    MappingClassId,
    MappingConfiguration,
    MetadataIdentifier,
} from './types';

export function extend<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>
>(
    source: MetadataIdentifier,
    destination: MetadataIdentifier
): MappingConfiguration<TSource, TDestination> {
    return (mapping) => {
        const mapper = mapping[MappingClassId.mapper];
        const mappingToExtend = getMapping(mapper, source, destination);

        const propsToExtend = mappingToExtend[MappingClassId.properties];

        for (let i = 0, length = propsToExtend.length; i < length; i++) {
            const [propToExtendKey, propToExtendMappingProp] = propsToExtend[i];
            const existProp = mapping[MappingClassId.properties].find(
                ([pKey]) => isSamePath(pKey, propToExtendKey)
            );
            if (existProp) continue;
            mapping[MappingClassId.properties].push([
                propToExtendKey,
                propToExtendMappingProp,
            ]);
        }
    };
}
