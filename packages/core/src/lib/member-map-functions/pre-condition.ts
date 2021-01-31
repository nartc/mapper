import type {
  ConditionPredicate,
  Dictionary,
  PreConditionReturn,
  SelectorReturn,
} from '@automapper/types';

export function preCondition<
  TSource extends Dictionary<TSource> = any,
  TDestination extends Dictionary<TDestination> = any,
  TSelectorReturn = SelectorReturn<TDestination>
>(
  predicate: ConditionPredicate<TSource>,
  defaultValue?: TSelectorReturn
): PreConditionReturn<TSource, TDestination, TSelectorReturn> {
  return [predicate, defaultValue];
}
