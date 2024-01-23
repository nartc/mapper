import { Dictionary } from '@mikro-orm/core';
import { MapCallbackAsync, Mapping } from '../types';

export async function mapAsyncHandler<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>,
    TExtraArgs extends Record<string, any> = Record<string, any>
>(
    mapping: Mapping<TSource, TDestination>,
    source: TSource,
    destination: TDestination,
    extraArguments: TExtraArgs,
    mapped?: TDestination
) {
    if (!mapping[7]) {
        mapping[7] = [];
    }
    const afterMap = mapping[7][1] as MapCallbackAsync<
        TSource,
        TDestination,
        TExtraArgs
    >;
    if (afterMap) {
        await afterMap(source, destination, extraArguments);
    }
    if (mapped) {
        return Object.assign(mapped, destination);
    } else {
        return destination;
    }
}
