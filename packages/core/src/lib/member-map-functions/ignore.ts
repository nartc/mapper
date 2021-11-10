import type { IgnoreReturn } from '../types';
import { TransformationType } from '../types';

export function ignore(): IgnoreReturn {
  return [TransformationType.Ignore];
}
