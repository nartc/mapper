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
} from '@nestjs/common';
import { mixin, Optional } from '@nestjs/common';
import type { Observable } from 'rxjs';
import { map } from 'rxjs';
import { InjectMapper } from './di/inject-mapper';
import { memoize } from './utils/memoize';
import {
    getTransformOptions,
    shouldSkipTransform,
    transformArray,
} from './utils/transform';

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
) => NestInterceptor = memoize(createMapInterceptor);

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

        async intercept(
            context: ExecutionContext,
            next: CallHandler
        ): Promise<Observable<unknown>> {
            if (shouldSkipTransform(this.mapper, from, to)) {
                return next.handle();
            }

            try {
                return next.handle().pipe(
                    map((response) => {
                        if (isArray) {
                            return transformArray(
                                response,
                                this.mapper,
                                from,
                                to,
                                transformedMapOptions as unknown as MapOptions<
                                    TSource[],
                                    TDestination[]
                                >
                            );
                        }

                        return this.mapper?.map(
                            response,
                            from,
                            to,
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
