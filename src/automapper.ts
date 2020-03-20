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
import { mappingStorage, profileStorage } from './storages';
import {
  AutoMapperGlobalSettings,
  BaseOf,
  Constructible,
  CreateMapFluentFunction,
  CreateMapOptions,
  Dict,
  MapOptions,
  MappingProfile,
  NamingConvention,
} from './types';

export class AutoMapper {
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
    profileStorage.add(this, new profile(this));
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
    const mapping = createMappingObject(source, destination, mergeOptions);
    return createMapFluentFunction(mapping, mergeOptions);
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
      source || (sourceObj.constructor as Constructible<TSource>)
    );
    return map(sourceObj, mapping, options);
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
    source?: Constructible<TSource>,
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
      source || (sourceArr[0].constructor as Constructible<TSource>)
    );

    return mapArray(sourceArr, mapping, options);
  }

  dispose(): void {
    this.setDefault();
    mappingStorage.dispose();
  }

  private setDefault() {
    profileStorage.initialize(this);
    this.defaultNamingConventions = [
      defaultNamingConvention,
      defaultNamingConvention,
    ];
  }
}

export const Mapper = new AutoMapper();
