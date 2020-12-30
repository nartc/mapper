import { mapInitialize } from '@automapper/core';
import { MapFnClassId, TransformationType } from '@automapper/types';

describe('MapInitializeFunction', () => {
  const source = {
    foo: {
      bar: 'foo',
    },
  };

  it('should return correctly', () => {
    const mapInitFn = mapInitialize(null);
    expect(mapInitFn).toBeTruthy();
    expect(mapInitFn[MapFnClassId.type]).toEqual(
      TransformationType.MapInitialize
    );
    expect(mapInitFn[MapFnClassId.misc]).toEqual(null);
    expect(mapInitFn[MapFnClassId.fn]).toBeInstanceOf(Function);
  });

  it('should map correctly', () => {
    const mapInitFn = mapInitialize('foo.bar');
    const result = mapInitFn[MapFnClassId.fn](source);
    expect(result).toEqual(source.foo.bar);
  });

  it('should map to undefined for default val', () => {
    const mapInitFn = mapInitialize('foo.baz');
    const result = mapInitFn[MapFnClassId.fn](source);
    expect(result).toEqual(undefined);
  });
});
