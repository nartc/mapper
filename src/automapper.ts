import { AutoMapperBase } from './base';
import {
  defaultDestinationMemberNamingConvention,
  defaultSourceMemberNamingConvention,
} from './constants';
import {
  AutoMapperConfiguration,
  Constructible,
  CreateMapActions,
  CreateMapFluentFunctions,
  CreateReversedMapFluentFunctions,
  Dict,
  MapActionOptions,
  Mapping,
  MappingProfile,
} from './types';
import {
  _createMapForMember,
  _createMapForPath,
  _initializeMappingProperties,
} from './utils';

export class AutoMapper extends AutoMapperBase {
  private static _instance: AutoMapper = new AutoMapper();
  private readonly _profiles: { [key: string]: MappingProfile };

  /**
   * @static - Get the Mapper instance
   */
  public static getInstance(): AutoMapper {
    return this._instance;
  }

  constructor() {
    super();
    this._profiles = {};
    if (!AutoMapper._instance) {
      AutoMapper._instance = this;
    }
  }

  /**
   * Initialize an AutoMapper instance.
   *
   * @example
   * ```typescript
   * const mapper = new AutoMapper();
   * mapper.initialize(config => {
   *   config.addProfile(...);
   *   config.createMap(...);
   * });
   *
   * // or use the default singleton Mapper
   * Mapper.initialize(config => {
   *   config.addProfile(...);
   *   config.createMap(...);
   * });
   * ```
   *
   * @param {(config: AutoMapperConfiguration) => void} configFn - Configuration Fn to be called when initializing an
   *   AutoMapper instance.
   */
  public initialize(configFn: (config: AutoMapperConfiguration) => void): void {
    const _config: AutoMapperConfiguration = {
      addProfile: (
        profile: new (mapper: AutoMapper) => MappingProfile
      ): AutoMapper => {
        return this.addProfile(profile);
      },
      createMap: <
        TSource extends Dict<TSource> = any,
        TDestination extends Dict<TDestination> = any
      >(
        source: Constructible<TSource>,
        destination: Constructible<TDestination>
      ): CreateMapFluentFunctions<TSource, TDestination> => {
        return this.createMap(source, destination);
      },
    };
    configFn(_config);
  }

  /**
   * Add a MappingProfile to an AutoMapper instance
   *
   * @example
   * ```typescript
   * // Example uses the Mapper singleton. You can always use a new instance of AutoMapper
   *
   * // MappingProfileBase implements MappingProfile. You can extend MappingProfileBase or implements MappingProfile
   *   yourself.
   * // Using MappingProfileBase + a super() call will assign the Profile class name to profileName automatically.
   * // Implementing MappingProfile yourself will require you to provide value for profileName and it has to be unique.
   * class SomeProfile extends MappingProfileBase {
   *   constructor(mapper: AutoMapper) {
   *     super();
   *     mapper.createMap(...);
   *   }
   * }
   *
   * Mapper.addProfile(SomeProfile);
   * ```
   *
   * @param {new (mapper: AutoMapper) => MappingProfile} profile - A MappingProfile to be add to this AutoMapper
   *   instance
   */
  public addProfile(
    profile: new (mapper: AutoMapper) => MappingProfile
  ): AutoMapper {
    if (this._profiles[profile.name]) {
      throw new Error(
        `${profile.name} is already existed on the current Mapper instance`
      );
    }

    this._profiles[profile.name] = Object.freeze(new profile(this));
    return this;
  }

  /**
   * Create a Mapping for a Source Model and a Destination Model
   *
   * @example
   * ```typescript
   * Mapper.createMap(User, UserVm);
   * ```
   *
   * @param {Constructible<TSource>} source - Source Model
   * @param {Constructible<TDestination>} destination - Destination Model
   * @param {CreateMapActions} [options] - An option object with destination and source NamingConvention. Both are
   *   defaulted to CamelCaseNamingConvention()
   */
  public createMap<
    TSource extends Dict<TSource> = any,
    TDestination extends Dict<TDestination> = any
  >(
    source: Constructible<TSource>,
    destination: Constructible<TDestination>,
    options?: CreateMapActions
  ): CreateMapFluentFunctions<TSource, TDestination> {
    const mergeOptions: CreateMapActions = {
      sourceMemberNamingConvention: defaultSourceMemberNamingConvention,
      destinationMemberNamingConvention: defaultDestinationMemberNamingConvention,
      ...options,
    };
    const _mapping = super._createMappingObject(
      source,
      destination,
      mergeOptions
    );
    return this._createMappingFluentFunctions(_mapping);
  }

  /**
   * Map a Source object to a Destination Model using a pre-configured Mapping object.
   *
   * @example
   * ```typescript
   * const vm = Mapper.map(user, UserVm);
   *
   * console.log(vm instanceof UserVm); // true
   * ```
   *
   * @param {TSource} sourceObj - Source object value to execute the mapping against
   * @param {Constructible<TDestination>} destination - Destination Model to map to
   * @param {MapActionOptions} [options] - An optional option object with beforeMap and/or afterMap callback. Both
   *   callbacks are defaulted to undefined aka no callbacks.
   */
  public map<
    TSource extends Dict<TSource> = any,
    TDestination extends Dict<TDestination> = any
  >(
    sourceObj: TSource,
    destination: Constructible<TDestination>,
    options?: MapActionOptions<TSource, TDestination>
  ): TDestination {
    const mapping = super._getMappingForDestination(destination, sourceObj);
    return super._map(sourceObj, mapping, options);
  }

  /**
   * Map a Source object to a Destination Model using a pre-configured Mapping object. Executed as a Micro Task to not
   * block the main thread.
   *
   * @example
   * ```typescript
   * const vm = await Mapper.mapAsync(user, UserVm);
   *
   * console.log(vm instanceof UserVm); // true
   * ```
   *
   * @param {TSource} sourceObj - Source object value to execute the mapping against
   * @param {Constructible<TDestination>} destination - Destination Model to map to
   * @param {MapActionOptions} [options] - An optional option object with beforeMap and/or afterMap callback. Both
   *   callbacks are defaulted to undefined aka no callbacks.
   */
  public mapAsync<
    TSource extends Dict<TSource> = any,
    TDestination extends Dict<TDestination> = any
  >(
    sourceObj: TSource,
    destination: Constructible<TDestination>,
    options?: MapActionOptions<TSource, TDestination>
  ): Promise<TDestination> {
    const mapping = super._getMappingForDestination(destination, sourceObj);
    return super._mapAsync(sourceObj, mapping, options);
  }

  /**
   * Map an Array/List of Source object to an Array/List of Destination Model using a pre-configured Mapping.
   *
   * @example
   * ```typescript
   * const vms = Mapper.mapArray(users, UserVm);
   *
   * console.log(vms.length === users.length); // true
   * vms.forEach(vm => {
   *   console.log(vm instanceof UserVm); // true
   * })
   * ```
   *
   * @param {TSource[]} sourceArr - Source array to execute the mapping against
   * @param {Constructible<TDestination>} destination - Destination Model to map to
   * @param {MapActionOptions} [options] - An optional option object with beforeMap and/or afterMap callback. Both
   *   callbacks are defaulted to undefined aka no callbacks.
   */
  public mapArray<
    TSource extends Dict<TSource> = any,
    TDestination extends Dict<TDestination> = any
  >(
    sourceArr: TSource[],
    destination: Constructible<TDestination>,
    options?: MapActionOptions<TSource[], TDestination[]>
  ): TDestination[] {
    const mapping = super._getMappingForDestination(destination, sourceArr[0]);
    return super._mapArray(sourceArr, mapping, options);
  }

  /**
   * Map an Array/List of Source object to an Array/List of Destination Model using a pre-configured Mapping. Executed
   * as a Micro Task to not block the main thread.
   *
   * @example
   * ```typescript
   * const vms = await Mapper.mapArrayAsync(users, UserVm);
   *
   * console.log(vms.length === users.length); // true
   * vms.forEach(vm => {
   *   console.log(vm instanceof UserVm); // true
   * })
   * ```
   *
   * @param {TSource[]} sourceArr - Source array to execute the mapping against
   * @param {Constructible<TDestination>} destination - Destination Model to map to
   * @param {MapActionOptions} [options] - An optional option object with beforeMap and/or afterMap callback. Both
   *   callbacks are defaulted to undefined aka no callbacks.
   */
  public mapArrayAsync<
    TSource extends Dict<TSource> = any,
    TDestination extends Dict<TDestination> = any
  >(
    sourceArr: TSource[],
    destination: Constructible<TDestination>,
    options?: MapActionOptions<TSource[], TDestination[]>
  ): Promise<TDestination[]> {
    const mapping = super._getMappingForDestination(destination, sourceArr[0]);
    return super._mapArrayAsync(sourceArr, mapping, options);
  }

  /**
   * Dispose all configurations set on an AutoMapper instance.
   *
   * @example
   * ```typescript
   * Mapper.createMap(User, UserVm);
   *
   * const vm = Mapper.map(user, UserVm); // works
   *
   * Mapper.dispose();
   *
   * const vm2 = Mapper.map(user, UserVm); // Exception: Mapping<User, UserVm> is no longer existed.
   *
   * ```
   */
  public dispose(): void {
    Object.keys(this._profiles).forEach(key => {
      delete this._profiles[key];
    });
    super._dispose();
  }

  private _createMappingFluentFunctions<
    TSource extends Dict<TSource> = any,
    TDestination extends Dict<TDestination> = any
  >(
    mapping: Mapping<TSource, TDestination>
  ): CreateMapFluentFunctions<TSource, TDestination> {
    _initializeMappingProperties(mapping);
    const _fluentFunctions: CreateMapFluentFunctions<TSource, TDestination> = {
      forMember: (selector, expression) => {
        return _createMapForMember(
          mapping,
          selector,
          expression,
          _fluentFunctions
        );
      },
      beforeMap: action => {
        mapping.beforeMapAction = action;
        return _fluentFunctions;
      },
      afterMap: action => {
        mapping.afterMapAction = action;
        return _fluentFunctions;
      },
      reverseMap: () => {
        const reversedMapping = super._createReversedMappingObject(mapping);
        return this._createReversedMappingFluentFunctions(reversedMapping);
      },
    };

    return _fluentFunctions;
  }

  private _createReversedMappingFluentFunctions<
    TSource extends Dict<TSource> = any,
    TDestination extends Dict<TDestination> = any
  >(
    mapping: Mapping<TDestination, TSource>
  ): CreateReversedMapFluentFunctions<TDestination, TSource> {
    const _reversedFluentFunctions: CreateReversedMapFluentFunctions<
      TDestination,
      TSource
    > = {
      forPath: (selector, expression) => {
        return _createMapForPath(
          mapping,
          selector,
          expression,
          _reversedFluentFunctions
        );
      },
      beforeMap: action => {
        mapping.beforeMapAction = action;
        return _reversedFluentFunctions;
      },
      afterMap: action => {
        mapping.afterMapAction = action;
        return _reversedFluentFunctions;
      },
    };

    return _reversedFluentFunctions;
  }
}

export const Mapper = AutoMapper.getInstance();
