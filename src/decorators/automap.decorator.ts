import { metadataStorage } from '../storages';
import { instantiateDepthStorage } from '../storages/instantiate-depth.storage';
import { Constructible, MetadataFunction } from '../types';
import { storeMetadata } from '../utils';

export const AutoMap = (
  typeFn?: () => Function,
  depth: number = 1
): PropertyDecorator => (target, propertyKey) => {
  if (typeFn) {
    metadataStorage.addMetadata(target.constructor as Constructible, [
      [propertyKey, typeFn as MetadataFunction],
    ]);
    instantiateDepthStorage.set(
      target.constructor as Constructible,
      propertyKey,
      depth
    );
  } else {
    const reflectedMetadata = Reflect.getMetadata(
      'design:type',
      target,
      propertyKey
    );
    if (reflectedMetadata) {
      storeMetadata(
        target.constructor as Constructible,
        reflectedMetadata.prototype.constructor.name,
        propertyKey as string
      );
    }
  }
};
