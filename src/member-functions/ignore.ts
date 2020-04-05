import { IgnoreFunction, TransformationType } from '../types';

export function ignore(): ReturnType<IgnoreFunction> {
  return [TransformationType.Ignore as const, null, () => {}];
}
