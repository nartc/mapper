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
 * deprecated - AutoMap decorator to decorate fields in classes to store metadata of that field.
 *
 * @param {() => Constructible} [typeFn] - if this is a nested model, it should have a `typeFn`
 * @param {number} [depth = 0] - how deep should this model gets instantiated
 *
 * @deprecated
 * @see Use {@link AutoMapOptions} instead
 */
export function AutoMap(
  typeFn: () => Constructible,
  depth?: number
): PropertyDecorator;
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
  typeFnOrConfig?: AutoMapOptions | (() => Constructible),
  depth = 0
): PropertyDecorator {
  const {
    isGetterOnly,
    typeFn,
    depth: _depth = 0,
  } = getConfig(typeFnOrConfig, depth);
  return (target, propertyKey) => {
    const newMetadata: {
      typeFn?: () => unknown;
      isGetterOnly?: boolean;
      depth: number;
    } = { depth: _depth };

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

function getConfig(
  typeFnOrConfig?: AutoMapOptions | (() => Constructible),
  depth?: number
): AutoMapOptions {
  if (typeof typeFnOrConfig === 'function') {
    return { typeFn: typeFnOrConfig, depth: depth || 0 };
  }

  return typeFnOrConfig || {};
}
