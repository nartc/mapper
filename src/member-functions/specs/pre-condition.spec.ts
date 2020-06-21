import { preCondition } from '../pre-condition';

describe('PreConditionFunction', () => {
  it('should return correctly', () => {
    let preCondFn = preCondition(s => s.truthy);
    expect(preCondFn).toBeTruthy();
    expect(preCondFn![0]).toBeInstanceOf(Function);
    expect(preCondFn![1]).toBe(undefined);

    preCondFn = preCondition(s => s.truthy, 'default');
    expect(preCondFn![1]).toBe('default');
  });

  it('should return truthy when true', () => {
    const preCond = preCondition(s => s.truthy);
    const result = preCond![0]({ truthy: true });
    expect(result).toBe(true);
  });

  it('should return falsy when false', () => {
    const preCond = preCondition(s => s.falsy);
    const result = preCond![0]({ falsy: false });
    expect(result).toBe(false);
  });
});
