import type {
  ConditionFunction,
  ConditionPredicate,
  Dictionary,
  SelectorReturn,
} from '@automapper/types';
import { TransformationType } from '@automapper/types';
import { get } from '../utils';

export function condition<
  TSource extends Dictionary<TSource> = unknown,
  TDestination extends Dictionary<TDestination> = unknown,
  TSelectorReturn = SelectorReturn<TDestination>
>(
  predicate: ConditionPredicate<TSource>,
  defaultValue?: TSelectorReturn
): ReturnType<ConditionFunction<TSource, TDestination, TSelectorReturn>> {
  return [
    TransformationType.Condition,
    null,
    (source, ...sourceMemberPaths) => {
      if (predicate(source)) {
        return get(source, ...sourceMemberPaths) as TSelectorReturn;
      }

      return defaultValue;
    },
  ];
}
