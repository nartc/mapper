import { metadataStorage } from '../storages';
import { Constructible, MetadataFunction } from '../types';

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
      switch (reflectedMetadata.prototype.constructor.name) {
        case 'String':
        case 'Number':
        case 'Boolean':
        default:
          metadataStorage.addMetadata(target.constructor as Constructible, [
            [propertyKey, () => false],
          ]);
          break;
        case 'Date':
          metadataStorage.addMetadata(target.constructor as Constructible, [
            [propertyKey, () => Date],
          ]);
          break;
        case 'Array':
          metadataStorage.addMetadata(target.constructor as Constructible, [
            [propertyKey, () => []],
          ]);
          break;
      }
    }
  }
};
