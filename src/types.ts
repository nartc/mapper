import { MappingStorage } from './storages';

export type Unpacked<T> = T extends (infer U)[]
  ? U
  : T extends (...args: any[]) => infer U
  ? U
  : T extends Promise<infer U>
  ? U
  : T;

export type Dict<T> = { [key in keyof T]?: any };

export type BaseOf<T extends Dict<T> = any, TBase = any> = [T] extends [TBase]
  ? unknown
  : never;

export enum ObjectTag {
  Undefined = '[object Undefined]',
  Null = '[object Null]',
  Object = '[object Object]',
  Array = '[object Array]',
  Date = '[object Date]',
  Map = '[object Map]',
}

export enum TransformationType {
  Ignore = 0,
  MapFrom = 1,
  Condition = 2,
  FromValue = 3,
  MapWith = 4,
  ConvertUsing = 5,
  MapInitialize = 6,
  NullSubstitution = 7,
}

export interface Selector<
  TSource extends Dict<TSource> = any,
  TReturnType = any
> {
  (source: TSource): TReturnType;
}

export type SelectorReturn<TSource> = ReturnType<Selector<TSource>>;

export interface ValueSelector<
  TSource extends Dict<TSource> = any,
  TDestination extends Dict<TDestination> = any,
  TReturnType = SelectorReturn<TDestination>
> {
  (source: TSource): TReturnType;
}

export interface ConditionPredicate<TSource extends Dict<TSource> = any> {
  (source: TSource): boolean;
}

export interface MapAction<
  TSource extends Dict<TSource> = any,
  TDestination extends Dict<TDestination> = any,
  TMappingSource = Unpacked<TSource>,
  TMappingDestination = Unpacked<TDestination>
> {
  (
    source: TSource,
    destination: TDestination,
    mapping?: Mapping<TMappingSource, TMappingDestination>
  ): void;
}

export interface MapOptions<
  TSource extends Dict<TSource> = any,
  TDestination extends Dict<TDestination> = any
> {
  beforeMap?: MapAction<TSource, TDestination>;
  afterMap?: MapAction<TSource, TDestination>;
}

export interface NamingConvention {
  splittingExpression: RegExp;
  separatorCharacter: string;
  transformPropertyName: (sourcePropNameParts: string[]) => string;
}

export interface Resolver<
  TSource extends Dict<TSource>,
  TDestination extends Dict<TDestination>,
  TReturnType = SelectorReturn<TDestination>
> {
  resolve(
    source: TSource,
    destination: TDestination,
    transformation: MappingTransformation<TSource, TDestination, TReturnType>
  ): TReturnType;
}

export interface Converter<TConvertSource, TConvertDestination> {
  convert(source: TConvertSource): TConvertDestination;
}

export interface MappingProfile {
  profileName: string;
}

export interface CreateMapOptions<
  TSource extends Dict<TSource> = any,
  TDestination extends Dict<TDestination> = any,
  TBaseSource extends BaseOf<TSource, TBaseSource> = any,
  TBaseDestination extends BaseOf<TDestination, TBaseDestination> = any
> {
  sourceMemberNamingConvention?: Constructible<NamingConvention>;
  destinationMemberNamingConvention?: Constructible<NamingConvention>;
  includeBase?: [Constructible<TBaseSource>, Constructible<TBaseDestination>];
}

export interface Constructible<T extends Dict<T> = any> {
  new (...args: any[]): T;

  __NARTC_AUTOMAPPER_METADATA_FACTORY?: () => Dict<T>;
}

export interface CreateMapFluentFunction<
  TSource extends Dict<TSource> = any,
  TDestination extends Dict<TDestination> = any,
  TBaseSource extends BaseOf<TSource, TBaseSource> = any,
  TBaseDestination extends BaseOf<TDestination, TBaseDestination> = any
> {
  forMember<TMemberType = SelectorReturn<TDestination>>(
    selector: Selector<TDestination, TMemberType>,
    memberMapFunction: ReturnType<
      MemberMapFunction<TSource, TDestination, TMemberType>
    >
  ): CreateMapFluentFunction<
    TSource,
    TDestination,
    TBaseSource,
    TBaseDestination
  >;

  forMember<TMemberType = SelectorReturn<TDestination>>(
    selector: Selector<TDestination, TMemberType>,
    preConditionFunction: ReturnType<
      PreConditionFunction<TSource, TDestination, TMemberType>
    >,
    memberMapFunction: ReturnType<
      MemberMapFunction<TSource, TDestination, TMemberType>
    >
  ): CreateMapFluentFunction<
    TSource,
    TDestination,
    TBaseSource,
    TBaseDestination
  >;

  beforeMap(
    action: MapAction<TSource, TDestination>
  ): CreateMapFluentFunction<
    TSource,
    TDestination,
    TBaseSource,
    TBaseDestination
  >;

  afterMap(
    action: MapAction<TSource, TDestination>
  ): CreateMapFluentFunction<
    TSource,
    TDestination,
    TBaseSource,
    TBaseDestination
  >;

  reverseMap(): CreateReversedMapFluentFunction<TDestination, TSource>;
}

export interface CreateReversedMapFluentFunction<
  TSource extends Dict<TSource> = any,
  TDestination extends Dict<TDestination> = any
> {
  forPath<TMemberType = SelectorReturn<TDestination>>(
    selector: Selector<TDestination, TMemberType>,
    memberMapFunction: ReturnType<
      MemberMapFunction<TSource, TDestination, TMemberType>
    >
  ): CreateReversedMapFluentFunction<TSource, TDestination>;

  forPath<TMemberType = SelectorReturn<TDestination>>(
    selector: Selector<TDestination, TMemberType>,
    preConditionFunction: ReturnType<
      PreConditionFunction<TSource, TDestination, TMemberType>
    >,
    memberMapFunction: ReturnType<
      MemberMapFunction<TSource, TDestination, TMemberType>
    >
  ): CreateReversedMapFluentFunction<TSource, TDestination>;

  beforeMap(
    action: MapAction<TSource, TDestination>
  ): CreateReversedMapFluentFunction<TSource, TDestination>;

  afterMap(
    action: MapAction<TSource, TDestination>
  ): CreateReversedMapFluentFunction<TSource, TDestination>;
}

export enum MemberMapFunctionReturnClassId {
  type,
  misc,
  fn,
}

export type MemberMapFunction<
  TSource extends Dict<TSource> = any,
  TDestination extends Dict<TDestination> = any,
  TSelectorReturn = SelectorReturn<TDestination>
> =
  | MapInitializeFunction<TSource, TDestination, TSelectorReturn>
  | MapFromFunction<TSource, TDestination, TSelectorReturn>
  | MapWithFunction<TSource, TDestination, TSelectorReturn>
  | ConditionFunction<TSource, TDestination, TSelectorReturn>
  | FromValueFunction<TSource, TDestination, TSelectorReturn>
  | ConvertUsingFunction<TSource, TDestination, TSelectorReturn>
  | NullSubstitutionFunction<TSource, TDestination, TSelectorReturn>
  | IgnoreFunction;

export interface PreConditionFunction<
  TSource extends Dict<TSource> = any,
  TDestination extends Dict<TDestination> = any,
  TSelectorReturn = SelectorReturn<TDestination>
> {
  (predicate: ConditionPredicate<TSource>, defaultValue?: TSelectorReturn): [
    (source: TSource) => boolean,
    TSelectorReturn?
  ];
}

export interface MapFromFunction<
  TSource extends Dict<TSource> = any,
  TDestination extends Dict<TDestination> = any,
  TSelectorReturn = SelectorReturn<TDestination>
> {
  (
    from:
      | ValueSelector<TSource, TDestination, TSelectorReturn>
      | Resolver<TSource, TDestination, TSelectorReturn>
  ): [
    TransformationType.MapFrom,
    ValueSelector<TSource, TDestination, TSelectorReturn>,
    (
      source: TSource,
      destination: typeof from extends Resolver<
        TSource,
        TDestination,
        TSelectorReturn
      >
        ? TDestination
        : any,
      transformation: typeof from extends Resolver<
        TSource,
        TDestination,
        TSelectorReturn
      >
        ? MappingTransformation<TSource, TDestination, TSelectorReturn>
        : any
    ) => TSelectorReturn
  ];
}

export interface MapWithFunction<
  TSource extends Dict<TSource> = any,
  TDestination extends Dict<TDestination> = any,
  TSelectorReturn = SelectorReturn<TDestination>
> {
  (
    withDestination: Constructible<Unpacked<TSelectorReturn>>,
    withValue: ValueSelector<TSource>
  ): [
    TransformationType.MapWith,
    ValueSelector<TSource>,
    (source: TSource, mappingStorage: MappingStorage) => TSelectorReturn | null
  ];
}

export interface ConditionFunction<
  TSource extends Dict<TSource> = any,
  TDestination extends Dict<TDestination> = any,
  TSelectorReturn = SelectorReturn<TDestination>
> {
  (predicate: ConditionPredicate<TSource>, defaultValue?: TSelectorReturn): [
    TransformationType.Condition,
    null,
    (source: TSource, ...sourceMemberPaths: string[]) => TSelectorReturn
  ];
}

export interface FromValueFunction<
  TSource extends Dict<TSource> = any,
  TDestination extends Dict<TDestination> = any,
  TSelectorReturn = SelectorReturn<TDestination>
> {
  (rawValue: TSelectorReturn): [
    TransformationType.FromValue,
    null,
    () => TSelectorReturn
  ];
}

export interface ConvertUsingFunction<
  TSource extends Dict<TSource> = any,
  TDestination extends Dict<TDestination> = any,
  TSelectorReturn = SelectorReturn<TDestination>
> {
  <TConvertSource = TSource>(
    converter: Converter<TConvertSource, TSelectorReturn>,
    value: Selector<TSource, TConvertSource>
  ): [
    TransformationType.ConvertUsing,
    null,
    (source: TSource) => TSelectorReturn
  ];
}

export interface NullSubstitutionFunction<
  TSource extends Dict<TSource> = any,
  TDestination extends Dict<TDestination> = any,
  TSelectorReturn = SelectorReturn<TDestination>
> {
  (substitution: TSelectorReturn): [
    TransformationType.NullSubstitution,
    null,
    (source: TSource, ...sourceMemberPaths: string[]) => TSelectorReturn
  ];
}

export interface IgnoreFunction {
  (): [TransformationType.Ignore, null, () => void];
}

export interface MapInitializeFunction<
  TSource extends Dict<TSource> = any,
  TDestination extends Dict<TDestination> = any,
  TSelectorReturn = SelectorReturn<TDestination>
> {
  (...paths: string[]): [
    TransformationType.MapInitialize,
    null,
    (source: TSource) => TSelectorReturn
  ];
}

export interface MappingTransformation<
  TSource extends Dict<TSource> = any,
  TDestination extends Dict<TDestination> = any,
  TSelectorReturn = SelectorReturn<TDestination>
> {
  type: TransformationType;
  mapFn: ReturnType<MemberMapFunction<TSource, TDestination, TSelectorReturn>>;
  preCond?: ReturnType<
    PreConditionFunction<TSource, TDestination, TSelectorReturn>
  >;
}

export interface MappingProperty<
  TSource extends Dict<TSource> = any,
  TDestination extends Dict<TDestination> = any,
  TSelectorReturn = SelectorReturn<TDestination>
> {
  paths: [string, string?];
  transformation: MappingTransformation<TSource, TDestination, TSelectorReturn>;
}

export enum MappingClassId {
  models,
  conventions,
  props,
  actions,
  bases,
}

export type Mapping<
  TSource extends Dict<TSource> = any,
  TDestination extends Dict<TDestination> = any,
  TBaseSource extends BaseOf<TSource, TBaseSource> = any,
  TBaseDestination extends BaseOf<TDestination, TBaseDestination> = any
> = [
  [Constructible<TSource>, Constructible<TDestination>],
  [Constructible<NamingConvention>, Constructible<NamingConvention>],
  Array<
    [
      string,
      MappingProperty<TSource, TDestination, ReturnType<Selector<TDestination>>>
    ]
  >,
  [MapAction<TSource, TDestination>?, MapAction<TSource, TDestination>?],
  [Constructible<TBaseSource>, Constructible<TBaseDestination>]?
];

export type MetadataFunction = () => false | [] | Constructible;
export type MetadataMap<
  TModel extends Dict<TModel> = any,
  TKey extends keyof TModel = any
> = [TKey, MetadataFunction];
export type MetadataMapList<TModel extends Dict<TModel> = any> = Array<
  MetadataMap<TModel>
>;

export interface AutoMapperGlobalSettings {
  sourceNamingConvention?: Constructible<NamingConvention>;
  destinationNamingConvention?: Constructible<NamingConvention>;
}

export type MetadataOptions<TModel extends Dict<TModel> = any> = {
  [key in keyof TModel]?: String | Number | Boolean | Date | [] | Constructible;
};

export interface CreateMapMetadataFunction {
  <TModel extends Dict<TModel> = any>(
    model: Constructible<TModel>,
    metadataOptions: MetadataOptions<TModel>
  ): void;
}
