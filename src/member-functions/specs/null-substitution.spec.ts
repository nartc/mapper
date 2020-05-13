import { TransformationType } from '../../types';
import { nullSubstitution } from '../null-substitution';

describe('NullSubstitutionFunction', () => {
  it('should return correctly', () => {
    const nullSubFn = nullSubstitution('');
    expect(nullSubFn).toBeTruthy();
    expect(nullSubFn[0]).toBe(TransformationType.NullSubstitution);
    expect(nullSubFn[1]).toBe(null);
    expect(nullSubFn[2]).toBeInstanceOf(Function);
  });

  it('should return source if source is not null', () => {
    const nullSubFn = nullSubstitution('subbed');
    const result = nullSubFn[2]({ foo: 'bar' }, 'foo');
    expect(result).toBe('bar');
    expect(result).not.toBe('subbed');
  });

  it('should return subbed if source is null', () => {
    const nullSubFn = nullSubstitution('subbed');
    const result = nullSubFn[2]({ foo: null }, 'foo');
    expect(result).toBe('subbed');
    expect(result).not.toBe(null);
  });
});
