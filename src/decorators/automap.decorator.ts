import { metadataStorage } from '../storages';
import { instanceStorage } from '../storages/instance.storage';
import { Constructible, MetadataFunction } from '../types';
import { storeMetadata } from '../utils';

export const AutoMap = (
  typeFn?: () => Function,
  depth: number = 0
): PropertyDecorator => (target, propertyKey) => {
  if (typeFn) {
    metadataStorage.addMetadata(target.constructor as Constructible, [
      [propertyKey, typeFn as MetadataFunction],
    ]);
    instanceStorage.set(
      target.constructor as Constructible,
      propertyKey,
      depth
    );
  } else {
    let meta = Reflect.getMetadata('design:type', target, propertyKey);
    if (meta) {
      storeMetadata(
        target.constructor as Constructible,
        meta.prototype.constructor.name,
        propertyKey as string
      );
    }
  }
};
