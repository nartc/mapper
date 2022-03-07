import {
    ERROR_HANDLER,
    MAPPINGS,
    METADATA_MAP,
    NAMING_CONVENTIONS,
    RECURSIVE_COUNT,
    RECURSIVE_DEPTH,
    STRATEGY,
    TYPE_CONVERTERS,
} from './symbols';

export type Unpacked<T> = T extends (infer U)[]
    ? U
    : T extends (...args: unknown[]) => infer U
    ? U
    : T extends new (...args: unknown[]) => infer U
    ? U
    : T extends Promise<infer U>
    ? U
    : T;

export type Dictionary<T> = { [key in keyof T]?: unknown };

export type AnyConstructor = new (...args: any[]) => any;
export type Constructor<T = any> = (new (...args: any[]) => T) &
    TransformerMetadataFactory<T>;

export type Primitive = String | Number | Boolean;
export type PrimitiveExtended = Primitive | Date;

export type PrimitiveConstructor =
    | StringConstructor
    | NumberConstructor
    | BooleanConstructor;

export type PrimitiveConstructorExtended =
    | PrimitiveConstructor
    | DateConstructor
    | AnyConstructor;

export type PrimitiveConstructorReturnType<
    TType extends PrimitiveConstructorExtended
> = TType extends DateConstructor | Exclude<TType, PrimitiveConstructor>
    ? InstanceType<TType>
    : ReturnType<Extract<TType, PrimitiveConstructor>>;

export interface TransformerMetadataFactory<TModel extends Dictionary<TModel>> {
    __AUTOMAPPER_METADATA_FACTORY__?: () => [
        propertyKey: string,
        options: {
            type: () => Constructor | [Constructor];
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

export type Selector<
    TObject extends Dictionary<TObject> = any,
    TReturnType = unknown
> = (obj: TObject) => TReturnType;

export type SelectorReturn<TObject extends Dictionary<TObject>> = ReturnType<
    Selector<TObject>
>;

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
    resolve(source: TSource, destination?: TDestination): TResolvedType;
}

export interface Converter<
    TSource extends Dictionary<TSource> = any,
    TConvertDestination = any
> {
    convert(source: TSource): TConvertDestination;
}

export type MapCallback<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>
> = (source: TSource, destination: TDestination) => void;

export interface MapOptions<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>
> {
    beforeMap?: MapCallback<TSource, TDestination>;
    afterMap?: MapCallback<TSource, TDestination>;
    extraArgs?: <TExtraArgs extends Record<string, any> = Record<string, any>>(
        mapping: Mapping<TSource, TDestination>,
        destinationObject: TDestination
    ) => TExtraArgs;
}

export type ModelIdentifier<T = any> = string | symbol | Constructor<T>;

export type MetadataIdentifier<T = any> = Exclude<ModelIdentifier<T>, string>;

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

    mapAsync<
        TSource extends Dictionary<TSource>,
        TDestination extends Dictionary<TDestination>
    >(
        sourceObject: TSource,
        sourceIdentifier: ModelIdentifier<TSource>,
        destinationIdentifier: ModelIdentifier<TDestination>,
        options?: MapOptions<TSource, TDestination>
    ): Promise<TDestination>;

    mapArray<
        TSource extends Dictionary<TSource>,
        TDestination extends Dictionary<TDestination>
    >(
        sourceArray: TSource[],
        sourceIdentifier: ModelIdentifier<TSource>,
        destinationIdentifier: ModelIdentifier<TDestination>,
        options?: MapOptions<TSource[], TDestination[]>
    ): TDestination[];

    mapArrayAsync<
        TSource extends Dictionary<TSource>,
        TDestination extends Dictionary<TDestination>
    >(
        sourceArray: TSource[],
        sourceIdentifier: ModelIdentifier<TSource>,
        destinationIdentifier: ModelIdentifier<TDestination>,
        options?: MapOptions<TSource[], TDestination[]>
    ): Promise<TDestination[]>;

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

    dispose(): void;

    [TYPE_CONVERTERS]: Map<
        MetadataIdentifier | PrimitiveConstructor | DateConstructor,
        Map<
            MetadataIdentifier | PrimitiveConstructor | DateConstructor,
            Selector
        >
    >;

    [ERROR_HANDLER]: ErrorHandler;
    [MAPPINGS]: Map<MetadataIdentifier, Map<MetadataIdentifier, Mapping>>;
    [STRATEGY]: any;
    [NAMING_CONVENTIONS]:
        | NamingConvention
        | { source: NamingConvention; destination: NamingConvention };
    [METADATA_MAP]: Map<MetadataIdentifier, Array<Metadata>>;
    [RECURSIVE_DEPTH]: Map<MetadataIdentifier, ArrayKeyedMap>;
    [RECURSIVE_COUNT]: Map<MetadataIdentifier, ArrayKeyedMap>;
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
    MapWithArguments,
}

export const enum MapFnClassId {
    type,
    fn,
    misc,
}

export type MemberMapReturn<
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
    | IgnoreReturn<TSource, TDestination, TSelectorReturn>
    | MapWithArgumentsReturn<TSource, TDestination, TSelectorReturn>;

export const enum PreConditionReturnClassId {
    preConditionPredicate,
    preConditionDefaultValue,
}

export type PreConditionReturn<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>,
    TSelectorReturn = SelectorReturn<TDestination>
> = [
    preConditionPredicate: (source: TSource) => boolean,
    defaultValue?: TSelectorReturn
];

export type MapFromReturn<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>,
    TSelectorReturn = SelectorReturn<TDestination>
> = [
    TransformationType.MapFrom,
    (source: TSource, destination?: TDestination) => TSelectorReturn,
    ValueSelector<TSource, TDestination, TSelectorReturn> | null
];

export type MapWithReturn<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>,
    TSelectorReturn = SelectorReturn<TDestination>
> = [
    TransformationType.MapWith,
    (sourceObj: TSource, mapper: Mapper) => TSelectorReturn | undefined | null,
    ValueSelector<TSource>
];

export interface ConditionPredicate<TSource extends Dictionary<TSource>> {
    (source: TSource): boolean;
}

export type ConditionReturn<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>,
    TSelectorReturn = SelectorReturn<TDestination>
> = [
    TransformationType.Condition,
    (source: TSource, sourceMemberPath: string[]) => TSelectorReturn
];

export type FromValueReturn<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>,
    TSelectorReturn = SelectorReturn<TDestination>
> = [TransformationType.FromValue, () => TSelectorReturn];

export type ConvertUsingReturn<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>,
    TSelectorReturn = SelectorReturn<TDestination>
> = [TransformationType.ConvertUsing, Selector<TSource, TSelectorReturn>];

export type NullSubstitutionReturn<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>,
    TSelectorReturn = SelectorReturn<TDestination>
> = [
    TransformationType.NullSubstitution,
    (source: TSource, sourceMemberPath: string[]) => TSelectorReturn
];

export type IgnoreReturn<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>,
    TSelectorReturn = SelectorReturn<TDestination>
> = [TransformationType.Ignore];

export type MapWithArgumentsReturn<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>,
    TSelectorReturn = SelectorReturn<TDestination>
> = [
    TransformationType.MapWithArguments,
    (source: TSource, extraArguments: Record<string, any>) => TSelectorReturn
];

export type MapInitializeReturn<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>,
    TSelectorReturn = SelectorReturn<TDestination>
> = [TransformationType.MapInitialize, Selector<TSource, TSelectorReturn>];

export const enum MappingTransformationClassId {
    memberMapFn,
    preCond,
}

export type MappingTransformation<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>,
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
}

export const enum MappingClassId {
    identifiers,
    properties,
    mapper,
    destinationConstructor,
    typeConverters,
    callbacks,
    namingConventions,
}

export type Mapping<
    TSource extends Dictionary<TSource> = any,
    TDestination extends Dictionary<TDestination> = any
> = [
    identifiers: [
        source: MetadataIdentifier<TSource>,
        destination: MetadataIdentifier<TDestination>
    ],
    properties: Array<
        [
            path: string[],
            mappingProperty: MappingProperty<
                TSource,
                TDestination,
                SelectorReturn<TDestination>
            >,
            nestedMappingPair?: [
                MetadataIdentifier | Primitive | Date,
                MetadataIdentifier | Primitive | Date
            ]
        ]
    >,
    mapper: Mapper,
    destinationConstructor: DestinationConstructor<TSource, TDestination>,
    typeConverters?: Map<
        MetadataIdentifier | PrimitiveConstructor | DateConstructor,
        Map<
            MetadataIdentifier | PrimitiveConstructor | DateConstructor,
            Selector
        >
    >,
    callbacks?: [
        beforeMap?: MapCallback<TSource, TDestination>,
        afterMap?: MapCallback<TSource, TDestination>
    ],
    namingConventions?: [
        source: NamingConvention,
        destination: NamingConvention
    ]
];

export type DataMap = Map<symbol, number>;

export type PathMap = Map<string, PathMap | DataMap>;

export type ArrayKeyedMap = PathMap | DataMap;

export type MappingConfiguration<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>
> = ((mapping: any) => void) | void;

export type MappingConfigurationFn<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>
> = (mapper: Mapper) => MappingConfiguration<TSource, TDestination>;

export type ApplyMetadataFn = (model: MetadataIdentifier) => any;
export type ApplyMetadata = (strategy: any) => ApplyMetadataFn;

export type DestinationConstructor<
    TSource extends Dictionary<TSource> = any,
    TDestination extends Dictionary<TDestination> = any
> = (
    sourceObject: TSource,
    destinationIdentifier: MetadataIdentifier<TDestination>
) => TDestination;

export type MappingProfile = (mapper: Mapper) => void;
