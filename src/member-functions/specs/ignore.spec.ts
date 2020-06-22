import { MemberMapFunctionId, TransformationType } from '../../types';
import { ignore } from '../ignore';

describe('IgnoreFunction', () => {
  it('should return correctly', () => {
    const ignoreFn = ignore();
    expect(ignoreFn).toBeTruthy();
    expect(ignoreFn[MemberMapFunctionId.type]).toBe(TransformationType.Ignore);
    expect(ignoreFn[MemberMapFunctionId.misc]).toBe(null);
    expect(ignoreFn[MemberMapFunctionId.fn]).toBeInstanceOf(Function);
  });

  it('should return undefined when called', () => {
    const ignoreFn = ignore();
    expect(ignoreFn[MemberMapFunctionId.fn]()).toBe(undefined);
  });
});
