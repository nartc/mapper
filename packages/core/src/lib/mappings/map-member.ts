import type {
    ConditionReturn,
    ConvertUsingReturn,
    Dictionary,
    FromValueReturn,
    MapFromReturn,
    Mapper,
    MapWithArgumentsReturn,
    MapWithReturn,
    MemberMapReturn,
} from '../types';
import { MapFnClassId, TransformationType } from '../types';

export function mapMember<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>
>(
    transformationMapFn: MemberMapReturn<TSource, TDestination>,
    sourceObject: TSource,
    destinationObject: TDestination,
    destinationMemberPath: string[],
    extraArgs: Record<string, any> | undefined,
    mapper: Mapper
) {
    let value: unknown;
    const transformationType: TransformationType =
        transformationMapFn[MapFnClassId.type];
    const mapFn = transformationMapFn[MapFnClassId.fn];

    switch (transformationType) {
        case TransformationType.MapFrom:
            value = (
                mapFn as MapFromReturn<TSource, TDestination>[MapFnClassId.fn]
            )(sourceObject);
            break;
        case TransformationType.FromValue:
            value = (
                mapFn as FromValueReturn<TSource, TDestination>[MapFnClassId.fn]
            )();
            break;
        case TransformationType.MapWith:
            value = (
                mapFn as MapWithReturn<TSource, TDestination>[MapFnClassId.fn]
            )(sourceObject, mapper);
            break;
        case TransformationType.ConvertUsing:
            value = (
                mapFn as ConvertUsingReturn<
                    TSource,
                    TDestination
                >[MapFnClassId.fn]
            )(sourceObject);
            break;
        case TransformationType.Condition:
        case TransformationType.NullSubstitution:
            value = (
                mapFn as ConditionReturn<TSource, TDestination>[MapFnClassId.fn]
            )(sourceObject, destinationMemberPath);
            break;
        case TransformationType.MapWithArguments:
            value = (
                mapFn as MapWithArgumentsReturn<
                    TSource,
                    TDestination
                >[MapFnClassId.fn]
            )(sourceObject, extraArgs || {});
            break;
    }
    return value;
}
