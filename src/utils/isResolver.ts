import { Resolver, ValueSelector } from '../types';

export function isResolver(fn: ValueSelector | Resolver): fn is Resolver {
  return 'resolve' in fn;
}
