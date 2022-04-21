import { Dictionary } from '@automapper/core';

/**
 * Creates a shallow copy of the given object that was frozen by {@link Object.freeze}
 * @param o The object to freeze
 * @return A shallow frozen copy of the given object
 */
export function createFrozenCopy<T extends Dictionary<T>>(o: T): T {
    const copy = Object.assign({}, o);
    Object.setPrototypeOf(copy, Object.getPrototypeOf(o));
    return Object.freeze(copy);
}
