import { AnyEntity } from '@mikro-orm/core';
import { isCollection } from './is-collection.util';
import { isEntity } from './is-entity.util';
import { isReference } from './is-reference.util';

const excluded = [
  '__gettersDefined',
  '__entity',
  '__meta',
  '__platform',
  '__helper',
  '__factory',
];

export function serializeEntity(item: AnyEntity) {
  const result = {} as Record<string | symbol, unknown>;
  for (const key of Reflect.ownKeys(item)) {
    if (typeof key === 'symbol' || excluded.includes(key)) {
      continue;
    }

    const value = item[key as string];
    if (isCollection(value)) {
      result[key] = value.getSnapshot() || [];
    } else if (isEntity(value)) {
      result[key] = serializeEntity(value);
    } else if (isReference(value)) {
      result[key] = serializeEntity(value.getEntity());
    } else {
      result[key] = value;
    }
  }

  if (result['id'] == null && item['id'] != null) {
    result['id'] = item['id'];
  }

  return result;
}
