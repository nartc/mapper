import type { Constructible } from '@automapper/classes';
import type { MappedType } from './interfaces';
import { inheritAutoMapMetadata, inheritPropertyInitializers } from './utils';

export function MapperIntersectionType<A, B>(
  classARef: Constructible<A>,
  classBRef: Constructible<B>
): MappedType<A & B> {
  class IntersectionClassType {
    constructor() {
      inheritPropertyInitializers(this as Record<string, unknown>, classARef);
      inheritPropertyInitializers(this as Record<string, unknown>, classBRef);
    }
  }

  inheritAutoMapMetadata(classARef, IntersectionClassType);
  inheritAutoMapMetadata(classBRef, IntersectionClassType);
  return IntersectionClassType as MappedType<A & B>;
}
