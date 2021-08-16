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
} from '@automapper/types';
import { MapFnClassId, TransformationType } from '@automapper/types';

/**
 * Instruction on how to map a particular member on the destination
 *
 * @param {MemberMapReturn} transformationMapFn - Transformation information of the property
 * @param {TSource} sourceObj - The sourceObject being used to map to destination
 * @param destination - destination meta key
 * @param {string} destinationMemberPath - the property path on the destination
 * @param extraArguments - a dictionary of extra arguments to be used with MapWithArguments
 * @param {Mapper} mapper - the mapper instance
 */
export function mapMember<TSource extends Dictionary<TSource> = any>(
  transformationMapFn: MemberMapReturn,
  sourceObj: TSource,
  destination: unknown,
  destinationMemberPath: string[],
  extraArguments: Record<string, unknown> | undefined,
  mapper: Mapper
) {
  let value: unknown;
  const transformationType: TransformationType =
    transformationMapFn[MapFnClassId.type];
  const mapFn = transformationMapFn[MapFnClassId.fn];

  switch (transformationType) {
    case TransformationType.MapFrom:
      value = (mapFn as MapFromReturn[MapFnClassId.fn])(sourceObj, destination);
      break;
    case TransformationType.FromValue:
      value = (mapFn as FromValueReturn[MapFnClassId.fn])();
      break;
    case TransformationType.MapWith:
      value = (mapFn as MapWithReturn[MapFnClassId.fn])(sourceObj, mapper);
      break;
    case TransformationType.ConvertUsing:
      value = (mapFn as ConvertUsingReturn[MapFnClassId.fn])(sourceObj);
      break;
    case TransformationType.Condition:
    case TransformationType.NullSubstitution:
      value = (mapFn as ConditionReturn[MapFnClassId.fn])(
        sourceObj,
        destinationMemberPath
      );
      break;
    case TransformationType.MapWithArguments:
      value = (mapFn as MapWithArgumentsReturn[MapFnClassId.fn])(
        sourceObj,
        extraArguments || {}
      );
      break;
    case TransformationType.MapDefer:
      value = mapMember(
        (mapFn as MapDeferReturn[MapFnClassId.fn])(
          sourceObj
        ) as MemberMapReturn,
        sourceObj,
        destination,
        destinationMemberPath,
        extraArguments,
        mapper
      );
      break;
  }
  return value;
}
