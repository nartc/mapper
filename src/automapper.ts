import 'reflect-metadata';
import { defaultNamingConvention } from './conventions';
import {
  createMapFluentFunction,
  createMappingObject,
  getMappingForDestination,
  getMapProps,
  map,
  mapArray,
} from './core';
import { MetadataExplorer } from './explorers';
import { MappingStorage, ProfileStorage } from './storages';
import {
  AutoMapperGlobalSettings,
  BaseOf,
  Constructible,
  CreateMapFluentFunction,
  CreateMapOptions,
  Dict,
  MapOptions,
  Mapping,
  MappingProfile,
  NamingConvention,
} from './types';

export class AutoMapper {
  private readonly _mappingStorage = new MappingStorage();
  private readonly _profileStorage = new ProfileStorage();

  private defaultGlobalSettings!: [
    boolean,
    Constructible<NamingConvention>,
    Constructible<NamingConvention>
  ];

  constructor() {
    this.setDefault();
  }

  /**
   * Provide global naming conventions to the models
   *
   * @param {AutoMapperGlobalSettings} settings
   */
  withGlobalSettings(settings: AutoMapperGlobalSettings): AutoMapper {
    const {
      useUndefined,
      sourceNamingConvention,
      destinationNamingConvention,
    } = settings;

    this.defaultGlobalSettings[0] = useUndefined ?? false;

    if (sourceNamingConvention) {
      this.defaultGlobalSettings[1] = sourceNamingConvention;
    }

    if (destinationNamingConvention) {
      this.defaultGlobalSettings[2] = destinationNamingConvention;
    }
    return this;
  }

  /**
   * Add a Profile to this AutoMapper instance
   * @param {MappingProfile} profile
   */
  addProfile(profile: new (mapper: AutoMapper) => MappingProfile): AutoMapper {
    this._profileStorage.add(this, new profile(this));
    return this;
  }

  /**
   * Create a mapping between a Source and a Destination with an optional Options
   *
   * @param {Constructible} source
   * @param {Constructible} destination
   * @param {CreateMapOptions} options - Provide inheritance and naming conventions for this Mapping
   */
  createMap<
    TSource extends Dict<TSource> = any,
    TDestination extends Dict<TDestination> = any,
    TBaseSource extends BaseOf<TSource, TBaseSource> = any,
    TBaseDestination extends BaseOf<TDestination, TBaseDestination> = any
  >(
    source: Constructible<TSource>,
    destination: Constructible<TDestination>,
    options?: CreateMapOptions<
      TSource,
      TDestination,
      TBaseSource,
      TBaseDestination
    >
  ): CreateMapFluentFunction<
    TSource,
    TDestination,
    TBaseSource,
    TBaseDestination
  > {
    MetadataExplorer.explore(source, destination);
    const mergeOptions: CreateMapOptions<
      TSource,
      TDestination,
      TBaseSource,
      TBaseDestination
    > = {
      useUndefined: this.defaultGlobalSettings[0],
      sourceMemberNamingConvention: this.defaultGlobalSettings[1],
      destinationMemberNamingConvention: this.defaultGlobalSettings[2],
      ...options,
    };
    const mapping = createMappingObject(
      source,
      destination,
      mergeOptions,
      this._mappingStorage
    );
    return createMapFluentFunction(mapping, mergeOptions, this._mappingStorage);
  }

  /**
   * Map a sourceObj to the Destination with Source model provided.
   * Usually used to map plain object of Source instead of an instance of Source.
   *
   * @example
   * ```typescript
   * const user = this.db.findOne(...).toJSON();
   * Mapper.map(user, UserVm, User);
   * ```
   *
   * @param {object} sourceObj
   * @param {Constructible} destination
   * @param {Constructible} source
   * @param {MapOptions} options - Provide callbacks for this map operation
   */
  map<
    TSource extends Dict<TSource> = any,
    TDestination extends Dict<TDestination> = any
  >(
    sourceObj: TSource,
    destination: Constructible<TDestination>,
    source?: Constructible<TSource>,
    options?: MapOptions<TSource, TDestination>
  ): TDestination;
  /**
   * Map a sourceObj to the Destination with an optional Options provided.
   *
   * @param {object} sourceObj
   * @param {Constructible} destination
   * @param {MapOptions} options - Provide callbacks for this map operation
   */
  map<
    TSource extends Dict<TSource> = any,
    TDestination extends Dict<TDestination> = any
  >(
    sourceObj: TSource,
    destination: Constructible<TDestination>,
    options?: MapOptions<TSource, TDestination>
  ): TDestination;
  map<
    TSource extends Dict<TSource> = any,
    TDestination extends Dict<TDestination> = any
  >(sourceObj: TSource, ...args: any[]): TDestination {
    const [destination, source, options] = getMapProps(args);
    const mapping = getMappingForDestination(
      destination,
      source || (sourceObj.constructor as Constructible<TSource>),
      this._mappingStorage
    );
    return map(sourceObj, mapping, options, this._mappingStorage);
  }

  /**
   * Async version of map()
   */
  mapAsync<
    TSource extends Dict<TSource> = any,
    TDestination extends Dict<TDestination> = any
  >(
    sourceObj: TSource,
    destination: Constructible<TDestination>,
    source?: Constructible<TSource>,
    options?: MapOptions<TSource, TDestination>
  ): Promise<TDestination>;
  /**
   * Async version of map()
   */
  mapAsync<
    TSource extends Dict<TSource> = any,
    TDestination extends Dict<TDestination> = any
  >(
    sourceObj: TSource,
    destination: Constructible<TDestination>,
    options?: MapOptions<TSource, TDestination>
  ): Promise<TDestination>;
  mapAsync<
    TSource extends Dict<TSource> = any,
    TDestination extends Dict<TDestination> = any
  >(sourceObj: TSource, ...args: any[]): Promise<TDestination> {
    const [destination, source, options] = getMapProps(args);
    const mapping = getMappingForDestination(
      destination,
      source || (sourceObj.constructor as Constructible<TSource>),
      this._mappingStorage
    );
    return Promise.resolve().then(() =>
      map(sourceObj, mapping, options, this._mappingStorage)
    );
  }

  /**
   * Map a sourceArr to an array of Destination with Source model provided.
   * Usually used to map plain array of Source instead of an instance of Source.
   *
   * @example
   * ```typescript
   * const user = this.db.findOne(...).toJSON();
   * Mapper.map(user, UserVm, User);
   * ```
   *
   * @param {Array} sourceArr
   * @param {Constructible} destination
   * @param {Constructible} source
   * @param {MapOptions} options - Provide callbacks for this map operation
   */
  mapArray<
    TSource extends Dict<TSource> = any,
    TDestination extends Dict<TDestination> = any
  >(
    sourceArr: TSource[],
    destination: Constructible<TDestination>,
    source?: Constructible<TSource>,
    options?: MapOptions<TSource[], TDestination[]>
  ): TDestination[];
  /**
   * Map a sourceArr to an Array of Destination with an optional Options provided.
   *
   * @param {Array} sourceArr
   * @param {Constructible} destination
   * @param {MapOptions} options - Provide callbacks for this map operation
   */
  mapArray<
    TSource extends Dict<TSource> = any,
    TDestination extends Dict<TDestination> = any
  >(
    sourceArr: TSource[],
    destination: Constructible<TDestination>,
    options?: MapOptions<TSource[], TDestination[]>
  ): TDestination[];
  mapArray<
    TSource extends Dict<TSource> = any,
    TDestination extends Dict<TDestination> = any
  >(sourceArr: TSource[], ...args: any[]): TDestination[] {
    if (!sourceArr.length) {
      return [];
    }

    const [destination, source, options] = getMapProps(args);
    const mapping = getMappingForDestination(
      destination,
      source || (sourceArr[0].constructor as Constructible<TSource>),
      this._mappingStorage
    );

    return mapArray(sourceArr, mapping, options, this._mappingStorage);
  }

  /**
   * Async version of mapArray()
   */
  mapArrayAsync<
    TSource extends Dict<TSource> = any,
    TDestination extends Dict<TDestination> = any
  >(
    sourceArr: TSource[],
    destination: Constructible<TDestination>,
    source?: Constructible<TSource>,
    options?: MapOptions<TSource[], TDestination[]>
  ): Promise<TDestination[]>;
  /**
   * Async version of mapArray()
   */
  mapArrayAsync<
    TSource extends Dict<TSource> = any,
    TDestination extends Dict<TDestination> = any
  >(
    sourceArr: TSource[],
    destination: Constructible<TDestination>,
    options?: MapOptions<TSource[], TDestination[]>
  ): Promise<TDestination[]>;
  mapArrayAsync<
    TSource extends Dict<TSource> = any,
    TDestination extends Dict<TDestination> = any
  >(sourceArr: TSource[], ...args: any[]): Promise<TDestination[]> {
    if (!sourceArr.length) {
      return Promise.resolve().then(() => []);
    }

    const [destination, source, options] = getMapProps(args);
    const mapping = getMappingForDestination(
      destination,
      source || (sourceArr[0].constructor as Constructible<TSource>),
      this._mappingStorage
    );

    return Promise.resolve().then(() =>
      mapArray(sourceArr, mapping, options, this._mappingStorage)
    );
  }

  /**
   * Retrieve the mapping of a Source and a Destination
   *
   * @param {Constructible} source
   * @param {Constructible} destination
   */
  getMapping<
    TSource extends Dict<TSource> = any,
    TDestination extends Dict<TDestination> = any
  >(
    source: Constructible<TSource>,
    destination: Constructible<TDestination>
  ): Mapping<TSource, TDestination> | undefined {
    return this._mappingStorage.get(source, destination);
  }

  /**
   * Dispose of all Mappings and Profiles on the AutoMapper instance
   */
  dispose(): void {
    this.setDefault();
    this._mappingStorage.dispose();
  }

  /**
   * Retrieve the current instance of the MappingStorage on the AutoMapper instance
   */
  get mappingStorage(): MappingStorage {
    return this._mappingStorage;
  }

  /**
   * Retrieve the current instance of the ProfileStorage on the AutoMapper instance
   */
  get profileStorage(): ProfileStorage {
    return this._profileStorage;
  }

  private setDefault() {
    this._profileStorage.initialize(this);
    this.defaultGlobalSettings = [
      false,
      defaultNamingConvention,
      defaultNamingConvention,
    ];
  }
}

export const Mapper = new AutoMapper();
