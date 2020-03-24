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
  return [source => predicate(source), defaultValue];
}
