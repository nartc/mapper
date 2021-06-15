import type {
  Dictionary,
  NullSubstitutionReturn,
  SelectorReturn,
} from '@automapper/types';
import { TransformationType } from '@automapper/types';
import { get } from '../utils';

export function nullSubstitution<
  TSource extends Dictionary<TSource> = any,
  TDestination extends Dictionary<TDestination> = any,
  TSelectorReturn = SelectorReturn<TDestination>
>(
  substitution: TSelectorReturn
): NullSubstitutionReturn<TSource, TDestination, TSelectorReturn> {
  return [
    TransformationType.NullSubstitution,
    (source, sourceMemberPath) => {
      const sourceValue = get(source, sourceMemberPath) as TSelectorReturn;
      return sourceValue === null ? substitution : sourceValue;
    },
  ];
}
