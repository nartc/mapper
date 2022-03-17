import { isPrimitiveArrayEqual } from '../is-primitive-array-equal';

describe('isPrimitiveArrayEqual', () => {
    it('should return correctly', () => {
        expect(isPrimitiveArrayEqual(['a'], ['a'])).toEqual(true);
        expect(isPrimitiveArrayEqual(['a'], ['a', 'b'])).toEqual(false);
        expect(isPrimitiveArrayEqual(['a', 'b'], ['a', 'b'])).toEqual(true);
        expect(isPrimitiveArrayEqual(['b', 'a'], ['a', 'b'])).toEqual(false);
        expect(isPrimitiveArrayEqual([1, 2, 3], [1, 2, 3])).toEqual(true);
    });
});
