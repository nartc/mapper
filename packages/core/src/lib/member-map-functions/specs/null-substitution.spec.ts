import { nullSubstitution } from '@automapper/core';
import { MapFnClassId, TransformationType } from '@automapper/types';

describe('NullSubstitutionFunction', () => {
  it('should return correctly', () => {
    const nullSubFn = nullSubstitution('');
    expect(nullSubFn).toBeTruthy();
    expect(nullSubFn[MapFnClassId.type]).toEqual(
      TransformationType.NullSubstitution
    );
    expect(nullSubFn[MapFnClassId.fn]).toBeInstanceOf(Function);
  });

  it('should return source if source is not null', () => {
    const nullSubFn = nullSubstitution('subbed');
    const result = nullSubFn[MapFnClassId.fn]({ foo: 'bar' }, 'foo');
    expect(result).toEqual('bar');
    expect(result).not.toEqual('subbed');
  });

  it('should return subbed if source is null', () => {
    const nullSubFn = nullSubstitution('subbed');
    const result = nullSubFn[MapFnClassId.fn]({ foo: null }, 'foo');
    expect(result).toEqual('subbed');
    expect(result).not.toEqual(null);
  });
});
