import type { AnyEntity } from '@mikro-orm/core';
import { Reference, Utils, wrap } from '@mikro-orm/core';

const excluded = [
    '__gettersDefined',
    '__entity',
    '__meta',
    '__platform',
    '__helper',
    '__factory',
];

export function serializeEntity(item: AnyEntity, fromCollection = false) {
    if (!Utils.isEntity(item)) return item;
    if (fromCollection) return wrap(item).toPOJO();

    const result = {} as Record<string | symbol, unknown>;
    for (const key of Reflect.ownKeys(item)) {
        if (typeof key === 'symbol' || excluded.includes(key)) {
            continue;
        }

        const value = item[key as string];
        if (Utils.isCollection(value)) {
            result[key] = (value.getSnapshot() || []).map((snapshot) => {
                return serializeEntity(snapshot as AnyEntity, true);
            });
        } else {
            result[key] = serializeEntity(
                Reference.isReference(value) ? value.getEntity() : value
            );
        }
    }

    if (result['id'] == null && item['id'] != null) {
        result['id'] = item['id'];
    }

    return result;
}
