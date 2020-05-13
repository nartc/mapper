import { TransformationType } from '../../types';
import { ignore } from '../ignore';
import { mapDefer } from '../map-defer';

describe('MapDeferFunction', () => {
  it('should return correctly', () => {
    const defer = () => ignore();
    const fn = mapDefer(defer);
    expect(fn).toBeTruthy();
    expect(fn[0]).toEqual(TransformationType.MapDefer);
    expect(fn[1]).toEqual(null);
    expect(fn[2]).toEqual(defer);
  });
});
