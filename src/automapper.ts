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

  private defaultNamingConventions!: [
    Constructible<NamingConvention>,
    Constructible<NamingConvention>
  ];

  constructor() {
    this.setDefault();
  }

  withGlobalSettings(settings: AutoMapperGlobalSettings): AutoMapper {
    const { sourceNamingConvention, destinationNamingConvention } = settings;
    if (sourceNamingConvention) {
      this.defaultNamingConventions[0] = sourceNamingConvention;
    }

    if (destinationNamingConvention) {
      this.defaultNamingConventions[1] = destinationNamingConvention;
    }
    return this;
  }

  addProfile(profile: new (mapper: AutoMapper) => MappingProfile): AutoMapper {
    this._profileStorage.add(this, new profile(this));
    return this;
  }

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
      sourceMemberNamingConvention: this.defaultNamingConventions[0],
      destinationMemberNamingConvention: this.defaultNamingConventions[1],
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

  map<
    TSource extends Dict<TSource> = any,
    TDestination extends Dict<TDestination> = any
  >(
    sourceObj: TSource,
    destination: Constructible<TDestination>,
    source?: Constructible<TSource>,
    options?: MapOptions<TSource, TDestination>
  ): TDestination;
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

  mapAsync<
    TSource extends Dict<TSource> = any,
    TDestination extends Dict<TDestination> = any
  >(
    sourceObj: TSource,
    destination: Constructible<TDestination>,
    source?: Constructible<TSource>,
    options?: MapOptions<TSource, TDestination>
  ): Promise<TDestination>;
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

  mapArray<
    TSource extends Dict<TSource> = any,
    TDestination extends Dict<TDestination> = any
  >(
    sourceArr: TSource[],
    destination: Constructible<TDestination>,
    source?: Constructible<TSource>,
    options?: MapOptions<TSource[], TDestination[]>
  ): TDestination[];
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

  mapArrayAsync<
    TSource extends Dict<TSource> = any,
    TDestination extends Dict<TDestination> = any
  >(
    sourceArr: TSource[],
    destination: Constructible<TDestination>,
    source?: Constructible<TSource>,
    options?: MapOptions<TSource[], TDestination[]>
  ): Promise<TDestination[]>;
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

  getMapping<
    TSource extends Dict<TSource> = any,
    TDestination extends Dict<TDestination> = any
  >(
    source: Constructible<TSource>,
    destination: Constructible<TDestination>
  ): Mapping<TSource, TDestination> | undefined {
    return this._mappingStorage.get(source, destination);
  }

  dispose(): void {
    this.setDefault();
    this._mappingStorage.dispose();
  }

  get mappingStorage(): MappingStorage {
    return this._mappingStorage;
  }

  get profileStorage(): ProfileStorage {
    return this._profileStorage;
  }

  private setDefault() {
    this._profileStorage.initialize(this);
    this.defaultNamingConventions = [
      defaultNamingConvention,
      defaultNamingConvention,
    ];
  }
}

export const Mapper = new AutoMapper();
