import type {
  ConditionPredicate,
  ConditionReturn,
  Dictionary,
  SelectorReturn,
} from '../types';
import { TransformationType } from '../types';
import { get } from '../utils';

export function condition<
  TSource extends Dictionary<TSource> = any,
  TDestination extends Dictionary<TDestination> = any,
  TSelectorReturn = SelectorReturn<TDestination>
>(
  predicate: ConditionPredicate<TSource>,
  defaultValue?: TSelectorReturn
): ConditionReturn<TSource, TDestination, TSelectorReturn> {
  return [
    TransformationType.Condition,
    (source, sourceMemberPaths) => {
      if (predicate(source)) {
        return get(source, sourceMemberPaths) as TSelectorReturn;
      }

      return defaultValue as TSelectorReturn;
    },
  ];
}
