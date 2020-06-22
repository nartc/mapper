import { MemberMapFunctionId, TransformationType } from '../../types';
import { ignore } from '../ignore';
import { mapDefer } from '../map-defer';

describe('MapDeferFunction', () => {
  it('should return correctly', () => {
    const defer = () => ignore();
    const fn = mapDefer(defer);
    expect(fn).toBeTruthy();
    expect(fn[MemberMapFunctionId.type]).toEqual(TransformationType.MapDefer);
    expect(fn[MemberMapFunctionId.misc]).toEqual(null);
    expect(fn[MemberMapFunctionId.fn]).toEqual(defer);
  });
});
