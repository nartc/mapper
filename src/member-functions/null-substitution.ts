import {
  Dict,
  NullSubstitutionFunction,
  SelectorReturn,
  TransformationType,
} from '../types';
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
  const result: ReturnType<NullSubstitutionFunction<
    TSource,
    TDestination,
    TSelectorReturn
  >> = (source, ...sourceMemberPaths) =>
    get(source, substitution, ...sourceMemberPaths);
  result.type = TransformationType.NullSubstitution as const;
  return result;
}
