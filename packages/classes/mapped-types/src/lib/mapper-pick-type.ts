import type { Constructor } from '@automapper/core';
import type { MappedType } from './mapped-type';
import {
    inheritAutoMapMetadata,
    inheritPropertyInitializers,
} from './type-helper';

export function MapperPickType<T, K extends keyof T>(
    classRef: Constructor<T>,
    keys: readonly K[]
): MappedType<Pick<T, typeof keys[number]>> {
    const isInheritedPredicate = (propertyKey: string) =>
        keys.includes(propertyKey as K);

    class PickClassType {
        constructor() {
            inheritPropertyInitializers(
                this as Record<string, unknown>,
                classRef,
                isInheritedPredicate
            );
        }
    }

    inheritAutoMapMetadata(classRef, PickClassType, isInheritedPredicate);
    return PickClassType as MappedType<Pick<T, typeof keys[number]>>;
}
