import { AUTOMAP_PROPERTIES_METADATA_KEY } from '../constants';
import type { Constructible } from '../types';

/**
 * AutoMap decorator to decorate fields in classes to store metadata of that field
 *
 * @param {() => Constructible} [typeFn] - if this is a nested model, it should have a `typeFn`
 * @param {number} [depth = 0] - how deep should this model gets instantiated
 */
export const AutoMap = (
  typeFn?: () => Constructible,
  depth = 0
): PropertyDecorator => (target, propertyKey) => {
  // get existing metadata
  const existingMetadataList =
    Reflect.getMetadata(AUTOMAP_PROPERTIES_METADATA_KEY, target.constructor) ||
    [];

  // If `typeFn` is provided, classes plugin does not have to guess with Reflect and just `defineMetadata`
  if (typeFn) {
    Reflect.defineMetadata(
      AUTOMAP_PROPERTIES_METADATA_KEY,
      [...existingMetadataList, [propertyKey, { typeFn, depth }]],
      target.constructor
    );
  } else {
    const meta = Reflect.getMetadata('design:type', target, propertyKey);
    if (meta) {
      Reflect.defineMetadata(
        AUTOMAP_PROPERTIES_METADATA_KEY,
        [...existingMetadataList, [propertyKey, { typeFn: () => meta }]],
        target.constructor
      );
    }
  }
};
