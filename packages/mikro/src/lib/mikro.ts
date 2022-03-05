import type { Constructible } from '@automapper/classes';
import {
  ClassInstanceStorage,
  ClassMappingStorage,
  ClassMetadataStorage,
  exploreMetadata,
  isDerivedSourcePathOnSourceClasses,
  isMultipartSourcePathsInSource,
  prePropertiesLoop,
} from '@automapper/classes';
import type { Dictionary, MapPluginInitializer } from '@automapper/core';
import { createInitialMapping, MappingClassId } from '@automapper/core';
import { MikroInitializerOptions } from './types';
import {
  instantiate,
  isEntity,
  serializeEntity as defaultSerializeEntity,
} from './utils';

/**
 *
 * A MapPlugin to work with JS/TS Classes.
 *
 * @param {ErrorHandler} errorHandler
 */
export const mikro: (
  options?: MikroInitializerOptions
) => MapPluginInitializer<Constructible> = (
  { serializeEntity } = { serializeEntity: defaultSerializeEntity }
) => {
  return (errorHandler) => {
    // Initialize all the storages
    const metadataStorage = new ClassMetadataStorage();
    const mappingStorage = new ClassMappingStorage();
    const instanceStorage = new ClassInstanceStorage();

    return {
      instantiate(model, obj?) {
        return instantiate(
          instanceStorage,
          metadataStorage,
          serializeEntity,
          model,
          obj
        );
      },
      initializeMapping(source, destination, options?) {
        // If a mapping already exists, handle error and return;
        if (mappingStorage.has(source, destination)) {
          errorHandler.handle(
            `Mapping for source ${source.name} and destination ${destination.name} already exists`
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
        const [destinationInstance, destinationNestedConstructible] =
          this.instantiate(destination);

        const [sourceInstance, sourceNestedConstructible] =
          this.instantiate(source);

        // Get a hold of the prototype of Source (in case of inheritance with extends keyword)
        const sourceProto = Object.getPrototypeOf(source);

        // Call `createInitialMapping` from the core package
        return createInitialMapping(
          sourceInstance,
          destinationInstance,
          sourceNestedConstructible as unknown[],
          destinationNestedConstructible as unknown[],
          (mapping) => {
            mapping[MappingClassId.keys] = [source, destination];
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
            isMetadataNullAtKey: (key) => {
              return (
                metadataStorage.getMetadataForKey(destination, key) === null
              );
            },
            // classes plugin needs to check for sourcePaths on the prototype of Source
            isMultipartSourcePathsInSource: (multipartSourcePaths, sourceObj) =>
              isMultipartSourcePathsInSource(
                multipartSourcePaths,
                sourceObj as Record<string, unknown>
              ),
            // classes plugin needs to check for the destinationPath (sourcePath) on the prototype of Source
            isDerivedSourcePathOnSource:
              isDerivedSourcePathOnSourceClasses(sourceProto),
          }
        );
      },
      getMapping(source, destination) {
        // get mapping of source and destination from mappingStorage
        const mapping = mappingStorage.get(source, destination);

        // handle error and fail fast if not found
        if (!mapping) {
          errorHandler.handle(
            `Mapping not found for source ${source.name} and destination ${destination.name}`
          );
          return;
        }

        // run preMap to get new instances of source and destination for mapping[MappingClassId.mappings]
        // this is to prevent mutation
        mapping[MappingClassId.mappings] = this.preMap!(source, destination);

        // return the mapping
        return mapping;
      },
      preMap(source, destination, sourceObj?, destinationObj?) {
        // Prepare the sourceInstance/destinationInstance with plain object sourceObj and destinationObj
        const [sourceInstance] = this.instantiate(source, sourceObj);
        const [destinationInstance] = this.instantiate(
          destination,
          destinationObj
        );

        return [sourceInstance, destinationInstance];
      },
      preMapArray<TSource extends Dictionary<TSource>>(
        source: Constructible<TSource>,
        sourceArr: TSource[]
      ) {
        return sourceArr.map((item) => {
          if (isEntity(item)) {
            return this.instantiate(source, item)[0];
          }
          return item;
        }) as TSource[];
      },
      dispose() {
        metadataStorage.dispose();
        mappingStorage.dispose();
        instanceStorage.dispose();
      },
    };
  };
};
