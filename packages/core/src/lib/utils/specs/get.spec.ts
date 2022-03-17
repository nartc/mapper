import { get } from '../get';

describe('get', () => {
    const obj = {
        foo: { bar: 'bar' },
        ['.startDot']: { ['mid.Dot']: { ['endDot.']: 'custom' } },
    };

    it('should return bar', () => {
        const result = get(obj, ['foo', 'bar']);
        expect(result).toEqual('bar');
    });

    it('should handle dotted path', () => {
        const result = get(obj, ['.startDot', 'mid.Dot', 'endDot.']);
        expect(result).toEqual('custom');
    });

    it('should return null', () => {
        const result = get({ foo: { bar: null } }, ['foo', 'bar']);
        expect(result).toEqual(null);
    });

    it('should return undefined for unknown path', () => {
        const result = get(obj, ['foo', 'baz']);
        expect(result).toEqual(undefined);
    });

    it('should return object', () => {
        const result = get(obj, ['foo']);
        expect(result).toEqual({ bar: 'bar' });
    });

    it('should return undefined if paths are not provided', () => {
        const result = get(obj);
        expect(result).toEqual(undefined);
    });
});
