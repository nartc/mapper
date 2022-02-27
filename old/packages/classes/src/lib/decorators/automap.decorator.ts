import 'reflect-metadata';
import { AUTOMAP_PROPERTIES_METADATA_KEY } from '../constants';
import type { Constructible } from '../types';

export interface AutoMapOptions {
  /**
   * Type Function
   */
  typeFn?: () => Constructible;
  /**
   * Depth for nested models
   */
  depth?: number;
  /**
   * Is this property getter-only?
   */
  isGetterOnly?: boolean;
}

/**
 * AutoMap decorator to decorate fields in classes to store metadata of that field with a config object
 *
 * @param {AutoMapOptions} config
 */
export function AutoMap(config: AutoMapOptions): PropertyDecorator;
/**
 * AutoMap decorator to decorate fields in classes to store metadata.
 */
export function AutoMap(): PropertyDecorator;
export function AutoMap(
  config?: AutoMapOptions
): PropertyDecorator {
  const {
    isGetterOnly,
    typeFn,
    depth = 0
  } = config || {};
  return (target, propertyKey) => {
    const newMetadata: {
      typeFn?: () => unknown;
      isGetterOnly?: boolean;
      depth: number;
    } = { depth };

    const existingMetadataList =
      Reflect.getMetadata(
        AUTOMAP_PROPERTIES_METADATA_KEY,
        target.constructor
      ) || [];

    // Getting Type
    if (typeFn) {
      newMetadata.typeFn = typeFn;
    } else {
      const meta = Reflect.getMetadata('design:type', target, propertyKey);
      if (meta) {
        newMetadata.typeFn = () => meta;
      }
    }

    // Getting Only-getter
    if (isGetterOnly != null) {
      newMetadata.isGetterOnly = isGetterOnly;
    } else {
      // paramtypes gives information about the setter.
      // it will be null if this is not a getter
      // it will be an [] if this is an getter-only
      const paramsType = Reflect.getMetadata(
        'design:paramtypes',
        target,
        propertyKey
      );
      newMetadata.isGetterOnly = paramsType && !(paramsType as []).length;
    }

    // Only set metadata if typeFn is not null
    if (newMetadata.typeFn != null) {
      Reflect.defineMetadata(
        AUTOMAP_PROPERTIES_METADATA_KEY,
        [...existingMetadataList, [propertyKey, newMetadata]],
        target.constructor
      );
    }
  };
}
