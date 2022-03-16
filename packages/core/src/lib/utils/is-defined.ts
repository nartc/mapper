export function isDefined(value: unknown, strict = false): boolean {
    return strict ? value !== undefined : value != null;
}
