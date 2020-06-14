import { Dict, NullSubstitutionFunction, SelectorReturn } from '../types';
import { get } from '../utils';

export function nullSubstitution<
  TSource extends Dict<TSource> = any,
  TDestination extends Dict<TDestination> = any,
  TSelectorReturn = SelectorReturn<TDestination>
>(
  substitution: TSelectorReturn
): ReturnType<
  NullSubstitutionFunction<TSource, TDestination, TSelectorReturn>
> {
  return [
    7, // 7: TransformationType.NullSubstitution
    null,
    (source, ...sourceMemberPaths) =>
      get(source, substitution, ...sourceMemberPaths),
  ];
}
