/**
 * Check if value is a Date constructor
 *
 * @param {Function} value
 */
export function isDateConstructor(value: unknown): boolean {
    // guard: Object.getPrototypeOf(null|undefined) throws. Reachable from
    // @automapper/classes get-metadata-list when a user type factory returns
    // nullish/[] (isDateConstructor is called before the primitive check there).
    if (value == null) return false;
    return Object.getPrototypeOf(value) === Date || value === Date;
}
