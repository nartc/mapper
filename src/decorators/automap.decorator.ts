import { metadataManager } from '../metadata-explorer';
import { MetadataFunction } from '../types';

export const AutoMap = (typeFn?: () => Function): PropertyDecorator => (
  target: any,
  propertyKey
) => {
  if (typeFn) {
    metadataManager.addMetadata(target, [
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
          metadataManager.addMetadata(target, [[propertyKey, () => false]]);
          break;
        case 'Date':
          metadataManager.addMetadata(target, [[propertyKey, () => Date]]);
          break;
        case 'Array':
          metadataManager.addMetadata(target, [[propertyKey, () => []]]);
          break;
      }
    }
  }
};
