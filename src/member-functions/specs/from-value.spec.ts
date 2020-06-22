import { MemberMapFunctionId, TransformationType } from '../../types';
import { fromValue } from '../from-value';

describe('FromValueFunction', () => {
  it('should return correctly', () => {
    const fromValueFunction = fromValue(10);
    expect(fromValueFunction).toBeTruthy();
    expect(fromValueFunction[MemberMapFunctionId.type]).toBe(
      TransformationType.FromValue
    );
    expect(fromValueFunction[MemberMapFunctionId.misc]).toBe(null);
    expect(fromValueFunction[MemberMapFunctionId.fn]).toBeInstanceOf(Function);
  });

  it('should map correctly', () => {
    const fromValueFunction = fromValue(10);
    const result = fromValueFunction[MemberMapFunctionId.fn]();
    expect(result).toBe(10);
  });
});
