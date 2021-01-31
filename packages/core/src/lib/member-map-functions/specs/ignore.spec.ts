import { ignore } from '@automapper/core';
import { MapFnClassId, TransformationType } from '@automapper/types';

describe('IgnoreFunction', () => {
  it('should return correctly', () => {
    const ignoreFn = ignore();
    expect(ignoreFn).toBeTruthy();
    expect(ignoreFn[MapFnClassId.type]).toEqual(TransformationType.Ignore);
  });
});
