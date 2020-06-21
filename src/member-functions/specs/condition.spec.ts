import { MemberMapFunctionId, TransformationType } from '../../types';
import { condition } from '../condition';

describe('ConditionFunction', () => {
  const source = {
    truthy: true,
    falsy: false,
  };

  it('should return correctly', () => {
    const conditionFn = condition<typeof source>(s => s.truthy);
    expect(conditionFn).toBeTruthy();
    expect(conditionFn[MemberMapFunctionId.type]).toBe(
      TransformationType.Condition
    );
    expect(conditionFn[MemberMapFunctionId.misc]).toBe(null);
    expect(conditionFn[MemberMapFunctionId.fn]).toBeInstanceOf(Function);
  });

  it('should map to truthy when true', () => {
    const conditionFn = condition<typeof source>(s => s.truthy);
    const result = conditionFn[MemberMapFunctionId.fn](source, null, 'truthy');
    expect(result).toBe(true);
  });

  it('should still map to truthy when true and defaultValue is provided', () => {
    const conditionFn = condition<typeof source>(s => s.truthy, 'defaultValue');
    const result = conditionFn[MemberMapFunctionId.fn](source, null, 'truthy');
    expect(result).toBe(true);
  });

  it('should map to null when false', () => {
    const conditionFn = condition<typeof source>(s => s.falsy);
    const result = conditionFn[MemberMapFunctionId.fn](source, null, 'falsy');
    expect(result).toBe(null);
  });

  it('should map to defaultValue when false and provided', () => {
    const conditionFn = condition<typeof source>(s => s.falsy, 'defaultValue');
    const result = conditionFn[MemberMapFunctionId.fn](source, null, 'falsy');
    expect(result).toBe('defaultValue');
  });

  it('should map to undefined if internalDefaultValue is undefined', () => {
    const conditionFn = condition<typeof source>(s => s.falsy);
    const result = conditionFn[MemberMapFunctionId.fn](
      source,
      undefined,
      'falsy'
    );
    expect(result).toBe(undefined);
  });
});
