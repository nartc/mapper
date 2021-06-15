import { TransformationType } from './enums';
import type { CreateMapOptions, MapArrayOptions, MapOptions } from './options';
import type {
  Dictionary,
  Selector,
  SelectorReturn,
  ValueSelector,
} from './utils';

export interface ConditionPredicate<TSource extends Dictionary<TSource> = any> {
  (source: TSource): boolean;
}

export interface MapAction<
  TSource extends Dictionary<TSource> = any,
  TDestination extends Dictionary<TDestination> = any
> {
  (source: TSource, destination: TDestination): void;
}

export interface NamingConvention {
  splittingExpression: RegExp;
  separatorCharacter: string;
  transformPropertyName: (sourcePropNameParts: string[]) => string;
}

export interface Resolver<
  TSource extends Dictionary<TSource> = any,
  TDestination extends Dictionary<TDestination> = any,
  TResolvedType = SelectorReturn<TDestination>
> {
  resolve(source: TSource, destination?: TDestination): TResolvedType;
}

export interface Converter<
  TConvertSource = unknown,
  TConvertDestination = unknown
> {
  convert(source: TConvertSource): TConvertDestination;
}

export type MemberMapReturn<
  TSource extends Dictionary<TSource> = any,
  TDestination extends Dictionary<TDestination> = any,
  TSelectorReturn = SelectorReturn<TDestination>
> =
  | MapDeferReturn<TSource, TDestination, TSelectorReturn>
  | MapWithReturn<TSource, TDestination, TSelectorReturn>
  | MemberMapReturnNoDefer<TSource, TDestination, TSelectorReturn>;

export type MemberMapReturnNoDefer<
  TSource extends Dictionary<TSource> = any,
  TDestination extends Dictionary<TDestination> = any,
  TSelectorReturn = SelectorReturn<TDestination>
> =
  | MapInitializeReturn<TSource, TDestination, TSelectorReturn>
  | MapFromReturn<TSource, TDestination, TSelectorReturn>
  | ConditionReturn<TSource, TDestination, TSelectorReturn>
  | FromValueReturn<TSource, TDestination, TSelectorReturn>
  | ConvertUsingReturn<TSource>
  | NullSubstitutionReturn<TSource, TDestination, TSelectorReturn>
  | IgnoreReturn
  | MapWithArgumentsReturn<TSource, TDestination, TSelectorReturn>;

export type PreConditionReturn<
  TSource extends Dictionary<TSource> = any,
  TDestination extends Dictionary<TDestination> = any,
  TSelectorReturn = SelectorReturn<TDestination>
> = [
  preConditionPredicate: (source: TSource) => boolean,
  defaultValue?: TSelectorReturn
];

export interface DeferFunction<
  TSource extends Dictionary<TSource> = any,
  TDestination extends Dictionary<TDestination> = any,
  TSelectorReturn = SelectorReturn<TDestination>
> {
  (source: TSource):
    | MemberMapReturnNoDefer<TSource, TDestination, TSelectorReturn>
    | MapWithReturn<TSource, TDestination, TSelectorReturn>;
}

export type MapDeferReturn<
  TSource extends Dictionary<TSource> = any,
  TDestination extends Dictionary<TDestination> = any,
  TSelectorReturn = SelectorReturn<TDestination>
> = [
  TransformationType.MapDefer,
  DeferFunction<TSource, TDestination, TSelectorReturn>
];

export type MapFromReturn<
  TSource extends Dictionary<TSource> = any,
  TDestination extends Dictionary<TDestination> = any,
  TSelectorReturn = SelectorReturn<TDestination>
> = [
  TransformationType.MapFrom,
  (source: TSource, destination?: TDestination) => TSelectorReturn,
  ValueSelector<TSource, TDestination, TSelectorReturn> | null
];

export type MapWithReturn<
  TSource extends Dictionary<TSource> = any,
  TDestination extends Dictionary<TDestination> = any,
  TSelectorReturn = SelectorReturn<TDestination>
> = [
  TransformationType.MapWith,
  (sourceObj: TSource, mapper: Mapper) => TSelectorReturn | undefined | null,
  ValueSelector<TSource>
];

export type ConditionReturn<
  TSource extends Dictionary<TSource> = any,
  TDestination extends Dictionary<TDestination> = any,
  TSelectorReturn = SelectorReturn<TDestination>
> = [
  TransformationType.Condition,
  (source: TSource, sourceMemberPath: string[]) => TSelectorReturn
];

export type FromValueReturn<
  TSource extends Dictionary<TSource> = any,
  TDestination extends Dictionary<TDestination> = any,
  TSelectorReturn = SelectorReturn<TDestination>
> = [TransformationType.FromValue, () => TSelectorReturn];

export type ConvertUsingReturn<
  TSource extends Dictionary<TSource> = any,
  TConvertSource = TSource
> = [TransformationType.ConvertUsing, Selector<TSource, TConvertSource>];

export type NullSubstitutionReturn<
  TSource extends Dictionary<TSource> = any,
  TDestination extends Dictionary<TDestination> = any,
  TSelectorReturn = SelectorReturn<TDestination>
> = [
  TransformationType.NullSubstitution,
  (source: TSource, sourceMemberPath: string[]) => TSelectorReturn
];

export type IgnoreReturn = [TransformationType.Ignore];

export type MapWithArgumentsReturn<
  TSource extends Dictionary<TSource> = any,
  TDestination extends Dictionary<TDestination> = any,
  TSelectorReturn = SelectorReturn<TDestination>
> = [
  TransformationType.MapWithArguments,
  (source: TSource, extraArguments: Record<string, unknown>) => TSelectorReturn
];

export type MapInitializeReturn<
  TSource extends Dictionary<TSource> = any,
  TDestination extends Dictionary<TDestination> = any,
  TSelectorReturn = SelectorReturn<TDestination>
> = [TransformationType.MapInitialize, Selector<TSource, TSelectorReturn>];

export interface Mapper {
  name: string;

  createMap<
    TSource extends Dictionary<TSource> = any,
    TDestination extends Dictionary<TDestination> = any
  >(
    source: new (...args: unknown[]) => TSource,
    destination: new (...args: unknown[]) => TDestination,
    options?: CreateMapOptions
  ): CreateMapFluentFunction<TSource, TDestination>;

  createMap<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>
  >(
    source: string,
    destination: string,
    options?: CreateMapOptions
  ): CreateMapFluentFunction<TSource, TDestination>;

  getMapping<TKey = unknown>(
    source: TKey,
    destination: TKey
  ): Mapping | undefined;

  getMapping<
    TSource extends Dictionary<TSource> = any,
    TDestination extends Dictionary<TDestination> = any
  >(
    source: new (...args: unknown[]) => TSource,
    destination: new (...args: unknown[]) => TDestination
  ): Mapping<TSource, TDestination> | undefined;

  getMapping<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>
  >(
    source: string,
    destination: string
  ): Mapping<TSource, TDestination> | undefined;

  addProfile(profile: MappingProfile): Mapper;

  map<
    TSource extends Dictionary<TSource> = any,
    TDestination extends Dictionary<TDestination> = any
  >(
    sourceObj: TSource,
    destination: new (...args: unknown[]) => TDestination,
    source: new (...args: unknown[]) => TSource,
    options?: MapOptions<TSource, TDestination>
  ): TDestination;

  map<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>
  >(
    sourceObj: TSource,
    destination: string,
    source: string,
    options?: MapOptions<TSource, TDestination>
  ): TDestination;

  map<
    TSource extends Dictionary<TSource> = any,
    TDestination extends Dictionary<TDestination> = any
  >(
    sourceObj: TSource,
    destination: new (...args: unknown[]) => TDestination,
    source: new (...args: unknown[]) => TSource,
    destinationObj: TDestination,
    options?: MapOptions<TSource, TDestination>
  ): void;

  map<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>
  >(
    sourceObj: TSource,
    destination: string,
    source: string,
    destinationObj: TDestination,
    options?: MapOptions<TSource, TDestination>
  ): void;

  mapAsync<
    TSource extends Dictionary<TSource> = any,
    TDestination extends Dictionary<TDestination> = any
  >(
    sourceObj: TSource,
    destination: new (...args: unknown[]) => TDestination,
    source: new (...args: unknown[]) => TSource,
    options?: MapOptions<TSource, TDestination>
  ): Promise<TDestination>;

  mapAsync<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>
  >(
    sourceObj: TSource,
    destination: string,
    source: string,
    options?: MapOptions<TSource, TDestination>
  ): Promise<TDestination>;

  mapAsync<
    TSource extends Dictionary<TSource> = any,
    TDestination extends Dictionary<TDestination> = any
  >(
    sourceObj: TSource,
    destination: new (...args: unknown[]) => TDestination,
    source: new (...args: unknown[]) => TSource,
    destinationObj: TDestination,
    options?: MapOptions<TSource, TDestination>
  ): Promise<void>;

  mapAsync<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>
  >(
    sourceObj: TSource,
    destination: string,
    source: string,
    destinationObj: TDestination,
    options?: MapOptions<TSource, TDestination>
  ): Promise<void>;

  mapArray<
    TSource extends Dictionary<TSource> = any,
    TDestination extends Dictionary<TDestination> = any
  >(
    sourceArray: TSource[],
    destination: new (...args: unknown[]) => TDestination,
    source: new (...args: unknown[]) => TSource,
    options?: MapArrayOptions<TSource, TDestination>
  ): TDestination[];

  mapArray<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>
  >(
    sourceArray: TSource[],
    destination: string,
    source: string,
    options?: MapArrayOptions<TSource, TDestination>
  ): TDestination[];

  mapArrayAsync<
    TSource extends Dictionary<TSource> = any,
    TDestination extends Dictionary<TDestination> = any
  >(
    sourceArray: TSource[],
    destination: new (...args: unknown[]) => TDestination,
    source: new (...args: unknown[]) => TSource,
    options?: MapArrayOptions<TSource, TDestination>
  ): Promise<TDestination[]>;

  mapArrayAsync<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>
  >(
    sourceArray: TSource[],
    destination: string,
    source: string,
    options?: MapArrayOptions<TSource, TDestination>
  ): Promise<TDestination[]>;

  dispose(): void;
}

export interface CreateMapFluentFunction<
  TSource extends Dictionary<TSource> = any,
  TDestination extends Dictionary<TDestination> = any
> {
  forMember<TMemberType = SelectorReturn<TDestination>>(
    selector: Selector<TDestination, TMemberType>,
    memberMapFunction: MapFromReturn<TSource, TDestination, TMemberType>
  ): CreateMapFluentFunction<TSource, TDestination>;

  forMember<TMemberType = SelectorReturn<TDestination>>(
    selector: Selector<TDestination, TMemberType>,
    memberMapFunction: MapWithReturn<TSource, TDestination, TMemberType>
  ): CreateMapFluentFunction<TSource, TDestination>;

  forMember<TMemberType = SelectorReturn<TDestination>>(
    selector: Selector<TDestination, TMemberType>,
    memberMapFunction: ConditionReturn<TSource, TDestination, TMemberType>
  ): CreateMapFluentFunction<TSource, TDestination>;

  forMember<TMemberType = SelectorReturn<TDestination>>(
    selector: Selector<TDestination, TMemberType>,
    memberMapFunction: FromValueReturn<TDestination, TMemberType>
  ): CreateMapFluentFunction<TSource, TDestination>;

  forMember<TMemberType = SelectorReturn<TDestination>>(
    selector: Selector<TDestination, TMemberType>,
    memberMapFunction: NullSubstitutionReturn<
      TSource,
      TDestination,
      TMemberType
    >
  ): CreateMapFluentFunction<TSource, TDestination>;

  forMember<TMemberType = SelectorReturn<TDestination>>(
    selector: Selector<TDestination, TMemberType>,
    memberMapFunction: ConvertUsingReturn<TSource>
  ): CreateMapFluentFunction<TSource, TDestination>;

  forMember<TMemberType = SelectorReturn<TDestination>>(
    selector: Selector<TDestination, TMemberType>,
    memberMapFunction: ConditionReturn<TSource, TDestination, TMemberType>
  ): CreateMapFluentFunction<TSource, TDestination>;

  forMember<TMemberType = SelectorReturn<TDestination>>(
    selector: Selector<TDestination, TMemberType>,
    memberMapFunction: IgnoreReturn
  ): CreateMapFluentFunction<TSource, TDestination>;

  forMember<TMemberType = SelectorReturn<TDestination>>(
    selector: Selector<TDestination, TMemberType>,
    memberMapFunction: MapWithArgumentsReturn<
      TSource,
      TDestination,
      TMemberType
    >
  ): CreateMapFluentFunction<TSource, TDestination>;

  forMember<TMemberType = SelectorReturn<TDestination>>(
    selector: Selector<TDestination, TMemberType>,
    preConditionFunction: PreConditionReturn<
      TSource,
      TDestination,
      TMemberType
    >,
    memberMapFunction: MapFromReturn<TSource, TDestination, TMemberType>
  ): CreateMapFluentFunction<TSource, TDestination>;

  forMember<TMemberType = SelectorReturn<TDestination>>(
    selector: Selector<TDestination, TMemberType>,
    preConditionFunction: PreConditionReturn<
      TSource,
      TDestination,
      TMemberType
    >,
    memberMapFunction: MapWithReturn<TSource, TDestination, TMemberType>
  ): CreateMapFluentFunction<TSource, TDestination>;

  forMember<TMemberType = SelectorReturn<TDestination>>(
    selector: Selector<TDestination, TMemberType>,
    preConditionFunction: PreConditionReturn<
      TSource,
      TDestination,
      TMemberType
    >,
    memberMapFunction: ConditionReturn<TSource, TDestination, TMemberType>
  ): CreateMapFluentFunction<TSource, TDestination>;

  forMember<TMemberType = SelectorReturn<TDestination>>(
    selector: Selector<TDestination, TMemberType>,
    preConditionFunction: PreConditionReturn<
      TSource,
      TDestination,
      TMemberType
    >,
    memberMapFunction: FromValueReturn<TDestination, TMemberType>
  ): CreateMapFluentFunction<TSource, TDestination>;

  forMember<TMemberType = SelectorReturn<TDestination>>(
    selector: Selector<TDestination, TMemberType>,
    preConditionFunction: PreConditionReturn<
      TSource,
      TDestination,
      TMemberType
    >,
    memberMapFunction: NullSubstitutionReturn<
      TSource,
      TDestination,
      TMemberType
    >
  ): CreateMapFluentFunction<TSource, TDestination>;

  forMember<TMemberType = SelectorReturn<TDestination>>(
    selector: Selector<TDestination, TMemberType>,
    preConditionFunction: PreConditionReturn<
      TSource,
      TDestination,
      TMemberType
    >,
    memberMapFunction: ConvertUsingReturn<TSource>
  ): CreateMapFluentFunction<TSource, TDestination>;

  forMember<TMemberType = SelectorReturn<TDestination>>(
    selector: Selector<TDestination, TMemberType>,
    preConditionFunction: PreConditionReturn<
      TSource,
      TDestination,
      TMemberType
    >,
    memberMapFunction: ConditionReturn<TSource, TDestination, TMemberType>
  ): CreateMapFluentFunction<TSource, TDestination>;

  forMember<TMemberType = SelectorReturn<TDestination>>(
    selector: Selector<TDestination, TMemberType>,
    preConditionFunction: PreConditionReturn<
      TSource,
      TDestination,
      TMemberType
    >,
    memberMapFunction: IgnoreReturn
  ): CreateMapFluentFunction<TSource, TDestination>;

  forMember<TMemberType = SelectorReturn<TDestination>>(
    selector: Selector<TDestination, TMemberType>,
    preConditionFunction: PreConditionReturn<
      TSource,
      TDestination,
      TMemberType
    >,
    memberMapFunction: MapWithArgumentsReturn<
      TSource,
      TDestination,
      TMemberType
    >
  ): CreateMapFluentFunction<TSource, TDestination>;

  forMember<TMemberType = SelectorReturn<TDestination>>(
    selector: Selector<TDestination, TMemberType>,
    mapDeferFn: MapDeferReturn<TSource, TDestination, TMemberType>
  ): CreateMapFluentFunction<TSource, TDestination>;

  forMember<TMemberType = SelectorReturn<TDestination>>(
    selector: Selector<TDestination, TMemberType>,
    preConditionFunction: PreConditionReturn<
      TSource,
      TDestination,
      TMemberType
    >,
    mapDeferFn: MapDeferReturn<TSource, TDestination, TMemberType>
  ): CreateMapFluentFunction<TSource, TDestination>;

  beforeMap(
    action: MapAction<TSource, TDestination>
  ): CreateMapFluentFunction<TSource, TDestination>;

  afterMap(
    action: MapAction<TSource, TDestination>
  ): CreateMapFluentFunction<TSource, TDestination>;
}

export type MappingTransformation<
  TSource extends Dictionary<TSource> = any,
  TDestination extends Dictionary<TDestination> = any,
  TSelectorReturn = SelectorReturn<TDestination>
> = [
  MemberMapReturn<TSource, TDestination, TSelectorReturn>,
  boolean?,
  PreConditionReturn<TSource, TDestination, TSelectorReturn>?
];
export type MappingProperty<
  TSource extends Dictionary<TSource> = any,
  TDestination extends Dictionary<TDestination> = any,
  TSelectorReturn = SelectorReturn<TDestination>
> = readonly [
  [target: string[], origin?: string[]],
  MappingTransformation<TSource, TDestination, TSelectorReturn>
];

export type Mapping<
  TSource extends Dictionary<TSource> = any,
  TDestination extends Dictionary<TDestination> = any
> = [
  [source: TSource, destination: TDestination],
  Array<
    [
      path: string[],
      mappingProperty: MappingProperty<
        TSource,
        TDestination,
        SelectorReturn<TDestination>
      >,
      nestedMappingPair?: [unknown, unknown]
    ]
  >,
  [
    beforeMap?: MapAction<TSource, TDestination>,
    afterMap?: MapAction<TSource, TDestination>
  ],
  [source: NamingConvention, destination: NamingConvention]?,
  [baseSource: unknown, baseDestination: unknown][]?
];

export interface Disposable {
  dispose(): void;
}

export interface MetadataStorage<TKey, TType = unknown> extends Disposable {
  getMetadata(metaKey: TKey): Array<Metadata<TType>>;

  getMetadataForKey(metaKey: TKey, key: string[]): Metadata<TType> | undefined;

  addMetadata(metaKey: TKey, metadata: Metadata<TType>): void;

  has(metaKey: TKey): boolean | undefined;
}

export interface MappingStorage<TKey> extends Disposable {
  get(source: TKey, destination: TKey): Mapping | undefined;

  set(source: TKey, destination: TKey, mapping: Mapping): void;

  has(source: TKey, destination: TKey): boolean | undefined;
}

export type Metadata<TMetaType = unknown> = [
  string[],
  () => String | Number | Boolean | Date | TMetaType,
  boolean?
];

export interface ErrorHandler {
  handle: (message: string) => void;
}

export interface MappingProfile {
  (mapper: Mapper): void;
}
