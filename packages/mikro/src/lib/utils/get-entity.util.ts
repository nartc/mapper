import { Reference, Utils } from '@mikro-orm/core';
import { serializeEntity } from './serialize-entity.util';

export function getEntity<TValue = any>(value: TValue): TValue {
  if (Utils.isEntity(value)) {
    return serializeEntity(value) as TValue;
  }

  if (Reference.isReference(value)) {
    return serializeEntity(value.getEntity()) as TValue;
  }

  return value;
}
