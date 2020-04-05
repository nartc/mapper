import {
  MemberMapFunctionReturnClassId,
  TransformationType,
} from '../../types';
import { nullSubstitution } from '../null-substitution';

describe('NullSubstitutionFunction', () => {
  it('should return correctly', () => {
    const nullSubFn = nullSubstitution('');
    expect(nullSubFn).toBeTruthy();
    expect(nullSubFn[MemberMapFunctionReturnClassId.type]).toBe(
      TransformationType.NullSubstitution
    );
    expect(nullSubFn[MemberMapFunctionReturnClassId.misc]).toBe(null);
    expect(nullSubFn[MemberMapFunctionReturnClassId.fn]).toBeInstanceOf(
      Function
    );
  });

  it('should return source if source is not null', () => {
    const nullSubFn = nullSubstitution('subbed');
    const result = nullSubFn[MemberMapFunctionReturnClassId.fn](
      { foo: 'bar' },
      'foo'
    );
    expect(result).toBe('bar');
    expect(result).not.toBe('subbed');
  });

  it('should return subbed if source is null', () => {
    const nullSubFn = nullSubstitution('subbed');
    const result = nullSubFn[MemberMapFunctionReturnClassId.fn](
      { foo: null },
      'foo'
    );
    expect(result).toBe('subbed');
    expect(result).not.toBe(null);
  });
});
