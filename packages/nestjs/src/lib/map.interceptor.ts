import type {
    Dictionary,
    MapOptions,
    Mapper,
    ModelIdentifier,
} from '@automapper/core';
import type {
    CallHandler,
    ExecutionContext,
    NestInterceptor,
    Type,
} from '@nestjs/common';
import { mixin, Optional } from '@nestjs/common';
import type { Observable } from 'rxjs';
import { concatMap } from 'rxjs';
import { InjectMapper } from './di/inject-mapper';
import { memoize } from './utils/memoize';
import {
    getTransformOptions,
    shouldSkipTransform,
    transformArrayAsync,
} from './utils/transform';

/**
 * Maps route-handler responses with synchronous or asynchronous mappings.
 * Promise-returning member resolvers and callbacks are awaited before the
 * response is emitted, and mapping errors propagate through the response stream.
 */
export const MapInterceptor: <
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>
>(
    from: ModelIdentifier<TSource>,
    to: ModelIdentifier<TDestination>,
    options?: { isArray?: boolean; mapperName?: string } & MapOptions<
        TSource,
        TDestination
    >
) => Type<NestInterceptor> = memoize(createMapInterceptor);

function createMapInterceptor<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>
>(
    from: ModelIdentifier<TSource>,
    to: ModelIdentifier<TDestination>,
    options?: { isArray?: boolean; mapperName?: string } & MapOptions<
        TSource,
        TDestination
    >
): new (...args: unknown[]) => NestInterceptor {
    const { isArray, mapperName, transformedMapOptions } =
        getTransformOptions(options);

    class MixinMapInterceptor implements NestInterceptor {
        constructor(
            @Optional()
            @InjectMapper(mapperName)
            private readonly mapper?: Mapper
        ) {}

        intercept(
            context: ExecutionContext,
            next: CallHandler
        ): Observable<unknown> {
            if (shouldSkipTransform(this.mapper, from, to)) {
                return next.handle();
            }

            return next.handle().pipe(
                concatMap((response) => {
                    if (isArray) {
                        return transformArrayAsync(
                            response,
                            this.mapper!,
                            from,
                            to,
                            transformedMapOptions as unknown as MapOptions<
                                TSource[],
                                TDestination[]
                            >
                        );
                    }

                    return this.mapper!.mapAsync(
                        response,
                        from,
                        to,
                        transformedMapOptions
                    );
                })
            );
        }
    }

    return mixin(MixinMapInterceptor);
}
