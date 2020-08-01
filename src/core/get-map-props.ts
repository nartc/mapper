import { Constructible, Dict, MapOptions } from '../types';
import { isClass } from '../utils';

export function getMapProps<
  TSource extends Dict<TSource> = any,
  TDestination extends Dict<TDestination> = any
>(
  args: any[],
  skipUnmappedAssertion: boolean
): [
  Constructible<TDestination>,
  MapOptions<TSource, TDestination>,
  Constructible<TSource>?
] {
  const destination: Constructible<TDestination> = args[0];
  const defaultOptions = {
    skipUnmappedAssertion,
    beforeMap: undefined,
    afterMap: undefined,
  };

  if (args.length === 1) {
    return [destination, defaultOptions];
  }

  if (args.length === 3) {
    return [destination, { ...defaultOptions, ...args[2] }, args[1]];
  }

  let temp = args[1];

  if (
    (typeof temp === 'function' || isClass(temp)) &&
    !temp['beforeMap'] &&
    !temp['afterMap']
  ) {
    return [destination, defaultOptions, temp];
  }

  return [destination, { ...defaultOptions, ...temp }];
}
