import type { Mapping } from './core';
import type { CreateMapOptions } from './options';
import type { Dictionary } from './utils';

export interface MapPlugin<TKey = unknown> {
  /**
   * Instruction on how a plugin should initialize a mapping for a pair of Source <> Destination
   * This method will make use of the plugin's internal storages to store information for this pair.
   *
   * @param source - a key to be used to identify the information about a particular Source
   * @param destination - a key to be used to identify the information about a particular Destination
   * @param options {CreateMapOptions} - options for when initialize a mapping (which is globally applied to this pair of Source <> Destination)
   */
  initializeMapping(
    source: TKey,
    destination: TKey,
    options?: CreateMapOptions
  ): Mapping;

  /**
   * Get the Mapping for a pair of Source <> Destination
   *
   * @param source - a key to be used to identify the information about a particular Source
   * @param destination - a key to be used to identify the information about a particular Destination
   */
  getMapping(source: TKey, destination: TKey): Mapping;

  /**
   * An optional pre-map function to prepare the source and destination before map
   *
   * @param source - a key to be used to identify the information about a particular Source
   * @param destination - a key to be used to identify the information about a particular Destination
   * @param sourceObj - a plain object that takes the shape of the source
   * @param destinationObj - a plain object that takes the shape of the destination
   */
  preMap?<
    TSource extends Dictionary<TSource> = unknown,
    TDestination extends Dictionary<TDestination> = unknown
  >(
    source: TKey,
    destination: TKey,
    sourceObj?: TSource,
    destinationObj?: TDestination
  ): [sourceInstance: TSource, destinationInstance: TDestination];

  /**
   * Optional method to clean up the plugin's storages
   */
  dispose?(): void;
}
