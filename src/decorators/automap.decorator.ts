import { metadataStorage } from '../storages';
import { Constructible, MetadataFunction } from '../types';
import { storeMetadata } from '../utils';

export const AutoMap = (typeFn?: () => Function): PropertyDecorator => (
  target,
  propertyKey
) => {
  if (typeFn) {
    metadataStorage.addMetadata(target.constructor as Constructible, [
      [propertyKey, typeFn as MetadataFunction],
    ]);
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
