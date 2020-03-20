import {
  ConditionFunction,
  ConditionPredicate,
  Dict,
  SelectorReturn,
  TransformationType,
} from '../types';
import { get } from '../utils';

export function condition<
  TSource extends Dict<TSource> = any,
  TDestination extends Dict<TDestination> = any,
  TSelectorReturn = SelectorReturn<TDestination>
>(
  predicate: ConditionPredicate<TSource>,
  defaultValue?: TSelectorReturn
): ReturnType<ConditionFunction<TSource, TDestination, TSelectorReturn>> {
  const result: ReturnType<ConditionFunction<
    TSource,
    TDestination,
    TSelectorReturn
  >> = (source, ...sourceMemberPaths) => {
    if (predicate(source)) {
      return get(source, null, ...sourceMemberPaths);
    }

    return defaultValue || null;
  };
  result.type = TransformationType.Condition as const;
  return result;
}
