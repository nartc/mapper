import { condition } from '@automapper/core';
import { MapFnClassId, TransformationType } from '@automapper/types';

describe('ConditionFunction', () => {
  const source = {
    toMap: 'truthy',
  };

  it('should return correctly', () => {
    const conditionFn = condition<typeof source>(() => true);
    expect(conditionFn).toBeTruthy();
    expect(conditionFn[MapFnClassId.type]).toEqual(
      TransformationType.Condition
    );
    expect(conditionFn[MapFnClassId.misc]).toEqual(null);
    expect(conditionFn[MapFnClassId.fn]).toBeInstanceOf(Function);
  });

  it('should map to source.truthy when evaluated to true', () => {
    const conditionFn = condition<typeof source>(() => true);
    const result = conditionFn[MapFnClassId.fn](source, 'toMap');
    expect(result).toEqual(source.toMap);
  });

  it('should map to source.truthy when evaluated to true regardless of defaultValue', () => {
    const conditionFn = condition<typeof source>(() => true, 'defaultValue');
    const result = conditionFn[MapFnClassId.fn](source, 'toMap');
    expect(result).toEqual(source.toMap);
  });

  it('should map to undefined when evaluated to false', () => {
    const conditionFn = condition<typeof source>(() => false);
    const result = conditionFn[MapFnClassId.fn](source, 'toMap');
    expect(result).toEqual(undefined);
  });

  it('should map to defaultValue when evaluated to false and defaultValue is provided', () => {
    const conditionFn = condition<typeof source>(() => false, 'defaultValue');
    const result = conditionFn[MapFnClassId.fn](source, 'toMap');
    expect(result).toEqual('defaultValue');
  });
});
