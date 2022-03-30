import type { Resolver } from '../types';

export function isResolver(fn: unknown): fn is Resolver {
    return 'resolve' in (fn as Record<string, unknown>);
}
