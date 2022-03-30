export function isEmpty(value: unknown): boolean {
    if (Array.isArray(value)) {
        return !value.length;
    }

    if (typeof value !== 'object' && typeof value !== 'function') {
        return !value;
    }

    return !Object.keys(value as object).length;
}
