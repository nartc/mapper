import type {
  Dictionary,
  FromValueReturn,
  SelectorReturn,
} from '@automapper/types';
import { TransformationType } from '@automapper/types';

export function fromValue<
  TDestination extends Dictionary<TDestination> = any,
  TSelectorReturn = SelectorReturn<TDestination>
>(rawValue: TSelectorReturn): FromValueReturn<TDestination, TSelectorReturn> {
  return [TransformationType.FromValue, () => rawValue];
}
