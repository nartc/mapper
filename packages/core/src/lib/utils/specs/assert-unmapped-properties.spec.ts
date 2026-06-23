import {
    assertUnmappedProperties,
    computeUnmappedCandidateKeys,
} from '../assert-unmapped-properties';
import type { ErrorHandler } from '../../types';

// A destination-metadata object as the strategies build it: enumerable data
// properties are writable members; a non-writable value and an accessor must be
// ignored (they are not assignable destination members).
function makeMetadata(): Record<string, unknown> {
    const meta: Record<string, unknown> = {};
    Object.defineProperties(meta, {
        firstName: { value: undefined, writable: true, enumerable: true },
        lastName: { value: undefined, writable: true, enumerable: true },
        fullName: { value: undefined, writable: true, enumerable: true },
        age: { value: undefined, writable: true, enumerable: true },
        id: { value: 1, writable: false, enumerable: true }, // non-writable
        computed: { get: () => 1, enumerable: true }, // accessor (getter-only)
    });
    return meta;
}

const srcId = Symbol.for('UnmappedSrc');
const destId = Symbol.for('UnmappedDest');

function recordingHandler(): ErrorHandler & { messages: unknown[] } {
    const messages: unknown[] = [];
    return { messages, handle: (e: unknown) => messages.push(e) };
}

describe('computeUnmappedCandidateKeys', () => {
    it('returns writable metadata keys that are not configured, in metadata order', () => {
        const meta = makeMetadata();
        expect(
            computeUnmappedCandidateKeys(meta, ['firstName', 'fullName'])
        ).toEqual(['lastName', 'age']);
    });

    it('excludes non-writable and accessor (getter-only) metadata keys', () => {
        const meta = makeMetadata();
        const result = computeUnmappedCandidateKeys(meta, []);
        expect(result).toEqual(['firstName', 'lastName', 'fullName', 'age']);
        expect(result).not.toContain('id');
        expect(result).not.toContain('computed');
    });

    it('ignores configured keys that are not present in the metadata', () => {
        const meta = makeMetadata();
        expect(
            computeUnmappedCandidateKeys(meta, [
                'notThere',
                'firstName',
                'lastName',
                'fullName',
                'age',
            ])
        ).toEqual([]);
    });

    it('recomputes per call: same metadata object, different configured sets => different residuals (not cached per metadata)', () => {
        const meta = makeMetadata();
        expect(computeUnmappedCandidateKeys(meta, ['firstName'])).toEqual([
            'lastName',
            'fullName',
            'age',
        ]);
        // SAME metadata object — a residual cached on the metadata alone would be
        // unsound, since another mapping to the same destination has its own
        // configured keys.
        expect(
            computeUnmappedCandidateKeys(meta, [
                'firstName',
                'lastName',
                'fullName',
                'age',
            ])
        ).toEqual([]);
    });
});

describe('assertUnmappedProperties (precomputed candidates)', () => {
    it('reports candidate keys that are absent and undefined on the destination', () => {
        const h = recordingHandler();
        assertUnmappedProperties({}, ['lastName', 'age'], srcId, destId, h);
        expect(h.messages).toHaveLength(1);
        expect(String(h.messages[0])).toContain('lastName');
        expect(String(h.messages[0])).toContain('age');
    });

    it('does not report a candidate that was assigned a value', () => {
        const h = recordingHandler();
        assertUnmappedProperties(
            { lastName: 'x' },
            ['lastName', 'age'],
            srcId,
            destId,
            h
        );
        expect(h.messages).toHaveLength(1);
        const msg = String(h.messages[0]);
        expect(msg).toContain('age');
        expect(msg).not.toContain('lastName');
    });

    it('does not report a candidate present on the destination even if its value is undefined', () => {
        const h = recordingHandler();
        // key present (own) though undefined -> `!(key in dest)` is false -> skip
        assertUnmappedProperties({ age: undefined }, ['age'], srcId, destId, h);
        expect(h.messages).toHaveLength(0);
    });

    it('does not report a candidate inherited via the prototype chain', () => {
        const h = recordingHandler();
        const dest = Object.create({ age: 1 }); // `'age' in dest` === true (inherited)
        assertUnmappedProperties(dest, ['age'], srcId, destId, h);
        expect(h.messages).toHaveLength(0);
    });

    it('does not invoke the error handler when there are no candidate keys', () => {
        const h = recordingHandler();
        assertUnmappedProperties({}, [], srcId, destId, h);
        expect(h.messages).toHaveLength(0);
    });

    it('does not invoke the error handler when all candidates are populated', () => {
        const h = recordingHandler();
        assertUnmappedProperties(
            { lastName: 'x', age: 3 },
            ['lastName', 'age'],
            srcId,
            destId,
            h
        );
        expect(h.messages).toHaveLength(0);
    });
});
