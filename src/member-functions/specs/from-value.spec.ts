import {
  MemberMapFunctionReturnClassId,
  TransformationType,
} from '../../types';
import { fromValue } from '../from-value';

describe('FromValueFunction', () => {
  it('should return correctly', () => {
    const fromValueFunction = fromValue(10);
    expect(fromValueFunction).toBeTruthy();
    expect(fromValueFunction[MemberMapFunctionReturnClassId.type]).toBe(
      TransformationType.FromValue
    );
    expect(fromValueFunction[MemberMapFunctionReturnClassId.misc]).toBe(null);
    expect(fromValueFunction[MemberMapFunctionReturnClassId.fn]).toBeInstanceOf(
      Function
    );
  });

  it('should map correctly', () => {
    const fromValueFunction = fromValue(10);
    const result = fromValueFunction[MemberMapFunctionReturnClassId.fn]();
    expect(result).toBe(10);
  });
});
