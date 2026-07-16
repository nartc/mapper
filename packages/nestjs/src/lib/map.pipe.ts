import type {
    Dictionary,
    MapOptions,
    Mapper,
    ModelIdentifier,
} from '@automapper/core';
import type { ArgumentMetadata, PipeTransform, Type } from '@nestjs/common';
import { mixin, Optional } from '@nestjs/common';
import { InjectMapper } from './di/inject-mapper';
import { memoize } from './utils/memoize';
import {
    getTransformOptions,
    shouldSkipTransform,
    transformArrayAsync,
} from './utils/transform';

/**
 * Maps request bodies or query values with synchronous or asynchronous mappings.
 * Promise-returning member resolvers and callbacks are awaited, and mapping
 * errors propagate through Nest's request pipeline.
 */
export const MapPipe: <
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>
>(
    from: ModelIdentifier<TSource>,
    to: ModelIdentifier<TDestination>,
    options?: { isArray?: boolean; mapperName?: string } & MapOptions<
        TSource,
        TDestination
    >
) => Type<PipeTransform> = memoize(createMapPipe);

function createMapPipe<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>
>(
    from: ModelIdentifier<TSource>,
    to: ModelIdentifier<TDestination>,
    options?: { isArray?: boolean; mapperName?: string } & MapOptions<
        TSource,
        TDestination
    >
): new (...args: unknown[]) => PipeTransform {
    const { isArray, mapperName, transformedMapOptions } =
        getTransformOptions(options);

    class MixinMapPipe implements PipeTransform {
        constructor(
            @Optional()
            @InjectMapper(mapperName)
            private readonly mapper?: Mapper
        ) {}

        async transform(
            value: TSource | TSource[],
            { type }: ArgumentMetadata
        ): Promise<TSource | TSource[] | TDestination | TDestination[]> {
            if (
                shouldSkipTransform(this.mapper, from, to) ||
                (type !== 'body' && type !== 'query')
            ) {
                return value;
            }

            if (isArray) {
                return transformArrayAsync(
                    value as TSource[],
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
                value as TSource,
                from,
                to,
                transformedMapOptions
            );
        }
    }

    return mixin(MixinMapPipe);
}
