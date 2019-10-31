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

  public initialize(configFn: (config: AutoMapperConfiguration) => void): void {
    const _config: AutoMapperConfiguration = {
      addProfile: (profile: MappingProfile): AutoMapper => {
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

  public addProfile(profile: MappingProfile): AutoMapper {
    if (this._profiles[profile.profileName]) {
      throw new Error(
        `${profile.profileName} is already existed on the current Mapper instance`
      );
    }

    profile.configure(this);
    this._profiles[profile.profileName] = Object.freeze(profile);
    return this;
  }

  public createMap<
    TSource extends Dict<TSource> = any,
    TDestination extends Dict<TDestination> = any
  >(
    source: Constructible<TSource>,
    destination: Constructible<TDestination>,
    options: CreateMapActions = {
      destinationMemberNamingConvention: defaultDestinationMemberNamingConvention,
      sourceMemberNamingConvention: defaultSourceMemberNamingConvention,
    }
  ): CreateMapFluentFunctions<TSource, TDestination> {
    const _mapping = super._createMappingObject(source, destination, options);
    return this._createMappingFluentFunctions(_mapping);
  }

  public map<
    TSource extends Dict<TSource> = any,
    TDestination extends Dict<TDestination> = any
  >(
    sourceObj: TSource,
    destination: Constructible<TDestination>,
    options?: MapActionOptions<TSource, TDestination>
  ): TDestination {
    const mapping = super._getMappingForDestination(destination);
    return super._map(sourceObj, mapping, options);
  }

  public mapAsync<
    TSource extends Dict<TSource> = any,
    TDestination extends Dict<TDestination> = any
  >(
    sourceObj: TSource,
    destination: Constructible<TDestination>,
    options?: MapActionOptions<TSource, TDestination>
  ): Promise<TDestination> {
    const mapping = super._getMappingForDestination(destination);
    return super._mapAsync(sourceObj, mapping, options);
  }

  public mapArray<
    TSource extends Dict<TSource> = any,
    TDestination extends Dict<TDestination> = any
  >(
    sourceArr: TSource[],
    destination: Constructible<TDestination>,
    options?: MapActionOptions<TSource[], TDestination[]>
  ): TDestination[] {
    const mapping = super._getMappingForDestination(destination);
    return super._mapArray(sourceArr, mapping, options);
  }

  public mapArrayAsync<
    TSource extends Dict<TSource> = any,
    TDestination extends Dict<TDestination> = any
  >(
    sourceArr: TSource[],
    destination: Constructible<TDestination>,
    options?: MapActionOptions<TSource[], TDestination[]>
  ): Promise<TDestination[]> {
    const mapping = super._getMappingForDestination(destination);
    return super._mapArrayAsync(sourceArr, mapping, options);
  }

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
