import { Constructible, Dict, MapOptions } from '../types';
import { isClass } from '../utils';

export function getMapProps<
  TSource extends Dict<TSource> = any,
  TDestination extends Dict<TDestination> = any
>(
  args: any[]
): [
  Constructible<TDestination>,
  Constructible<TSource>?,
  MapOptions<TSource, TDestination>?
] {
  const destination: Constructible<TDestination> = args[0];

  if (args.length === 1) {
    return [destination];
  }

  if (args.length === 3) {
    return [destination, args[1], args[2]];
  }

  let temp = args[1];

  if (
    (typeof temp === 'function' || isClass(temp)) &&
    !temp['beforeMap'] &&
    !temp['afterMap']
  ) {
    return [destination, temp];
  }

  return [destination, undefined, temp];
}
