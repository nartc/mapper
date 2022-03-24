import { MapFnClassId, TransformationType } from '../../types';
import { undefinedSubstitution } from '../undefined-substitution';

describe(undefinedSubstitution.name, () => {
    it('should return correctly', () => {
        const undefinedSub = undefinedSubstitution('');
        expect(undefinedSub).toBeTruthy();
        expect(undefinedSub[MapFnClassId.type]).toEqual(
            TransformationType.UndefinedSubstitution
        );
        expect(undefinedSub[MapFnClassId.fn]).toBeInstanceOf(Function);
    });

    it('should return source if source is not undefined', () => {
        const undefinedSub = undefinedSubstitution('subbed');
        const result = undefinedSub[MapFnClassId.fn]({ foo: 'bar' }, ['foo']);
        expect(result).toEqual('bar');
        expect(result).not.toEqual('subbed');
    });

    it('should return subbed if source is undefined', () => {
        const undefinedSub = undefinedSubstitution('subbed');
        const result = undefinedSub[MapFnClassId.fn]({}, ['foo']);
        expect(result).toEqual('subbed');
        expect(result).not.toEqual(undefined);
    });
});
