import type { Constructible } from '@automapper/classes';
import type { MappedType } from './interfaces';
import { inheritAutoMapMetadata, inheritPropertyInitializers } from './utils';

export function MapperOmitType<T, K extends keyof T>(
  classRef: Constructible<T>,
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
