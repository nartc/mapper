import type {
  Dictionary,
  NullSubstitutionFunction,
  SelectorReturn,
} from '@automapper/types';
import { TransformationType } from '@automapper/types';
import { get } from '../utils';

export function nullSubstitution<
  TSource extends Dictionary<TSource> = unknown,
  TDestination extends Dictionary<TDestination> = unknown,
  TSelectorReturn = SelectorReturn<TDestination>
>(
  substitution: TSelectorReturn
): ReturnType<
  NullSubstitutionFunction<TSource, TDestination, TSelectorReturn>
> {
  return [
    TransformationType.NullSubstitution,
    null,
    (source, ...sourceMemberPaths) => {
      const sourceValue = get(source, ...sourceMemberPaths) as TSelectorReturn;
      return sourceValue === null ? substitution : sourceValue;
    },
  ];
}
