import {
  MemberMapFunctionReturnClassId,
  TransformationType,
} from '../../types';
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
    expect(mapInitFn[MemberMapFunctionReturnClassId.type]).toBe(
      TransformationType.MapInitialize
    );
    expect(mapInitFn[MemberMapFunctionReturnClassId.misc]).toBe(null);
    expect(mapInitFn[MemberMapFunctionReturnClassId.fn]).toBeInstanceOf(
      Function
    );
  });

  it('should map correctly', () => {
    const mapInitFn = mapInitialize(null, 'foo.bar');
    const result = mapInitFn[MemberMapFunctionReturnClassId.fn](source);
    expect(result).toBe('foo');
  });

  it('should map to undefined for default val', () => {
    const mapInitFn = mapInitialize(undefined, 'foo.baz');
    const result = mapInitFn[MemberMapFunctionReturnClassId.fn](source);
    expect(result).toBe(undefined);
  });
});
