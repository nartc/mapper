import type { Constructor } from '@automapper/core';
import 'reflect-metadata';
import { AUTOMAP_STANDALONE_METADATA_KEY } from './keys';

export function AutoMapStandalone(
    ...constructors: Constructor[]
): ClassDecorator {
    return (target) => {
        Reflect.defineMetadata(
            AUTOMAP_STANDALONE_METADATA_KEY,
            constructors,
            target
        );
    };
}

export function getStandaloneConstructors(model: Constructor): Constructor[] {
    return Reflect.getMetadata(AUTOMAP_STANDALONE_METADATA_KEY, model) || [];
}
