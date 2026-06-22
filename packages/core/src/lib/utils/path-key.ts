/**
 * Serialize a member path (e.g. `['address', 'street']`) into a single string
 * usable as a `Set`/`Map` key. The `\0` separator is collision-proof for string
 * property segments, so `pathKey(a) === pathKey(b)` is equivalent to comparing
 * the arrays element-by-element (see `isSamePath` / `isPrimitiveArrayEqual`).
 *
 * Used by the compile-time path (createMap) to index/dedupe paths in O(1)
 * instead of repeated linear array-equality scans.
 */
export function pathKey(path: readonly string[]): string {
    return path.join('\0');
}
