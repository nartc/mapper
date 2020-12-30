import { TransformationType } from './enums';
import type { CreateMapOptions, MapOptions } from './options';
import type {
  Dictionary,
  Fn,
  Selector,
  SelectorReturn,
  Unpacked,
  ValueSelector,
} from './utils';

export interface ConditionPredicate<
  TSource extends Dictionary<TSource> = unknown
> {
  (source: TSource): boolean;
}

export interface MapAction<
  TSource extends Dictionary<TSource> = unknown,
  TDestination extends Dictionary<TDestination> = unknown
> {
  (source: TSource, destination: TDestination): void;
}

export interface NamingConvention {
  splittingExpression: RegExp;
  separatorCharacter: string;
  transformPropertyName: (sourcePropNameParts: string[]) => string;
}

export interface Resolver<
  TSource extends Dictionary<TSource> = unknown,
  TDestination extends Dictionary<TDestination> = unknown,
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

export type MemberMapFunction<
  TSource extends Dictionary<TSource> = unknown,
  TDestination extends Dictionary<TDestination> = unknown,
  TSelectorReturn = SelectorReturn<TDestination>
> =
  | MapInitializeFunction<TSource, TDestination, TSelectorReturn>
  | MapFromFunction<TSource, TDestination, TSelectorReturn>
  | MapWithFunction<TSource, TDestination, TSelectorReturn>
  | ConditionFunction<TSource, TDestination, TSelectorReturn>
  | FromValueFunction<TSource, TDestination, TSelectorReturn>
  | ConvertUsingFunction<TSource, TDestination, TSelectorReturn>
  | NullSubstitutionFunction<TSource, TDestination, TSelectorReturn>
  | MapDeferFunction<TSource, TDestination, TSelectorReturn>
  | IgnoreFunction<TSource, TDestination>;

export interface PreConditionFunction<
  TSource extends Dictionary<TSource> = unknown,
  TDestination extends Dictionary<TDestination> = unknown,
  TSelectorReturn = SelectorReturn<TDestination>
> {
  (predicate: ConditionPredicate<TSource>, defaultValue?: TSelectorReturn): [
    preConditionPredicate: (source: TSource) => boolean,
    defaultValue?: TSelectorReturn
  ];
}

export interface DeferFunction<
  TSource extends Dictionary<TSource> = unknown,
  TDestination extends Dictionary<TDestination> = unknown,
  TSelectorReturn = SelectorReturn<TDestination>
> {
  (source: TSource): Exclude<
    ReturnType<MemberMapFunction<TSource, TDestination, TSelectorReturn>>,
    ReturnType<MapDeferFunction<TSource, TDestination, TSelectorReturn>>
  >;
}

export interface MapDeferFunction<
  TSource extends Dictionary<TSource> = unknown,
  TDestination extends Dictionary<TDestination> = unknown,
  TSelectorReturn = SelectorReturn<TDestination>
> {
  (deferFn: DeferFunction<TSource, TDestination, TSelectorReturn>): [
    type: TransformationType.MapDefer,
    misc: null,
    fn: DeferFunction<TSource, TDestination, TSelectorReturn>
  ];
}

export interface MapFromFunction<
  TSource extends Dictionary<TSource> = unknown,
  TDestination extends Dictionary<TDestination> = unknown,
  TSelectorReturn = SelectorReturn<TDestination>
> {
  (
    from:
      | ValueSelector<TSource, TDestination, TSelectorReturn>
      | Resolver<TSource, TDestination, TSelectorReturn>
  ): [
    type: TransformationType.MapFrom,
    misc: typeof from extends Resolver
      ? null
      : ValueSelector<TSource, TDestination, TSelectorReturn>,
    fn: (source: TSource, destination?: TDestination) => TSelectorReturn
  ];
}

export interface MapWithFunction<
  TSource extends Dictionary<TSource> = unknown,
  TDestination extends Dictionary<TDestination> = unknown,
  TSelectorReturn = SelectorReturn<TDestination>
> {
  (
    withDestination: Fn<Unpacked<unknown | TSelectorReturn>>,
    withSourceValue: ValueSelector<TSource>,
    withSource: Fn<ReturnType<ValueSelector<TSource>>>
  ): [
    type: TransformationType.MapWith,
    misc: ValueSelector<TSource>,
    fn: (
      sourceObj: TSource,
      mapper: Mapper
    ) => TSelectorReturn | undefined | null
  ];
}

export interface ConditionFunction<
  TSource extends Dictionary<TSource> = unknown,
  TDestination extends Dictionary<TDestination> = unknown,
  TSelectorReturn = SelectorReturn<TDestination>
> {
  (predicate: ConditionPredicate<TSource>, defaultValue?: TSelectorReturn): [
    type: TransformationType.Condition,
    misc: null,
    fn: (source: TSource, ...sourceMemberPaths: string[]) => TSelectorReturn
  ];
}

export interface FromValueFunction<
  TSource extends Dictionary<TSource> = unknown,
  TDestination extends Dictionary<TDestination> = unknown,
  TSelectorReturn = SelectorReturn<TDestination>
> {
  (rawValue: TSelectorReturn): [
    type: TransformationType.FromValue,
    misc: null,
    fn: () => TSelectorReturn
  ];
}

export interface ConvertUsingFunction<
  TSource extends Dictionary<TSource> = unknown,
  TDestination extends Dictionary<TDestination> = unknown,
  TSelectorReturn = SelectorReturn<TDestination>
> {
  <TConvertSource = TSource>(
    converter: Converter<TConvertSource, TSelectorReturn>,
    value?: Selector<TSource, TConvertSource>
  ): [
    type: TransformationType.ConvertUsing,
    misc: null,
    fn: Selector<TSource, TConvertSource>
  ];
}

export interface NullSubstitutionFunction<
  TSource extends Dictionary<TSource> = unknown,
  TDestination extends Dictionary<TDestination> = unknown,
  TSelectorReturn = SelectorReturn<TDestination>
> {
  (substitution: TSelectorReturn): [
    type: TransformationType.NullSubstitution,
    misc: null,
    fn: (source: TSource, ...sourceMemberPaths: string[]) => TSelectorReturn
  ];
}

export interface IgnoreFunction<
  TSource extends Dictionary<TSource> = unknown,
  TDestination extends Dictionary<TDestination> = unknown
> {
  (): [type: TransformationType.Ignore, misc: null, fn: null];
}

export interface MapInitializeFunction<
  TSource extends Dictionary<TSource> = unknown,
  TDestination extends Dictionary<TDestination> = unknown,
  TSelectorReturn = SelectorReturn<TDestination>
> {
  (...paths: string[]): [
    type: TransformationType.MapInitialize,
    misc: null,
    fn: Selector<TSource, TSelectorReturn>
  ];
}

export interface Mapper<TKey = unknown> {
  name: string;

  createMap<
    TSource extends Dictionary<TSource> = unknown,
    TDestination extends Dictionary<TDestination> = unknown
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

  createMap<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>
  >(
    source: TKey,
    destination: TKey,
    options?: CreateMapOptions
  ): CreateMapFluentFunction<TSource, TDestination>;

  getMapping<TKey = unknown>(source: TKey, destination: TKey): Mapping;

  getMapping<
    TSource extends Dictionary<TSource> = unknown,
    TDestination extends Dictionary<TDestination> = unknown
  >(
    source: new (...args: unknown[]) => TSource,
    destination: new (...args: unknown[]) => TDestination
  ): Mapping<TSource, TDestination>;

  getMapping<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>
  >(
    source: string,
    destination: string
  ): Mapping<TSource, TDestination>;

  addProfile(profile): Mapper;

  map<
    TSource extends Dictionary<TSource> = unknown,
    TDestination extends Dictionary<TDestination> = unknown
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

  mapAsync<
    TSource extends Dictionary<TSource> = unknown,
    TDestination extends Dictionary<TDestination> = unknown
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

  mapArray<
    TSource extends Dictionary<TSource> = unknown,
    TDestination extends Dictionary<TDestination> = unknown
  >(
    sourceArray: TSource[],
    destination: new (...args: unknown[]) => TDestination,
    source: new (...args: unknown[]) => TSource,
    options?: MapOptions<TSource[], TDestination[]>
  ): TDestination[];

  mapArray<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>
  >(
    sourceArray: TSource[],
    destination: string,
    source: string,
    options?: MapOptions<TSource[], TDestination[]>
  ): TDestination[];

  mapArrayAsync<
    TSource extends Dictionary<TSource> = unknown,
    TDestination extends Dictionary<TDestination> = unknown
  >(
    sourceArray: TSource[],
    destination: new (...args: unknown[]) => TDestination,
    source: new (...args: unknown[]) => TSource,
    options?: MapOptions<TSource[], TDestination[]>
  ): Promise<TDestination[]>;

  mapArrayAsync<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>
  >(
    sourceArray: TSource[],
    destination: string,
    source: string,
    options?: MapOptions<TSource[], TDestination[]>
  ): Promise<TDestination[]>;

  dispose(): void;
}

export interface CreateMapFluentFunction<
  TSource extends Dictionary<TSource> = unknown,
  TDestination extends Dictionary<TDestination> = unknown
> {
  forMember<TMemberType = SelectorReturn<TDestination>>(
    selector: Selector<TDestination, TMemberType>,
    memberMapFunction: ReturnType<
      MapFromFunction<TSource, TDestination, TMemberType>
    >
  ): CreateMapFluentFunction<TSource, TDestination>;

  forMember<TMemberType = SelectorReturn<TDestination>>(
    selector: Selector<TDestination, TMemberType>,
    memberMapFunction: ReturnType<
      MapWithFunction<TSource, TDestination, TMemberType>
    >
  ): CreateMapFluentFunction<TSource, TDestination>;

  forMember<TMemberType = SelectorReturn<TDestination>>(
    selector: Selector<TDestination, TMemberType>,
    memberMapFunction: ReturnType<
      MapWithFunction<TSource, TDestination, TMemberType>
    >
  ): CreateMapFluentFunction<TSource, TDestination>;

  forMember<TMemberType = SelectorReturn<TDestination>>(
    selector: Selector<TDestination, TMemberType>,
    memberMapFunction: ReturnType<
      ConditionFunction<TSource, TDestination, TMemberType>
    >
  ): CreateMapFluentFunction<TSource, TDestination>;

  forMember<TMemberType = SelectorReturn<TDestination>>(
    selector: Selector<TDestination, TMemberType>,
    memberMapFunction: ReturnType<
      FromValueFunction<TSource, TDestination, TMemberType>
    >
  ): CreateMapFluentFunction<TSource, TDestination>;

  forMember<TMemberType = SelectorReturn<TDestination>>(
    selector: Selector<TDestination, TMemberType>,
    memberMapFunction: ReturnType<
      ConvertUsingFunction<TSource, TDestination, TMemberType>
    >
  ): CreateMapFluentFunction<TSource, TDestination>;

  forMember<TMemberType = SelectorReturn<TDestination>>(
    selector: Selector<TDestination, TMemberType>,
    memberMapFunction: ReturnType<
      NullSubstitutionFunction<TSource, TDestination, TMemberType>
    >
  ): CreateMapFluentFunction<TSource, TDestination>;

  forMember<TMemberType = SelectorReturn<TDestination>>(
    selector: Selector<TDestination, TMemberType>,
    memberMapFunction: ReturnType<IgnoreFunction>
  ): CreateMapFluentFunction<TSource, TDestination>;

  forMember<TMemberType = SelectorReturn<TDestination>>(
    selector: Selector<TDestination, TMemberType>,
    preConditionFunction: ReturnType<
      PreConditionFunction<TSource, TDestination, TMemberType>
    >,
    memberMapFunction: ReturnType<
      MapFromFunction<TSource, TDestination, TMemberType>
    >
  ): CreateMapFluentFunction<TSource, TDestination>;

  forMember<TMemberType = SelectorReturn<TDestination>>(
    selector: Selector<TDestination, TMemberType>,
    preConditionFunction: ReturnType<
      PreConditionFunction<TSource, TDestination, TMemberType>
    >,
    memberMapFunction: ReturnType<
      MapWithFunction<TSource, TDestination, TMemberType>
    >
  ): CreateMapFluentFunction<TSource, TDestination>;

  forMember<TMemberType = SelectorReturn<TDestination>>(
    selector: Selector<TDestination, TMemberType>,
    preConditionFunction: ReturnType<
      PreConditionFunction<TSource, TDestination, TMemberType>
    >,
    memberMapFunction: ReturnType<
      MapWithFunction<TSource, TDestination, TMemberType>
    >
  ): CreateMapFluentFunction<TSource, TDestination>;

  forMember<TMemberType = SelectorReturn<TDestination>>(
    selector: Selector<TDestination, TMemberType>,
    preConditionFunction: ReturnType<
      PreConditionFunction<TSource, TDestination, TMemberType>
    >,
    memberMapFunction: ReturnType<
      ConditionFunction<TSource, TDestination, TMemberType>
    >
  ): CreateMapFluentFunction<TSource, TDestination>;

  forMember<TMemberType = SelectorReturn<TDestination>>(
    selector: Selector<TDestination, TMemberType>,
    preConditionFunction: ReturnType<
      PreConditionFunction<TSource, TDestination, TMemberType>
    >,
    memberMapFunction: ReturnType<
      FromValueFunction<TSource, TDestination, TMemberType>
    >
  ): CreateMapFluentFunction<TSource, TDestination>;

  forMember<TMemberType = SelectorReturn<TDestination>>(
    selector: Selector<TDestination, TMemberType>,
    preConditionFunction: ReturnType<
      PreConditionFunction<TSource, TDestination, TMemberType>
    >,
    memberMapFunction: ReturnType<
      ConvertUsingFunction<TSource, TDestination, TMemberType>
    >
  ): CreateMapFluentFunction<TSource, TDestination>;

  forMember<TMemberType = SelectorReturn<TDestination>>(
    selector: Selector<TDestination, TMemberType>,
    preConditionFunction: ReturnType<
      PreConditionFunction<TSource, TDestination, TMemberType>
    >,
    memberMapFunction: ReturnType<
      NullSubstitutionFunction<TSource, TDestination, TMemberType>
    >
  ): CreateMapFluentFunction<TSource, TDestination>;

  forMember<TMemberType = SelectorReturn<TDestination>>(
    selector: Selector<TDestination, TMemberType>,
    preConditionFunction: ReturnType<
      PreConditionFunction<TSource, TDestination, TMemberType>
    >,
    memberMapFunction: ReturnType<IgnoreFunction>
  ): CreateMapFluentFunction<TSource, TDestination>;

  forMember<TMemberType = SelectorReturn<TDestination>>(
    selector: Selector<TDestination, TMemberType>,
    mapDeferFunction: ReturnType<
      MapDeferFunction<TSource, TDestination, TMemberType>
    >
  ): CreateMapFluentFunction<TSource, TDestination>;

  forMember<TMemberType = SelectorReturn<TDestination>>(
    selector: Selector<TDestination, TMemberType>,
    preConditionFunction: ReturnType<
      PreConditionFunction<TSource, TDestination, TMemberType>
    >,
    mapDeferFunction: ReturnType<
      MapDeferFunction<TSource, TDestination, TMemberType>
    >
  ): CreateMapFluentFunction<TSource, TDestination>;

  beforeMap(
    action: MapAction<TSource, TDestination>
  ): CreateMapFluentFunction<TSource, TDestination>;

  afterMap(
    action: MapAction<TSource, TDestination>
  ): CreateMapFluentFunction<TSource, TDestination>;
}

export type MappingTransformation<
  TSource extends Dictionary<TSource> = unknown,
  TDestination extends Dictionary<TDestination> = unknown,
  TSelectorReturn = SelectorReturn<TDestination>
> = [
  mapFn: ReturnType<MemberMapFunction<TSource, TDestination, TSelectorReturn>>,
  preCond?: ReturnType<
    PreConditionFunction<TSource, TDestination, TSelectorReturn>
  >
];
export type MappingProperty<
  TSource extends Dictionary<TSource> = unknown,
  TDestination extends Dictionary<TDestination> = unknown,
  TSelectorReturn = SelectorReturn<TDestination>
> = readonly [
  paths: [target: string, origin?: string],
  transformation: MappingTransformation<TSource, TDestination, TSelectorReturn>
];

export type Mapping<
  TSource extends Dictionary<TSource> = unknown,
  TDestination extends Dictionary<TDestination> = unknown
> = [
  mappings: [source: TSource, destination: TDestination],
  properties: Array<
    [
      path: string,
      mappingProperty: MappingProperty<
        TSource,
        TDestination,
        SelectorReturn<TDestination>
      >,
      nestedMappingPair?: [unknown, unknown]
    ]
  >,
  actions: [
    beforeMap?: MapAction<TSource, TDestination>,
    afterMap?: MapAction<TSource, TDestination>
  ],
  namingConventions?: [source: NamingConvention, destination: NamingConvention],
  bases?: [baseSource: unknown, baseDestination: unknown][]
];

export interface Disposable {
  dispose(): void;
}

export interface MetadataStorage<TKey, TType = unknown> extends Disposable {
  getMetadata(metaKey: TKey): Array<Metadata<TType>>;

  getMetadataForKey(metaKey: TKey, key: string): Metadata<TType> | undefined;

  addMetadata(metaKey: TKey, metadata: Metadata<TType>): void;

  has(metaKey: TKey): boolean;
}

export interface MappingStorage<TKey> extends Disposable {
  get(source: TKey, destination: TKey): Mapping | undefined;

  set(source: TKey, destination: TKey, mapping: Mapping): void;

  has(source: TKey, destination: TKey): boolean;
}

export type Metadata<TMetaType = unknown> = [
  property: string,
  metaTypeFn: () => String | Number | Boolean | Date | TMetaType
];

export interface ErrorHandler {
  handle: (message: string) => void;
}

export interface MappingProfile {
  (mapper: Mapper): void;
}
