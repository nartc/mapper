import type { Constructor } from '@automapper/core';
import type { MappedType } from './mapped-type';
import {
    inheritAutoMapMetadata,
    inheritPropertyInitializers,
} from './type-helper';

export function MapperIntersectionType<A, B>(
    classARef: Constructor<A>,
    classBRef: Constructor<B>
): MappedType<A & B> {
    class IntersectionClassType {
        constructor() {
            inheritPropertyInitializers(
                this as Record<string, unknown>,
                classARef
            );
            inheritPropertyInitializers(
                this as Record<string, unknown>,
                classBRef
            );
        }
    }

    inheritAutoMapMetadata(classARef, IntersectionClassType);
    inheritAutoMapMetadata(classBRef, IntersectionClassType);
    return IntersectionClassType as MappedType<A & B>;
}
