import type { MapOptions, Mapper } from '@automapper/types';
import type { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { mixin, Optional } from '@nestjs/common';
import { InjectMapper } from '../di';
import {
  getTransformOptions,
  memoize,
  shouldSkipTransform,
  transformArray,
} from '../utils';

export const MapPipe: (
  to: unknown,
  from: unknown,
  options?: { isArray?: boolean; mapperName?: string } & MapOptions
) => PipeTransform = memoize(createMapPipe);

function createMapPipe(
  to: unknown,
  from: unknown,
  options?: { isArray?: boolean; mapperName?: string }
): new (...args: any[]) => PipeTransform {
  const { isArray, mapperName, transformedMapOptions } = getTransformOptions(
    options
  );

  class MixinMapPipe implements PipeTransform {
    constructor(
      @Optional() @InjectMapper(mapperName) private readonly mapper?: Mapper
    ) {}

    transform(value: any, { type }: ArgumentMetadata): any {
      if (
        shouldSkipTransform(this.mapper, to, from) ||
        (type !== 'body' && type !== 'query')
      ) {
        return value;
      }

      try {
        if (isArray) {
          return transformArray(
            value,
            this.mapper,
            to,
            from,
            transformedMapOptions
          );
        }

        return this.mapper?.map(
          value,
          to as any,
          from as any,
          transformedMapOptions
        );
      } catch (e) {
        return value;
      }
    }
  }

  return mixin(MixinMapPipe);
}
