import type { MapOptions, Mapper } from '@automapper/types';
import type {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common';
import { mixin, Optional } from '@nestjs/common';
import type { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { InjectMapper } from '../di';
import {
  getTransformOptions,
  memoize,
  shouldSkipTransform,
  transformArray,
} from '../utils';

export const MapInterceptor: (
  to: unknown,
  from: unknown,
  options?: { isArray?: boolean; mapperName?: string } & MapOptions
) => NestInterceptor = memoize(createMapInterceptor);

function createMapInterceptor(
  to: unknown,
  from: unknown,
  options?: { isArray?: boolean; mapperName?: string } & MapOptions
): new (...args: any[]) => NestInterceptor {
  const { isArray, mapperName, transformedMapOptions } = getTransformOptions(
    options
  );

  class MixinMapInterceptor implements NestInterceptor {
    constructor(
      @Optional() @InjectMapper(mapperName) private readonly mapper?: Mapper
    ) {}

    async intercept(
      context: ExecutionContext,
      next: CallHandler
    ): Promise<Observable<unknown>> {
      if (shouldSkipTransform(this.mapper, to, from)) {
        return next.handle();
      }

      try {
        return next.handle().pipe(
          map((response) => {
            if (isArray) {
              return transformArray(
                response,
                this.mapper,
                to,
                from,
                transformedMapOptions
              );
            }

            return this.mapper?.map(
              response,
              to as any,
              from as any,
              transformedMapOptions
            );
          })
        );
      } catch {
        return next.handle();
      }
    }
  }

  return mixin(MixinMapInterceptor);
}
