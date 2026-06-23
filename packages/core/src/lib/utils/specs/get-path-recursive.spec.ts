import { getPathRecursive } from '../get-path-recursive';

describe('getPathRecursive', () => {
    // Diamond shape: a nested object shared under two keys (a, b), an array of
    // differing-shape objects, and a scalar. Pins byte-identical, order-identical
    // output so this cleanup (drop the redundant own-name Set dedup; module
    // Set for EXCLUDE_KEYS) is provably behavior-preserving — cross-node dedup is
    // done by uniquePaths(), which this cleanup leaves untouched.
    it('produces stable, deduped paths for a diamond shape', () => {
        const shared = { id: 1 };
        const node: Record<string, unknown> = {
            a: shared,
            b: shared,
            items: [{ name: 'x' }, { value: 2 }],
            scalar: 5,
        };

        expect(getPathRecursive(node)).toEqual([
            ['a'],
            ['a', 'id'],
            ['b'],
            ['b', 'id'],
            ['items'],
            ['items', 'name'],
            ['items', 'value'],
            ['scalar'],
        ]);
    });

    it('skips function members and prototype/built-in keys', () => {
        const node: Record<string, unknown> = {
            keep: 1,
            fn: () => 0,
        };
        expect(getPathRecursive(node)).toEqual([['keep']]);
    });
});
