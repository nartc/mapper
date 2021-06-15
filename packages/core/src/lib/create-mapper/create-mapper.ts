import type {
  CreateMapOptions,
  CreateMapperOptions,
  MapArrayOptions,
  MapOptions,
  Mapper,
  Mapping,
  MappingProfile,
} from '@automapper/types';
import { mapArray, mapMutate, mapReturn } from '../map';
import { createMapFluentFunction } from './create-map-fluent-function.util';

/**
 * Method to create a Mapper with a plugin
 *
 * @param {CreateMapperOptions} createMapperOptions - options for createMapper
 */
export function createMapper<TKey = unknown>({
  name,
  pluginInitializer,
  namingConventions,
  errorHandler: customErrorHandler,
}: CreateMapperOptions<TKey>): Mapper {
  // default errorHandler to console.error
  const errorHandler = customErrorHandler || { handle: console.error };

  // get the plugin
  const plugin = pluginInitializer(errorHandler);

  return {
    name,
    createMap(source: any, destination: any, options: CreateMapOptions = {}) {
      // if namingConventions isn't passed in for this Mapping pair, use the global ones
      if (options && !options.namingConventions) {
        options.namingConventions = namingConventions;
      }

      // create the initial mapping between source and destination
      const mapping = plugin.initializeMapping(source, destination, options);

      // return the FluentFunction for chaining
      return createMapFluentFunction(mapping!);
    },
    getMapping: plugin.getMapping.bind(plugin),
    addProfile(profile: MappingProfile) {
      profile(this);
      return this;
    },
    map(
      sourceObj: Record<string, unknown>,
      destination: any,
      source: any,
      destinationObjOrOptions?: Record<string, unknown>,
      options?: MapOptions
    ) {
      // if source is null/undefined, return
      if (sourceObj == null) {
        return sourceObj;
      }

      const { preMap, postMap } = plugin;

      // run preMap if available
      const [sourceInstance] = preMap
        ? preMap.bind(plugin)(source, destination, sourceObj)
        : [];

      // get mapping between Source and Destination
      const mapping: Mapping = this.getMapping(source, destination);

      // check mutate or return

      // if destinationObjOrOptions has beforeMap or afterMap
      // or destinationObjOrOptions is null/undefined => this is a mapReturn
      // TODO(chau): this might fail if destinationObj has a beforeMap/afterMap property on the consumer side.
      if (
        (destinationObjOrOptions &&
          ('beforeMap' in destinationObjOrOptions ||
            'afterMap' in destinationObjOrOptions ||
            'extraArguments' in destinationObjOrOptions)) ||
        destinationObjOrOptions == null
      ) {
        const result = mapReturn(
          sourceInstance ?? sourceObj,
          mapping!,
          destinationObjOrOptions as MapOptions,
          this,
          errorHandler
        );

        return postMap ? postMap.bind(plugin)(destination, result) : result;
      }

      mapMutate(
        sourceInstance ?? sourceObj,
        mapping!,
        options || {},
        this,
        errorHandler,
        destinationObjOrOptions
      );
      if (postMap) {
        destinationObjOrOptions = postMap(destination, destinationObjOrOptions);
      }
    },
    mapAsync(
      sourceObj: Record<string, unknown>,
      destination: any,
      source: any,
      destinationObjOrOptions?: Record<string, unknown>,
      options?: MapOptions
    ) {
      return Promise.resolve(
        this.map(
          sourceObj,
          destination,
          source,
          destinationObjOrOptions,
          options
        )
      );
    },
    mapArray(
      sourceArr: Record<string, unknown>[],
      destination: any,
      source: any,
      options?: MapArrayOptions
    ) {
      // if source is null/undefined, return
      if (sourceArr == null) {
        return sourceArr;
      }

      // default runPreMap to true
      const { runPreMap = true } = options || {};
      let adjustedSourceArr = sourceArr;

      // run preMapArray if available
      if (runPreMap && plugin.preMapArray) {
        adjustedSourceArr = plugin.preMapArray(source, adjustedSourceArr);
      }

      return mapArray(
        adjustedSourceArr,
        destination,
        source,
        options || {},
        this,
        errorHandler
      );
    },
    mapArrayAsync(
      sourceArr: Record<string, unknown>[],
      destination: any,
      source: any,
      options?: MapArrayOptions
    ) {
      return Promise.resolve(
        this.mapArray(sourceArr, destination, source, options)
      );
    },
    dispose() {
      if (plugin.dispose) {
        plugin.dispose();
      }
    },
  };
}
