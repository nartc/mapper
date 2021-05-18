import { MapFnClassId, TransformationType } from '@automapper/types';
import { ignore } from '../ignore';

describe('IgnoreFunction', () => {
  it('should return correctly', () => {
    const ignoreFn = ignore();
    expect(ignoreFn).toBeTruthy();
    expect(ignoreFn[MapFnClassId.type]).toEqual(TransformationType.Ignore);
  });
});
