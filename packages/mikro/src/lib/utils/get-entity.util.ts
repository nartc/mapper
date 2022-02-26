import { isEntity } from './is-entity.util';
import { isReference } from './is-reference.util';
import { serializeEntity } from './serialize-entity.util';

export function getEntity<TValue = any>(value: TValue): TValue {
  if (isEntity(value)) {
    return serializeEntity(value) as TValue;
  }

  if (isReference(value)) {
    return serializeEntity(value.getEntity()) as TValue;
  }

  return value;
}
