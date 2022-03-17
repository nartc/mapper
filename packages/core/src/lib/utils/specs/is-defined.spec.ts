import { isDefined } from '../is-defined';

describe('isDefined', () => {
    it('should return properly', () => {
        expect(isDefined(null)).toEqual(false);
        expect(isDefined(null, true)).toEqual(true);
        expect(isDefined(undefined)).toEqual(false);
        expect(isDefined('foo')).toEqual(true);
        expect(isDefined(String)).toEqual(true);
        expect(isDefined([])).toEqual(true);
        expect(isDefined({})).toEqual(true);
        expect(isDefined(0)).toEqual(true);
        expect(isDefined('')).toEqual(true);
    });
});
