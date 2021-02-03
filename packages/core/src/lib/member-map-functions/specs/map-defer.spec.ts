import { ignore, mapDefer } from '@automapper/core';
import { MapFnClassId, TransformationType } from '@automapper/types';

describe('MapDeferFunction', () => {
  it('should return correctly', () => {
    const defer = () => ignore();

    const mapDeferFn = mapDefer(defer);

    expect(mapDeferFn).toBeTruthy();
    expect(mapDeferFn[MapFnClassId.type]).toEqual(TransformationType.MapDefer);
    expect(mapDeferFn[MapFnClassId.fn]).toBe(defer);
  });
});
