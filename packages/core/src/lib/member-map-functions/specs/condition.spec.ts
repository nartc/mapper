import { MapFnClassId, TransformationType } from '../../types';
import { condition } from '../condition';

describe(condition.name, () => {
    const source = {
        toMap: 'truthy',
    };

    it('should return correctly', () => {
        const conditionFn = condition(() => true);
        expect(conditionFn).toBeTruthy();
        expect(conditionFn[MapFnClassId.type]).toEqual(
            TransformationType.Condition
        );
        expect(conditionFn[MapFnClassId.fn]).toBeInstanceOf(Function);
    });

    it('should map to source.truthy when evaluated to true', () => {
        const conditionFn = condition(() => true);
        const result = conditionFn[MapFnClassId.fn](source, ['toMap']);
        expect(result).toEqual(source.toMap);
    });

    it('should map to source.truthy when evaluated to true regardless of defaultValue', () => {
        const conditionFn = condition(() => true, 'defaultValue');
        const result = conditionFn[MapFnClassId.fn](source, ['toMap']);
        expect(result).toEqual(source.toMap);
    });

    it('should map to undefined when evaluated to false', () => {
        const conditionFn = condition(() => false);
        const result = conditionFn[MapFnClassId.fn](source, ['toMap']);
        expect(result).toEqual(undefined);
    });

    it('should map to defaultValue when evaluated to false and defaultValue is provided', () => {
        const conditionFn = condition(() => false, 'defaultValue');
        const result = conditionFn[MapFnClassId.fn](source, ['toMap']);
        expect(result).toEqual('defaultValue');
    });
});
