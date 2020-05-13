import { TransformationType } from '../../types';
import { fromValue } from '../from-value';

describe('FromValueFunction', () => {
  it('should return correctly', () => {
    const fromValueFunction = fromValue(10);
    expect(fromValueFunction).toBeTruthy();
    expect(fromValueFunction[0]).toBe(TransformationType.FromValue);
    expect(fromValueFunction[1]).toBe(null);
    expect(fromValueFunction[2]).toBeInstanceOf(Function);
  });

  it('should map correctly', () => {
    const fromValueFunction = fromValue(10);
    const result = fromValueFunction[2]();
    expect(result).toBe(10);
  });
});
