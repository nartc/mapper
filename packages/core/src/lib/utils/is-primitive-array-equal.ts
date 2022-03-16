export function isPrimitiveArrayEqual(
    a: (string | number | boolean)[],
    b: (string | number | boolean)[]
): boolean {
    if (a.length !== b.length) return false;
    return a.every((itemA, index) => b[index] === itemA);
}
