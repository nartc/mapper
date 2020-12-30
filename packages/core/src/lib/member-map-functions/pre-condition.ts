import type {
  ConditionPredicate,
  Dictionary,
  PreConditionFunction,
  SelectorReturn,
} from '@automapper/types';

export function preCondition<
  TSource extends Dictionary<TSource> = unknown,
  TDestination extends Dictionary<TDestination> = unknown,
  TSelectorReturn = SelectorReturn<TDestination>
>(
  predicate: ConditionPredicate<TSource>,
  defaultValue?: TSelectorReturn
): ReturnType<PreConditionFunction<TSource, TDestination, TSelectorReturn>> {
  return [predicate, defaultValue];
}
