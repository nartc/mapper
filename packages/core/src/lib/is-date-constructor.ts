/**
 * Check if value is a Date constructor
 *
 * @param {Function} value
 */
export function isDateConstructor(value: unknown): boolean {
    return Object.getPrototypeOf(value) === Date || value === Date;
}
