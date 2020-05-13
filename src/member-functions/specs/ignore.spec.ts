import { TransformationType } from '../../types';
import { ignore } from '../ignore';

describe('IgnoreFunction', () => {
  it('should return correctly', () => {
    const ignoreFn = ignore();
    expect(ignoreFn).toBeTruthy();
    expect(ignoreFn[0]).toBe(TransformationType.Ignore);
    expect(ignoreFn[1]).toBe(null);
    expect(ignoreFn[2]).toBeInstanceOf(Function);
  });

  it('should return undefined when called', () => {
    const ignoreFn = ignore();
    expect(ignoreFn[2]()).toBe(undefined);
  });
});
