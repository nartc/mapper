import { IgnoreFunction } from '../types';

export function ignore(): ReturnType<IgnoreFunction> {
  // 0: TransformationType.Ignore
  return [0, null, () => {}];
}
