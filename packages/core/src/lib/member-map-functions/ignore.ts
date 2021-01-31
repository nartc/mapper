import type { IgnoreReturn } from '@automapper/types';
import { TransformationType } from '@automapper/types';

export function ignore(): IgnoreReturn {
  return [TransformationType.Ignore];
}
