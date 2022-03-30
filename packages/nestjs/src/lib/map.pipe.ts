import type {
    Dictionary,
    MapOptions,
    Mapper,
    ModelIdentifier,
} from '@automapper/core';
import type { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { mixin, Optional } from '@nestjs/common';
import { InjectMapper } from './di/inject-mapper';
import { memoize } from './utils/memoize';
import {
    getTransformOptions,
    shouldSkipTransform,
    transformArray,
} from './utils/transform';

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
) => PipeTransform = memoize(createMapPipe);

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

        transform(
            value: TSource | TSource[],
            { type }: ArgumentMetadata
        ): TSource | TSource[] | TDestination | TDestination[] {
            if (
                shouldSkipTransform(this.mapper, from, to) ||
                (type !== 'body' && type !== 'query')
            ) {
                return value;
            }

            try {
                if (isArray) {
                    return transformArray(
                        value as TSource[],
                        this.mapper,
                        from,
                        to,
                        transformedMapOptions as unknown as MapOptions<
                            TSource[],
                            TDestination[]
                        >
                    ) as TDestination[];
                }

                return this.mapper?.map(
                    value as TSource,
                    from,
                    to,
                    transformedMapOptions
                ) as TDestination;
            } catch (e) {
                return value;
            }
        }
    }

    return mixin(MixinMapPipe);
}
