import type { Mapping } from '@automapper/types';
import { MappingClassId, MappingPropertiesClassId } from '@automapper/types';

export function extendMappings(bases: any[], mapping: Mapping) {
  for (const mappingToExtend of bases) {
    const propsToExtend = mappingToExtend[MappingClassId.properties];
    for (let i = 0, len = propsToExtend.length; i < len; i++) {
      const [propToExtendKey, propToExtendMappingProp] = propsToExtend[i];
      const existProp = mapping[MappingClassId.properties].find(
        ([pKey]) => pKey === propToExtendKey
      );
      if (existProp) {
        existProp[MappingPropertiesClassId.path] = propToExtendKey;
        existProp[MappingPropertiesClassId.property] = propToExtendMappingProp;
      } else {
        mapping[MappingClassId.properties].push([
          propToExtendKey,
          propToExtendMappingProp,
        ]);
      }
    }

    if (mapping[MappingClassId.bases] == null) {
      mapping[MappingClassId.bases] = [];
    }
    mapping[MappingClassId.bases]!.push(
      mappingToExtend[MappingClassId.mappings]
    );
  }
}
