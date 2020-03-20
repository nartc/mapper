import { IgnoreFunction, TransformationType } from '../types';

export function ignore(): ReturnType<IgnoreFunction> {
  const result: ReturnType<IgnoreFunction> = () => {};
  result.type = TransformationType.Ignore as const;
  return result;
}
