import { isEmpty } from '@automapper/core';
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
import { memoize } from './memoize.util';

export const MapInterceptor: (
  to: unknown,
  from: unknown,
  options?: { isArray?: boolean; mapperName?: string } & MapOptions
) => NestInterceptor = memoize(createMapInterceptor);

function createMapInterceptor(
  to: unknown,
  from: unknown,
  options?: { isArray?: boolean; mapperName?: string }
): new (...args) => NestInterceptor {
  const { isArray = false, mapperName, ...mapOptions } = options || {};
  const transformedMapOptions = isEmpty(mapOptions) ? null : mapOptions;

  class MixinMapInterceptor implements NestInterceptor {
    constructor(
      @Optional() @InjectMapper(mapperName) private readonly mapper?: Mapper
    ) {}

    async intercept(
      context: ExecutionContext,
      next: CallHandler
    ): Promise<Observable<unknown>> {
      if (!this.mapper || !to || !from) {
        return next.handle();
      }

      try {
        return next.handle().pipe(
          map((response) => {
            if (isArray) {
              if (!Array.isArray(response)) return response;
              return this.mapper?.mapArray(
                response,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                to as any,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                from as any,
                transformedMapOptions
              );
            }

            return this.mapper?.map(
              response,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              to as any,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
