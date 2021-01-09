import { set } from '../set.util';

describe('set', () => {
  it('should set nested property', () => {
    const result = set({ foo: { bar: 'foo' } }, 'foo.bar', 'baz');
    expect(result).toEqual({ foo: { bar: 'baz' } });
  });

  it('should set obj', () => {
    const result = set({ foo: { bar: 'foo' } }, 'foo', { baz: 'foo' });
    expect(result).toEqual({ foo: { baz: 'foo' } });
  });

  it('should add property to obj at unknown path', () => {
    let result = set({ foo: { bar: 'foo' } }, 'bar', 'foo');
    expect(result).toEqual({ foo: { bar: 'foo' }, bar: 'foo' });

    result = set({ foo: { bar: 'foo' } }, 'foo.baz', 'baz');
    expect(result).toEqual({ foo: { bar: 'foo', baz: 'baz' } });
  });
});

describe('setMutate', () => {
  let obj: unknown;

  beforeEach(() => {
    obj = { foo: { bar: 'foo' } };
  });

  it('should set nested property', () => {
    set(obj, 'foo.bar', 'baz');
    expect(obj).toEqual({ foo: { bar: 'baz' } });
  });

  it('should set obj', () => {
    set(obj, 'foo', { baz: 'foo' });
    expect(obj).toEqual({ foo: { baz: 'foo' } });
  });

  it('should add property to obj at unknown path', () => {
    set(obj, 'bar', 'foo');
    expect(obj).toEqual({ foo: { bar: 'foo' }, bar: 'foo' });

    set(obj, 'foo.baz', 'baz');
    expect(obj).toEqual({ foo: { bar: 'foo', baz: 'baz' }, bar: 'foo' });
  });
});
