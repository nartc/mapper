import { set, setMutate } from '../set';

describe('set', () => {
    it('should set nested property', () => {
        const result = set({ foo: { bar: 'foo' } }, ['foo', 'bar'], 'baz');
        expect(result).toEqual({ foo: { bar: 'baz' } });
    });

    it('should set obj', () => {
        const result = set({ foo: { bar: 'foo' } }, ['foo'], { baz: 'foo' });
        expect(result).toEqual({ foo: { baz: 'foo' } });
    });

    it('should add property to obj at unknown path', () => {
        let result = set({ foo: { bar: 'foo' } }, ['bar'], 'foo');
        expect(result).toEqual({ foo: { bar: 'foo' }, bar: 'foo' });

        result = set({ foo: { bar: 'foo' } }, ['foo', 'baz'], 'baz');
        expect(result).toEqual({ foo: { bar: 'foo', baz: 'baz' } });
    });

    it('should add property to obj for empty and trailing dot paths', () => {
        let result = set({}, [''], 'foo');
        expect(result).toEqual({ '': 'foo' });

        result = set({}, ['foo', ''], 'bar');
        expect(result).toEqual({ foo: { '': 'bar' } });

        result = set({ foo: {} }, ['foo', ''], 'bar');
        expect(result).toEqual({ foo: { '': 'bar' } });
    });

    it('should add property to obj at path contains dot', () => {
        let result = set({}, ['.startDot'], 'foo');
        expect(result).toEqual({ ['.startDot']: 'foo' });

        result = set({}, ['mid.Dot', '.startDot'], 'bar');
        expect(result).toEqual({ ['mid.Dot']: { ['.startDot']: 'bar' } });

        result = set({ ['endDot.']: {} }, ['endDot.', ''], 'bar');
        expect(result).toEqual({ ['endDot.']: { '': 'bar' } });
    });
});

describe('setMutate', () => {
    let obj: Record<string, unknown>;

    beforeEach(() => {
        obj = { foo: { bar: 'foo' } };
    });

    it('should set nested property', () => {
        setMutate(obj, ['foo', 'bar'], 'baz');
        expect(obj).toEqual({ foo: { bar: 'baz' } });
    });

    it('should set obj', () => {
        setMutate(obj, ['foo'], { baz: 'foo' });
        expect(obj).toEqual({ foo: { baz: 'foo' } });
    });

    it('should add property to obj at unknown path', () => {
        setMutate(obj, ['bar'], 'foo');
        expect(obj).toEqual({ foo: { bar: 'foo' }, bar: 'foo' });

        setMutate(obj, ['foo', 'baz'], 'baz');
        expect(obj).toEqual({ foo: { bar: 'foo', baz: 'baz' }, bar: 'foo' });
    });

    it('should add property to obj at path contains dot', () => {
        setMutate(obj, ['.startDot'], 'foo');
        expect(obj).toEqual({ foo: { bar: 'foo' }, ['.startDot']: 'foo' });

        setMutate(obj, ['foo', 'mid.Dot', '.startDot'], 'bar');
        expect(obj).toEqual({
            foo: { bar: 'foo', ['mid.Dot']: { ['.startDot']: 'bar' } },
            ['.startDot']: 'foo',
        });

        setMutate(obj, ['foo', 'endDot.', ''], 'bar');
        expect(obj).toEqual({
            foo: {
                bar: 'foo',
                ['mid.Dot']: { ['.startDot']: 'bar' },
                ['endDot.']: { ['']: 'bar' },
            },
            ['.startDot']: 'foo',
        });
    });
});
