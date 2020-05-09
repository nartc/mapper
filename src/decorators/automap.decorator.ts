import { metadataStorage } from '../storages';
import { instantiateDepthStorage } from '../storages/instantiate-depth.storage';
import { Constructible, MetadataFunction } from '../types';
import { storeMetadata } from '../utils';

export const AutoMap = (
  typeFn?: () => Function,
  depth: number = 1
): PropertyDecorator => (target, propertyKey) => {
  const getMetadata = (_target: Object, _key: typeof propertyKey) =>
    Reflect.getMetadata('design:type', _target, _key);

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
    let meta = getMetadata(target, propertyKey);
    if (meta) {
      storeMetadata(
        target.constructor as Constructible,
        meta.prototype.constructor.name,
        propertyKey as string
      );
    }
  }
};
