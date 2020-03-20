import {
  ConditionPredicate,
  Dict,
  PreConditionFunction,
  SelectorReturn,
} from '../types';

export function preCondition<
  TSource extends Dict<TSource> = any,
  TDestination extends Dict<TDestination> = any,
  TSelectorReturn = SelectorReturn<TDestination>
>(
  predicate: ConditionPredicate<TSource>,
  defaultValue?: TSelectorReturn
): ReturnType<PreConditionFunction<TSource, TDestination, TSelectorReturn>> {
  const result: ReturnType<PreConditionFunction<
    TSource,
    TDestination,
    TSelectorReturn
  >> = source => predicate(source);
  result.defaultValue = defaultValue;
  return result;
}
