import { MapFnClassId, TransformationType } from '../../types';
import { mapInitialize } from '../map-initialize';

describe('MapInitializeFunction', () => {
  const source = {
    foo: {
      bar: 'foo',
    },
  };

  it('should return correctly', () => {
    const mapInitFn = mapInitialize(['']);
    expect(mapInitFn).toBeTruthy();
    expect(mapInitFn[MapFnClassId.type]).toEqual(
      TransformationType.MapInitialize
    );
    expect(mapInitFn[MapFnClassId.fn]).toBeInstanceOf(Function);
  });

  it('should map correctly', () => {
    const mapInitFn = mapInitialize(['foo', 'bar']);
    const result = mapInitFn[MapFnClassId.fn](source);
    expect(result).toEqual(source.foo.bar);
  });

  it('should map to undefined for default val', () => {
    const mapInitFn = mapInitialize(['foo', 'baz']);
    const result = mapInitFn[MapFnClassId.fn](source);
    expect(result).toEqual(undefined);
  });
});
