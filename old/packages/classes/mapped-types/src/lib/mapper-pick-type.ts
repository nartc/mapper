import type { Constructible } from '@automapper/classes';
import type { MappedType } from './interfaces';
import { inheritAutoMapMetadata, inheritPropertyInitializers } from './utils';

export function MapperPickType<T, K extends keyof T>(
  classRef: Constructible<T>,
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
