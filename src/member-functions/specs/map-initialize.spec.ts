import { MemberMapFunctionId, TransformationType } from '../../types';
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
    expect(mapInitFn[MemberMapFunctionId.type]).toBe(
      TransformationType.MapInitialize
    );
    expect(mapInitFn[MemberMapFunctionId.misc]).toBe(null);
    expect(mapInitFn[MemberMapFunctionId.fn]).toBeInstanceOf(Function);
  });

  it('should map correctly', () => {
    const mapInitFn = mapInitialize(null, 'foo.bar');
    const result = mapInitFn[MemberMapFunctionId.fn](source);
    expect(result).toBe('foo');
  });

  it('should map to undefined for default val', () => {
    const mapInitFn = mapInitialize(undefined, 'foo.baz');
    const result = mapInitFn[MemberMapFunctionId.fn](source);
    expect(result).toBe(undefined);
  });
});
