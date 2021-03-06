import type { Mapping } from '@automapper/types';
import { MappingClassId } from '@automapper/types';
import type { ClassInstanceStorage, ClassMetadataStorage } from '../storages';
import type { Constructible } from '../types';
import { instantiate } from './instantiate.util';

export function prePropertiesLoop(
  source: Constructible,
  metadataStorage: ClassMetadataStorage,
  instanceStorage: ClassInstanceStorage,
  sourceInstance: unknown,
  sourceNestedConstructible: unknown[]
) {
  return (mapping: Mapping) => {
    // get prototype of the constructor
    const sourceProtoConstructor = Object.getPrototypeOf(source.constructor);
    // if it has name, then it's not anonymous Function
    if (sourceProtoConstructor.name) {
      // try to instantiate the proto constructor
      const [sourceProtoInstance, sourceProtoNestedConstructible] = instantiate(
        instanceStorage,
        metadataStorage,
        sourceProtoConstructor
      );
      // merge the instance of the proto with the sourceInstance
      sourceInstance = Object.assign(sourceInstance, sourceProtoInstance);
      // update the sourceInstance on the mapping
      mapping[MappingClassId.mappings][0] = sourceInstance;
      if ((sourceProtoNestedConstructible as unknown[]).length) {
        // update the nested constructible
        sourceNestedConstructible = sourceNestedConstructible.concat(
          sourceProtoNestedConstructible
        );
      }
    }
  };
}
