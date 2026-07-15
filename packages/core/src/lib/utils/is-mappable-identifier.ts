import { isDateConstructor } from './is-date-constructor';
import { isPrimitiveConstructor } from './is-primitive-constructor';

// Result is constant per identifier but was recomputed (4 predicate calls) per
// member per mapped object — i.e. per element in mapArray. Memoize it.
const cache = new Map<unknown, boolean>();

/**
 * True when the identifier is a "real" model identifier (not a primitive or Date
 * constructor) — i.e. a candidate for nested (member) mapping.
 */
export function isMappableIdentifier(identifier: unknown): boolean {
    let result = cache.get(identifier);
    if (result === undefined) {
        result =
            !isPrimitiveConstructor(identifier) &&
            !isDateConstructor(identifier);
        cache.set(identifier, result);
    }
    return result;
}
