import type { Resolver } from '@automapper/types';

export function isResolver(fn: unknown): fn is Resolver {
  return 'resolve' in (fn as Record<string, unknown>);
}
