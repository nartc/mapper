import { createInitialMapping, isDefined } from '@automapper/core';
import type {
  Dictionary,
  Mapping,
  MapPluginInitializer,
} from '@automapper/types';
import { MappingClassId } from '@automapper/types';
import 'reflect-metadata';
import {
  ClassInstanceStorage,
  ClassMappingStorage,
  ClassMetadataStorage,
} from './storages';
import type { Constructible } from './types';
import { instantiate, isClass } from './utils';

/**
 *
 * A MapPlugin to work with JS/TS Classes.
 *
 * @param {ErrorHandler} errorHandler
 */
export const classes: MapPluginInitializer<Constructible> = (errorHandler) => {
  // Initialize all the storages
  const metadataStorage = new ClassMetadataStorage();
  const mappingStorage = new ClassMappingStorage();
  const instanceStorage = new ClassInstanceStorage();

  return {
    initializeMapping(source, destination, options?) {
      // If a mapping already exists, handle error and return;
      if (mappingStorage.has(source, destination)) {
        errorHandler.handle(
          `Mapping for source ${source.toString()} and destination ${destination.toString()} already exists`
        );
        return;
      }

      // Run the source and destination through Reflection to update storages
      // with information/metadata about source and destination
      exploreMetadata(metadataStorage, instanceStorage, source, destination);

      /**
       * Instantiate a new instance of Destination/Source along with any nested constructible
       *
       * ```ts
       * Foo {
       *   bar: Bar;
       * }
       * ```
       * `Foo#bar` is a nested constructible
       */
      const [destinationInstance, destinationNestedConstructible] = instantiate(
        instanceStorage,
        metadataStorage,
        destination
      );

      const [sourceInstance, sourceNestedConstructible] = instantiate(
        instanceStorage,
        metadataStorage,
        source
      );

      // Get a hold of the prototype of Source (in case of inheritance with extends keyword)
      const sourceProto = Object.getPrototypeOf(source);

      // Call `createInitialMapping` from the core package
      return createInitialMapping(
        sourceInstance,
        destinationInstance,
        sourceNestedConstructible as unknown[],
        destinationNestedConstructible as unknown[],
        (mapping) => {
          mappingStorage.set(source, destination, mapping);
        },
        options,
        {
          // classes plugin needs to pre-process the prototype of Source
          // before looping through the properties on the Destination
          prePropertiesLoop: prePropertiesLoop(
            source,
            metadataStorage,
            instanceStorage,
            sourceInstance,
            sourceNestedConstructible as unknown[]
          ),
          // classes plugin needs to check for sourcePaths on the prototype of Source
          isMultipartSourcePathsInSource,
          // classes plugin needs to check for the destinationPath (sourcePath) on the prototype of Source
          isDestinationPathOnSource: isDestinationPathOnSource(sourceProto),
        }
      );
    },
    getMapping(source, destination) {
      // get mapping of source and destination from mappingStorage
      const mapping = mappingStorage.get(source, destination);

      // handle error and fail fast if not found
      if (!mapping) {
        errorHandler.handle(
          `Mapping not found for source ${source.toString()} and destination ${destination.toString()}`
        );
        return;
      }

      // run preMap to get new instances of source and destination for mapping[MappingClassId.mappings]
      // this is to prevent mutation
      mapping[MappingClassId.mappings] = this.preMap!(source, destination);

      // return the mapping
      return mapping;
    },
    preMap<
      TSource extends Dictionary<TSource> = any,
      TDestination extends Dictionary<TDestination> = any
    >(
      source: Constructible<TSource>,
      destination: Constructible<TDestination>,
      sourceObj?: TSource,
      destinationObj?: TDestination
    ) {
      // Prepare the sourceInstance/destinationInstance with plain object sourceObj and destinationObj
      const [sourceInstance] = instantiate(
        instanceStorage,
        metadataStorage,
        source,
        sourceObj
      );
      const [destinationInstance] = instantiate(
        instanceStorage,
        metadataStorage,
        destination,
        destinationObj
      );

      return [sourceInstance, destinationInstance];
    },
    dispose() {
      metadataStorage.dispose();
      mappingStorage.dispose();
      instanceStorage.dispose();
    },
  };
};

function exploreMetadata(
  metadataStorage: ClassMetadataStorage,
  instanceStorage: ClassInstanceStorage,
  ...models: Constructible[]
) {
  // Loop through each models passed in
  for (const model of models) {
    // if metadataStorage hasn't had metadata of the model
    if (!metadataStorage.has(model)) {
      // get the metadata from Reflection then populate metadataStorage and instanceStorage
      const metadataList = Reflect.getMetadata('automap:properties', model);
      // skip if no metadata
      if (!isDefined(metadataList)) continue;
      // loop through metadata list
      for (const [propertyKey, { typeFn, depth }] of metadataList) {
        metadataStorage.addMetadata(model, [propertyKey, typeFn]);
        if (depth != null) {
          instanceStorage.setDepth(model, propertyKey, depth);
        }
      }
    }
  }
}

function prePropertiesLoop(
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

function isMultipartSourcePathsInSource(
  dottedSourcePaths: string[],
  sourceInstance: unknown
) {
  return !(
    dottedSourcePaths.length > 1 &&
    (!sourceInstance.hasOwnProperty(dottedSourcePaths[0]) ||
      (sourceInstance[dottedSourcePaths[0]] &&
        isClass(sourceInstance[dottedSourcePaths[0]])))
  );
}

function isDestinationPathOnSource(sourceProto: unknown) {
  return (sourceObj: any, sourcePath: string) => {
    return !(
      !sourceObj.hasOwnProperty(sourcePath) &&
      !sourceProto.hasOwnProperty(sourcePath) &&
      !Object.getPrototypeOf(sourceObj).hasOwnProperty(sourcePath)
    );
  };
}
