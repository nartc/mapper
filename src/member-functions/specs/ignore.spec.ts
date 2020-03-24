import {
  MemberMapFunctionReturnClassId,
  TransformationType,
} from '../../types';
import { ignore } from '../ignore';

describe('IgnoreFunction', () => {
  it('should return correctly', () => {
    const ignoreFn = ignore();
    expect(ignoreFn).toBeTruthy();
    expect(ignoreFn[MemberMapFunctionReturnClassId.type]).toBe(
      TransformationType.Ignore
    );
    expect(ignoreFn[MemberMapFunctionReturnClassId.misc]).toBe(null);
    expect(ignoreFn[MemberMapFunctionReturnClassId.fn]).toBeInstanceOf(
      Function
    );
  });

  it('should return undefined when called', () => {
    const ignoreFn = ignore();
    expect(ignoreFn[MemberMapFunctionReturnClassId.fn]()).toBe(undefined);
  });
});
