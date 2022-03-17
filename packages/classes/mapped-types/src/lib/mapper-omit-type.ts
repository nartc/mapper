import type { Constructor } from '@automapper/core';
import type { MappedType } from './mapped-type';
import {
    inheritAutoMapMetadata,
    inheritPropertyInitializers,
} from './type-helper';

export function MapperOmitType<T, K extends keyof T>(
    classRef: Constructor<T>,
    keys: readonly K[]
): MappedType<Omit<T, typeof keys[number]>> {
    const isInheritedPredicate = (propertyKey: string) =>
        !keys.includes(propertyKey as K);

    class OmitClassType {
        constructor() {
            inheritPropertyInitializers(
                this as Record<string, unknown>,
                classRef,
                isInheritedPredicate
            );
        }
    }

    inheritAutoMapMetadata(classRef, OmitClassType, isInheritedPredicate);
    return OmitClassType as MappedType<Omit<T, typeof keys[number]>>;
}
