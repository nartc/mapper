import {
  MemberMapFunctionReturnClassId,
  TransformationType,
} from '../../types';
import { ignore } from '../ignore';
import { mapDefer } from '../map-defer';

describe('MapDeferFunction', () => {
  it('should return correctly', () => {
    const defer = () => ignore();
    const fn = mapDefer(defer);
    expect(fn).toBeTruthy();
    expect(fn[MemberMapFunctionReturnClassId.type]).toEqual(
      TransformationType.MapDefer
    );
    expect(fn[MemberMapFunctionReturnClassId.misc]).toEqual(null);
    expect(fn[MemberMapFunctionReturnClassId.fn]).toEqual(defer);
  });
});
