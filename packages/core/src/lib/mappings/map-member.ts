import type {
    ConditionReturn,
    ConvertUsingReturn,
    Dictionary,
    FromValueReturn,
    MapDeferReturn,
    MapFromReturn,
    Mapper,
    MapWithArgumentsReturn,
    MapWithReturn,
    MemberMapReturn,
    MetadataIdentifier,
    Primitive,
} from '../types';
import { MapFnClassId, TransformationType } from '../types';
import { isDateConstructor } from '../utils/is-date-constructor';
import { isPrimitiveConstructor } from '../utils/is-primitive-constructor';

export function mapMember<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>
>(
    transformationMapFn: MemberMapReturn<TSource, TDestination>,
    sourceObject: TSource,
    destinationObject: TDestination,
    destinationMemberPath: string[],
    extraArgs: Record<string, any> | undefined,
    mapper: Mapper,
    sourceMemberIdentifier?: MetadataIdentifier | Primitive | Date,
    destinationMemberIdentifier?: MetadataIdentifier | Primitive | Date
) {
    let value: unknown;
    const transformationType: TransformationType =
        transformationMapFn[MapFnClassId.type];
    const mapFn = transformationMapFn[MapFnClassId.fn];
    const shouldRunImplicitMap = !(
        isPrimitiveConstructor(sourceMemberIdentifier) ||
        isPrimitiveConstructor(destinationMemberIdentifier) ||
        isDateConstructor(sourceMemberIdentifier) ||
        isDateConstructor(destinationMemberIdentifier)
    );

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
            )(
                sourceObject,
                mapper,
                extraArgs ? { extraArgs: () => extraArgs } : undefined
            );
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
        case TransformationType.UndefinedSubstitution:
            value = (
                mapFn as ConditionReturn<TSource, TDestination>[MapFnClassId.fn]
            )(sourceObject, destinationMemberPath);

            if (shouldRunImplicitMap && value != null) {
                value = Array.isArray(value)
                    ? mapper.mapArray(
                          value,
                          sourceMemberIdentifier as MetadataIdentifier,
                          destinationMemberIdentifier as MetadataIdentifier
                      )
                    : mapper.map(
                          value,
                          sourceMemberIdentifier as MetadataIdentifier,
                          destinationMemberIdentifier as MetadataIdentifier
                      );
            }

            break;
        case TransformationType.MapWithArguments:
            value = (
                mapFn as MapWithArgumentsReturn<
                    TSource,
                    TDestination
                >[MapFnClassId.fn]
            )(sourceObject, extraArgs || {});
            break;
        case TransformationType.MapDefer:
            value = mapMember(
                (
                    mapFn as MapDeferReturn<
                        TSource,
                        TDestination
                    >[MapFnClassId.fn]
                )(sourceObject) as MemberMapReturn<TSource, TDestination>,
                sourceObject,
                destinationObject,
                destinationMemberPath,
                extraArgs,
                mapper,
                sourceMemberIdentifier,
                destinationMemberIdentifier
            );
            break;
    }
    return value;
}
