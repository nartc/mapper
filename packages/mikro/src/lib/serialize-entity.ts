import { isEmpty } from '@automapper/core';
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

export function serializeEntity(
    item: AnyEntity,
    itemMetadata: Record<string, unknown>,
    toPojo = false
) {
    if (!Utils.isEntity(item)) return item;
    if (toPojo) return wrap(item).toPOJO();

    const result = {} as Record<string | symbol, unknown>;
    for (const key of Reflect.ownKeys(item)) {
        if (typeof key === 'symbol' || excluded.includes(key)) {
            continue;
        }

        const value = item[key];
        if (Utils.isCollection(value)) {
            result[key] = (value.getSnapshot() || []).map((snapshot) => {
                return serializeEntity(
                    snapshot as AnyEntity,
                    itemMetadata[key] as Record<string, unknown>,
                    true
                );
            });
        } else {
            if (Reference.isReference(value)) {
                if (
                    typeof itemMetadata[key] === 'object' &&
                    !isEmpty(itemMetadata[key])
                ) {
                    result[key] = serializeEntity(
                        value.getEntity(),
                        itemMetadata[key] as Record<string, unknown>
                    );
                }
            }

            result[key] = serializeEntity(
                Reference.isReference(value) ? value.getEntity() : value,
                itemMetadata[key] as Record<string, unknown>,
                typeof itemMetadata[key] === 'object' &&
                    isEmpty(itemMetadata[key])
            );
        }
    }

    if (result['id'] == null && item['id'] != null) {
        result['id'] = item['id'];
    }

    return result;
}
