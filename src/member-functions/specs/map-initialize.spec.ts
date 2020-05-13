import { TransformationType } from '../../types';
import { mapInitialize } from '../map-initialize';

describe('MapInitializeFunction', () => {
  const source = {
    foo: {
      bar: 'foo',
    },
  };

  it('should return correctly', () => {
    const mapInitFn = mapInitialize(null);
    expect(mapInitFn).toBeTruthy();
    expect(mapInitFn[0]).toBe(TransformationType.MapInitialize);
    expect(mapInitFn[1]).toBe(null);
    expect(mapInitFn[2]).toBeInstanceOf(Function);
  });

  it('should map correctly', () => {
    const mapInitFn = mapInitialize(null, 'foo.bar');
    const result = mapInitFn[2](source);
    expect(result).toBe('foo');
  });

  it('should map to undefined for default val', () => {
    const mapInitFn = mapInitialize(undefined, 'foo.baz');
    const result = mapInitFn[2](source);
    expect(result).toBe(undefined);
  });
});
