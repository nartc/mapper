import { AnyEntity, Reference, Utils, wrap } from '@mikro-orm/core';

export function getEntity<TValue = any>(value: TValue): TValue {
  if (Utils.isEntity(value)) {
    return wrap(value as AnyEntity).toJSON() as TValue;
  }

  if (Reference.isReference(value)) {
    return wrap(value.getEntity()).toJSON() as TValue;
  }

  return value;
}
