import type {
    ERROR_HANDLER,
    MAPPINGS,
    METADATA_MAP,
    METADATA_OBJECT_MAP,
    NAMING_CONVENTIONS,
    PROFILE_CONFIGURATION_CONTEXT,
    RECURSIVE_COUNT,
    RECURSIVE_DEPTH,
    STRATEGY,
} from './symbols';

export type Dictionary<T> = { [key in keyof T]?: unknown };

export type AnyConstructor = new (...args: any[]) => any;
export type AbstractConstructor<T = any> = abstract new (...args: any[]) => T;
export type Constructor<T = any> = (new (...args: any[]) => T) &
    TransformerMetadataFactory;
export type ClassIdentifier<T = any> =
    | Constructor<T>
    | (AbstractConstructor<T> & TransformerMetadataFactory)
    // Supports abstract and private constructors, which cannot satisfy a
    // public construct signature but are still valid runtime identifiers.
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    | (Function & TransformerMetadataFactory & { prototype: T });

export type Primitive = string | number | boolean | bigint;
export type PrimitiveExtended = Primitive | Date;

export type PrimitiveConstructor =
    | StringConstructor
    | NumberConstructor
    | BooleanConstructor
    | BigIntConstructor;

export type PrimitiveConstructorExtended =
    | PrimitiveConstructor
    | DateConstructor
    | AnyConstructor;

export type PrimitiveConstructorReturnType<
    TType extends PrimitiveConstructorExtended
> = TType extends DateConstructor | Exclude<TType, PrimitiveConstructor>
    ? InstanceType<TType>
    : ReturnType<Extract<TType, PrimitiveConstructor>>;

export interface TransformerMetadataFactory {
    __AUTOMAPPER_METADATA_FACTORY__?: () => [
        propertyKey: string,
        options: {
            type: () => ClassIdentifier | [ClassIdentifier];
            depth: number;
            isGetterOnly?: boolean;
        }
    ][];
}

export interface ErrorHandler {
    handle(error: unknown): void;
}

export interface NamingConvention {
    splittingExpression: RegExp;
    separatorCharacter: string;
    transformPropertyName: (sourcePropNameParts: string[]) => string;
}

export type NamingConventionInput =
    | NamingConvention
    | {
          source: NamingConvention;
          destination: NamingConvention;
      };

// The `= any` generic defaults below (Selector/ValueSelector/Resolver/Converter
// and ModelIdentifier/Constructor) are intentional, not laziness. AutoMapper is a
// runtime, identifier-driven mapper whose types are routinely used without
// explicit generics (`createMap(mapper, Source, Dest)` infers them); an `any`
// default keeps that ergonomic and avoids forcing `unknown` casts through the
// dynamic core, while concrete call sites still infer precise types. Data that
// crosses the user boundary (extraArguments) is `unknown`, and return positions
// are `unknown` rather than `any`.
export type Selector<
    TObject extends Dictionary<TObject> = any,
    TReturnType = unknown
> = (obj: TObject) => TReturnType;

export type SelectorReturn<TObject extends Dictionary<TObject>> = ReturnType<
    Selector<TObject>
>;

export type MaybePromise<T> = T | Promise<T>;

export type ValueSelector<
    TSource extends Dictionary<TSource> = any,
    TDestination extends Dictionary<TDestination> = any,
    TValueReturn = SelectorReturn<TDestination>
> = (source: TSource) => TValueReturn;

export interface Resolver<
    TSource extends Dictionary<TSource> = any,
    TDestination extends Dictionary<TDestination> = any,
    TResolvedType = SelectorReturn<TDestination>
> {
    resolve(
        source: TSource,
        destination?: TDestination
    ): MaybePromise<TResolvedType>;
}

export interface Converter<
    TSource extends Dictionary<TSource> = any,
    TConvertDestination = any
> {
    convert(source: TSource): TConvertDestination;
}

export type MapCallback<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>,
    TExtraArgs extends Record<string, unknown> = Record<string, unknown>
> = (
    source: TSource,
    destination: TDestination,
    extraArguments?: TExtraArgs
) => MaybePromise<void>;

export interface MapOptions<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>,
    TExtraArgs extends Record<string, unknown> = Record<string, unknown>
> {
    beforeMap?: MapCallback<TSource, TDestination, TExtraArgs>;
    afterMap?: MapCallback<TSource, TDestination, TExtraArgs>;
    destinationConstructor?: DestinationConstructor<TSource, TDestination>;
    extraArgs?: (
        mapping: Mapping<TSource, TDestination>,
        destinationObject: TDestination
    ) => TExtraArgs;
}

export type ModelIdentifier<T = any> = string | symbol | ClassIdentifier<T>;

export type MetadataIdentifier<T = any> = Exclude<ModelIdentifier<T>, string>;

export const enum MetadataObjectMapClassId {
    asSource,
    asDestination,
}

export const enum MetadataClassId {
    propertyKeys,
    metaFn,
    isArray,
    isGetterOnly,
}

export type Metadata = [
    propertyKeys: string[],
    metaFn: () => PrimitiveExtended | MetadataIdentifier,
    isArray: boolean,
    isGetterOnly?: boolean
];

export interface Mapper {
    map<
        TSource extends Dictionary<TSource>,
        TDestination extends Dictionary<TDestination>
    >(
        sourceObject: TSource,
        sourceIdentifier: ModelIdentifier<TSource>,
        destinationIdentifier: ModelIdentifier<TDestination>,
        options?: MapOptions<TSource, TDestination>
    ): TDestination;
    map<TSource extends Dictionary<TSource>>(
        sourceObject: TSource,
        identifier: ModelIdentifier<TSource>,
        options?: MapOptions<TSource, TSource>
    ): TSource;

    /**
     * Maps `sourceObject` and resolves with the result.
     *
     * @remarks
     * Member mapping itself is synchronous, but any `beforeMap`/`afterMap`
     * callbacks that return a promise are collected and awaited before the
     * returned promise resolves. Use the synchronous {@link map} when no async
     * callbacks are involved.
     */
    mapAsync<
        TSource extends Dictionary<TSource>,
        TDestination extends Dictionary<TDestination>
    >(
        sourceObject: TSource,
        sourceIdentifier: ModelIdentifier<TSource>,
        destinationIdentifier: ModelIdentifier<TDestination>,
        options?: MapOptions<TSource, TDestination>
    ): Promise<TDestination>;
    mapAsync<TSource extends Dictionary<TSource>>(
        sourceObject: TSource,
        identifier: ModelIdentifier<TSource>,
        options?: MapOptions<TSource, TSource>
    ): Promise<TSource>;

    mapArray<
        TSource extends Dictionary<TSource>,
        TDestination extends Dictionary<TDestination>
    >(
        sourceArray: TSource[],
        sourceIdentifier: ModelIdentifier<TSource>,
        destinationIdentifier: ModelIdentifier<TDestination>,
        options?: MapOptions<TSource[], TDestination[]>
    ): TDestination[];
    mapArray<TSource extends Dictionary<TSource>>(
        sourceArray: TSource[],
        identifier: ModelIdentifier<TSource>,
        options?: MapOptions<TSource[], TSource[]>
    ): TSource[];

    mapArrayAsync<
        TSource extends Dictionary<TSource>,
        TDestination extends Dictionary<TDestination>
    >(
        sourceArray: TSource[],
        sourceIdentifier: ModelIdentifier<TSource>,
        destinationIdentifier: ModelIdentifier<TDestination>,
        options?: MapOptions<TSource[], TDestination[]>
    ): Promise<TDestination[]>;
    mapArrayAsync<TSource extends Dictionary<TSource>>(
        sourceArray: TSource[],
        identifier: ModelIdentifier<TSource>,
        options?: MapOptions<TSource[], TSource[]>
    ): Promise<TSource[]>;

    mutate<
        TSource extends Dictionary<TSource>,
        TDestination extends Dictionary<TDestination>
    >(
        sourceObject: TSource,
        destinationObject: TDestination,
        sourceIdentifier: ModelIdentifier<TSource>,
        destinationIdentifier: ModelIdentifier<TDestination>,
        options?: MapOptions<TSource, TDestination>
    ): void;
    mutate<TSource extends Dictionary<TSource>>(
        sourceObject: TSource,
        destinationObject: TSource,
        identifier: ModelIdentifier<TSource>,
        options?: MapOptions<TSource, TSource>
    ): void;

    mutateAsync<
        TSource extends Dictionary<TSource>,
        TDestination extends Dictionary<TDestination>
    >(
        sourceObject: TSource,
        destinationObject: TDestination,
        sourceIdentifier: ModelIdentifier<TSource>,
        destinationIdentifier: ModelIdentifier<TDestination>,
        options?: MapOptions<TSource, TDestination>
    ): Promise<void>;
    mutateAsync<TSource extends Dictionary<TSource>>(
        sourceObject: TSource,
        destinationObject: TSource,
        identifier: ModelIdentifier<TSource>,
        options?: MapOptions<TSource, TSource>
    ): Promise<void>;

    mutateArray<
        TSource extends Dictionary<TSource>,
        TDestination extends Dictionary<TDestination>
    >(
        sourceArray: TSource[],
        destinationArray: TDestination[],
        sourceIdentifier: ModelIdentifier<TSource>,
        destinationIdentifier: ModelIdentifier<TDestination>,
        options?: MapOptions<TSource[], TDestination[]>
    ): void;
    mutateArray<TSource extends Dictionary<TSource>>(
        sourceArray: TSource[],
        destinationArray: TSource[],
        identifier: ModelIdentifier<TSource>,
        options?: MapOptions<TSource[], TSource[]>
    ): void;

    mutateArrayAsync<
        TSource extends Dictionary<TSource>,
        TDestination extends Dictionary<TDestination>
    >(
        sourceArray: TSource[],
        destinationArray: TDestination[],
        sourceIdentifier: ModelIdentifier<TSource>,
        destinationIdentifier: ModelIdentifier<TDestination>,
        options?: MapOptions<TSource[], TDestination[]>
    ): Promise<void>;
    mutateArrayAsync<TSource extends Dictionary<TSource>>(
        sourceArray: TSource[],
        destinationArray: TSource[],
        identifier: ModelIdentifier<TSource>,
        options?: MapOptions<TSource[], TSource[]>
    ): Promise<void>;

    dispose(): void;

    [ERROR_HANDLER]: ErrorHandler;
    [MAPPINGS]: Map<MetadataIdentifier, Map<MetadataIdentifier, Mapping>>;
    [STRATEGY]: MappingStrategy<MetadataIdentifier>;
    [NAMING_CONVENTIONS]: NamingConventionInput;
    [METADATA_MAP]: Map<MetadataIdentifier, Array<Metadata>>;
    [METADATA_OBJECT_MAP]: Map<
        MetadataIdentifier,
        [
            asSource?: Record<string, unknown>,
            asDestination?: Record<string, unknown>
        ]
    >;
    [RECURSIVE_DEPTH]: Map<MetadataIdentifier, ArrayKeyedMap>;
    [RECURSIVE_COUNT]: Map<MetadataIdentifier, ArrayKeyedMap>;
    [PROFILE_CONFIGURATION_CONTEXT]: Set<MappingConfiguration>;
}

export const enum TransformationType {
    Ignore,
    MapFrom,
    Condition,
    FromValue,
    MapWith,
    ConvertUsing,
    MapInitialize,
    NullSubstitution,
    UndefinedSubstitution,
    MapWithArguments,
    MapDefer,
}

export const enum MapFnClassId {
    type,
    fn,
    isConverted,
}

export type MemberMapReturnNoDefer<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>,
    TSelectorReturn = SelectorReturn<TDestination>
> =
    | MapInitializeReturn<TSource, TDestination, TSelectorReturn>
    | MapWithReturn<TSource, TDestination, TSelectorReturn>
    | MapFromReturn<TSource, TDestination, TSelectorReturn>
    | ConditionReturn<TSource, TDestination, TSelectorReturn>
    | FromValueReturn<TSource, TDestination, TSelectorReturn>
    | ConvertUsingReturn<TSource, TDestination>
    | NullSubstitutionReturn<TSource, TDestination, TSelectorReturn>
    | UndefinedSubstitutionReturn<TSource, TDestination, TSelectorReturn>
    | IgnoreReturn<TSource, TDestination>
    | MapWithArgumentsReturn<TSource, TDestination, TSelectorReturn>;

export type MemberMapReturn<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>,
    TSelectorReturn = SelectorReturn<TDestination>
> =
    | MemberMapReturnNoDefer<TSource, TDestination, TSelectorReturn>
    | MapDeferReturn<TSource, TDestination, TSelectorReturn>;

export type PreConditionReturn<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>,
    TSelectorReturn = SelectorReturn<TDestination>
> = [
    preConditionPredicate: ConditionPredicate<TSource>,
    defaultValue?: TSelectorReturn
];

export interface DeferFunction<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>,
    TSelectorReturn = SelectorReturn<TDestination>
> {
    (source: TSource):
        | MemberMapReturnNoDefer<TSource, TDestination, TSelectorReturn>
        | MapWithReturn<TSource, TDestination, TSelectorReturn>;
}

export type MapDeferReturn<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>,
    TSelectorReturn = SelectorReturn<TDestination>
> = [
    type: TransformationType.MapDefer,
    fn: DeferFunction<TSource, TDestination, TSelectorReturn>
];

export type MapFromReturn<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>,
    TSelectorReturn = SelectorReturn<TDestination>
> = [
    type: TransformationType.MapFrom,
    fn: Selector<TSource, MaybePromise<TSelectorReturn>>
];

export type MapWithReturn<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>,
    TSelectorReturn = SelectorReturn<TDestination>
> = [
    type: TransformationType.MapWith,
    fn: (
        sourceObj: TSource,
        mapper: Mapper,
        options?: MapOptions<TSource, TDestination>
    ) => TSelectorReturn | undefined | null
];

export interface ConditionPredicate<TSource extends Dictionary<TSource>> {
    (source: TSource): boolean;
}

export type ConditionReturn<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>,
    TSelectorReturn = SelectorReturn<TDestination>
> = [
    type: TransformationType.Condition,
    fn: (source: TSource, sourceMemberPath: string[]) => TSelectorReturn
];

export type FromValueReturn<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>,
    TSelectorReturn = SelectorReturn<TDestination>
> = [type: TransformationType.FromValue, fn: () => TSelectorReturn];

export type ConvertUsingReturn<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>,
    TSelectorReturn = SelectorReturn<TDestination>
> = [
    type: TransformationType.ConvertUsing,
    fn: Selector<TSource, TSelectorReturn>
];

export type NullSubstitutionReturn<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>,
    TSelectorReturn = SelectorReturn<TDestination>
> = [
    type: TransformationType.NullSubstitution,
    fn: (source: TSource, sourceMemberPath: string[]) => TSelectorReturn
];

export type UndefinedSubstitutionReturn<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>,
    TSelectorReturn = SelectorReturn<TDestination>
> = [
    type: TransformationType.UndefinedSubstitution,
    fn: (source: TSource, sourceMemberPath: string[]) => TSelectorReturn
];

export type IgnoreReturn<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>
> = [type: TransformationType.Ignore];

export type MapWithArgumentsReturn<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>,
    TSelectorReturn = SelectorReturn<TDestination>
> = [
    type: TransformationType.MapWithArguments,
    fn: (
        source: TSource,
        extraArguments: Record<string, unknown>
    ) => MaybePromise<TSelectorReturn>
];

export type MapInitializeReturn<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>,
    TSelectorReturn = SelectorReturn<TDestination>
> = [
    type: TransformationType.MapInitialize,
    fn: Selector<TSource, TSelectorReturn>,
    isConverted?: boolean
];

export const enum MappingTransformationClassId {
    memberMapFn,
    preCond,
}

export type MappingTransformation<
    TSource extends Dictionary<TSource> = any,
    TDestination extends Dictionary<TDestination> = any,
    TSelectorReturn = SelectorReturn<TDestination>
> = [
    memberMapFn: MemberMapReturn<TSource, TDestination, TSelectorReturn>,
    preCond?: PreConditionReturn<TSource, TDestination, TSelectorReturn>
];

export const enum MappingPropertyClassId {
    target,
    transformation,
}
export type MappingProperty<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>,
    TSelectorReturn = SelectorReturn<TDestination>
> = [
    target: string[],
    transformation: MappingTransformation<
        TSource,
        TDestination,
        TSelectorReturn
    >
];
export const enum MappingPropertiesClassId {
    path,
    mappingProperty,
    nestedMappingPair,
}

export const enum MappingCallbacksClassId {
    beforeMap,
    afterMap,
    beforeMapArray,
    afterMapArray,
}

export const enum NestedMappingPairClassId {
    destination,
    source,
}

export type NestedMappingPair = [
    destination: MetadataIdentifier | Primitive | Date,
    source: MetadataIdentifier | Primitive | Date
];

// --- Compiled mapping plan -------------------------------------------------
// A mapping's `properties` are positional tuples whose shape is fixed at
// createMap time. Rather than re-destructuring that nested tuple on every
// map() call, we destructure once into a flat descriptor list and hang it on
// the mapping itself (MappingClassId.compiledPlan), built eagerly at createMap.
// `sourceMemberIdentifier`/`destinationMemberIdentifier` equality that depends
// on the mapper's registry (which can grow later) is NOT baked in here.
export interface CompiledMappingProperty<
    TSource extends Dictionary<TSource> = any,
    TDestination extends Dictionary<TDestination> = any
> {
    destinationMemberPath: string[];
    transformationMapFn: MemberMapReturn<TSource, TDestination>;
    transformationType: TransformationType;
    transformationPreConditionPredicate?: (source: TSource) => boolean;
    transformationPreConditionDefaultValue?: unknown;
    destinationMemberIdentifier?: MetadataIdentifier | Primitive | Date;
    sourceMemberIdentifier?: MetadataIdentifier | Primitive | Date;
}

// A single property's work, specialized once at compile time so the map() loop
// runs `steps[i](context)` with no per-member type switch or descriptor
// destructuring. The context is map()-internal; kept opaque here.
export type CompiledMapStep = (context: any) => void;

export interface CompiledMapping<
    TSource extends Dictionary<TSource> = any,
    TDestination extends Dictionary<TDestination> = any
> {
    steps: CompiledMapStep[];
    // writable destination keys this mapping does not configure, precomputed at
    // createMap so assertUnmappedProperties does no per-call Set/scan work.
    unmappedCandidateKeys: string[];
}

// Build-time intermediate produced by compileMapping(): `props` + `configuredKeys`
// are consumed by buildMapPlan() to make `steps` + `unmappedCandidateKeys` and are
// NOT retained on the compiled plan (nothing reads them at runtime).
export interface CompiledMappingDescriptors<
    TSource extends Dictionary<TSource> = any,
    TDestination extends Dictionary<TDestination> = any
> {
    props: CompiledMappingProperty<TSource, TDestination>[];
    configuredKeys: string[];
}

export const enum MappingClassId {
    identifiers,
    identifierMetadata,
    properties,
    customProperties,
    mapper,
    destinationConstructor,
    typeConverters,
    callbacks,
    namingConventions,
    compiledPlan,
}

export type Mapping<
    TSource extends Dictionary<TSource> = any,
    TDestination extends Dictionary<TDestination> = any
> = [
    identifiers: [
        source: MetadataIdentifier<TSource>,
        destination: MetadataIdentifier<TDestination>
    ],
    identifierMetadata: [source: TSource, destination: TDestination],
    properties: Array<
        [
            path: string[],
            mappingProperty: MappingProperty<
                TSource,
                TDestination,
                SelectorReturn<TDestination>
            >,
            nestedMappingPair?: [
                destination: MetadataIdentifier | Primitive | Date,
                source: MetadataIdentifier | Primitive | Date
            ]
        ]
    >,
    customProperties: Array<
        [
            path: string[],
            mappingProperty: MappingProperty<
                TSource,
                TDestination,
                SelectorReturn<TDestination>
            >,
            nestedMappingPair?: [
                destination: MetadataIdentifier | Primitive | Date,
                source: MetadataIdentifier | Primitive | Date
            ]
        ]
    >,
    mapper: Mapper,
    destinationConstructor: DestinationConstructor<TSource, TDestination>,
    typeConverters?: Map<
        MetadataIdentifier | PrimitiveConstructor | DateConstructor,
        [
            Map<
                MetadataIdentifier | PrimitiveConstructor | DateConstructor,
                [Selector?, Selector?]
            >?,
            Map<
                MetadataIdentifier | PrimitiveConstructor | DateConstructor,
                [Selector?, Selector?]
            >?
        ]
    >,
    callbacks?: [
        beforeMap?: MapCallback<TSource, TDestination>,
        afterMap?: MapCallback<TSource, TDestination>,
        beforeMapArray?: MapCallback<TSource[], TDestination[]>,
        afterMapArray?: MapCallback<TSource[], TDestination[]>
    ],
    namingConventions?: [
        source: NamingConvention,
        destination: NamingConvention
    ],
    // built eagerly at createMap; flat per-property descriptors consumed by map()
    compiledPlan?: CompiledMapping<TSource, TDestination>
];

export type DataMap = Map<symbol, number>;

export type PathMap = Map<string, PathMap | DataMap>;

export type ArrayKeyedMap = PathMap | DataMap;

export type MappingConfiguration<
    TSource extends Dictionary<TSource> = any,
    TDestination extends Dictionary<TDestination> = any
> = (mapping: Mapping<TSource, TDestination>) => void;

export type ApplyMetadataFn = <TModel extends Dictionary<TModel>>(
    model: MetadataIdentifier<TModel>,
    as: MetadataObjectMapClassId
) => TModel;

export type ApplyMetadata = (
    strategy: MappingStrategy<MetadataIdentifier>
) => ApplyMetadataFn;

export type DestinationConstructor<
    TSource extends Dictionary<TSource> = any,
    TDestination extends Dictionary<TDestination> = any
> = (
    sourceObject: TSource,
    destinationIdentifier: MetadataIdentifier<TDestination>
) => TDestination;

export type MappingProfile = (mapper: Mapper) => void;

export type MetadataList = Array<
    [
        property: string,
        metadata: {
            type: () => MetadataIdentifier;
            isArray: boolean;
            depth: number;
            isGetterOnly?: boolean;
        }
    ]
>;

export interface MappingStrategy<TIdentifier extends MetadataIdentifier> {
    destinationConstructor: DestinationConstructor;
    mapper: Mapper;
    readonly applyMetadata: ApplyMetadataFn;
    retrieveMetadata(
        ...identifiers: TIdentifier[]
    ): Map<TIdentifier, MetadataList>;
    preMap<
        TSource extends Dictionary<TSource>,
        TDestination extends Dictionary<TDestination>
    >(
        source: TSource,
        mapping: Mapping<TSource, TDestination>
    ): TSource;
    postMap<
        TSource extends Dictionary<TSource>,
        TDestination extends Dictionary<TDestination>
    >(
        source: TSource,
        destination: TDestination,
        mapping: Mapping<TSource, TDestination>
    ): TDestination | undefined;
}

export type MappingStrategyInitializer<TIdentifier extends MetadataIdentifier> =
    (mapper: Mapper) => MappingStrategy<TIdentifier>;

export interface MappingStrategyInitializerOptions {
    applyMetadata?: ApplyMetadata;
    destinationConstructor?: DestinationConstructor;
    preMap?<
        TSource extends Dictionary<TSource>,
        TDestination extends Dictionary<TDestination>
    >(
        source: TSource,
        mapping: Mapping<TSource, TDestination>
    ): TSource;
    postMap?<
        TSource extends Dictionary<TSource>,
        TDestination extends Dictionary<TDestination>
    >(
        source: TSource,
        destination: TDestination,
        mapping: Mapping<TSource, TDestination>
    ): TDestination;
}
