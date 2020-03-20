import { metadataManager } from '../metadata-explorer';
import { Constructible, MetadataFunction } from '../types';

export const AutoMap = (typeFn?: () => Function): PropertyDecorator => (
  target,
  propertyKey
) => {
  if (typeFn) {
    metadataManager.addMetadata(target.constructor as Constructible, [
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
          metadataManager.addMetadata(target.constructor as Constructible, [
            [propertyKey, () => false],
          ]);
          break;
        case 'Date':
          metadataManager.addMetadata(target.constructor as Constructible, [
            [propertyKey, () => Date],
          ]);
          break;
        case 'Array':
          metadataManager.addMetadata(target.constructor as Constructible, [
            [propertyKey, () => []],
          ]);
          break;
      }
    }
  }
};
