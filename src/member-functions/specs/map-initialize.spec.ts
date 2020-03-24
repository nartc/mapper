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
    const mapInitFn = mapInitialize();
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
    const mapInitFn = mapInitialize('foo.bar');
    const result = mapInitFn[MemberMapFunctionReturnClassId.fn](source);
    expect(result).toBe('foo');
  });
});
