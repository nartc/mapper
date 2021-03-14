import { isEmpty } from '@automapper/core';
import type { MapOptions, Mapper } from '@automapper/types';

export function shouldSkipTransform(
  mapper: Mapper,
  to: unknown,
  from: unknown
): boolean {
  return !mapper || !to || !from;
}

export function transformArray(
  value: unknown,
  mapper: Mapper,
  to: any,
  from: any,
  options?: MapOptions
) {
  if (!Array.isArray(value)) return value;
  return mapper.mapArray(value, to, from, options);
}

export function getTransformOptions(
  options?: { isArray?: boolean; mapperName?: string } & MapOptions
): {
  mapperName: string;
  isArray: boolean;
  transformedMapOptions?: MapOptions;
} {
  const { isArray = false, mapperName, ...mapOptions } = options || {};
  const transformedMapOptions = isEmpty(mapOptions) ? undefined : mapOptions;
  return { isArray, mapperName, transformedMapOptions };
}
