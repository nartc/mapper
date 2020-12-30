import type { IgnoreFunction } from '@automapper/types';
import { TransformationType } from '@automapper/types';

export function ignore(): ReturnType<IgnoreFunction> {
  return [TransformationType.Ignore, null, null];
}
