import { MemberMapFunctionId, TransformationType } from '../../types';
import { nullSubstitution } from '../null-substitution';

describe('NullSubstitutionFunction', () => {
  it('should return correctly', () => {
    const nullSubFn = nullSubstitution('');
    expect(nullSubFn).toBeTruthy();
    expect(nullSubFn[MemberMapFunctionId.type]).toBe(
      TransformationType.NullSubstitution
    );
    expect(nullSubFn[MemberMapFunctionId.misc]).toBe(null);
    expect(nullSubFn[MemberMapFunctionId.fn]).toBeInstanceOf(Function);
  });

  it('should return source if source is not null', () => {
    const nullSubFn = nullSubstitution('subbed');
    const result = nullSubFn[MemberMapFunctionId.fn]({ foo: 'bar' }, 'foo');
    expect(result).toBe('bar');
    expect(result).not.toBe('subbed');
  });

  it('should return subbed if source is null', () => {
    const nullSubFn = nullSubstitution('subbed');
    const result = nullSubFn[MemberMapFunctionId.fn]({ foo: null }, 'foo');
    expect(result).toBe('subbed');
    expect(result).not.toBe(null);
  });
});
