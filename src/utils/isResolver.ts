import { Resolver, ValueSelector } from '../types';

export function isResolver(
  fn: ValueSelector | Resolver<any, any>
): fn is Resolver<any, any> {
  return 'resolve' in fn;
}
