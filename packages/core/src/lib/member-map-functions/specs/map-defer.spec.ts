import { MapFnClassId, TransformationType } from '../../types';
import { ignore } from '../ignore';
import { mapDefer } from '../map-defer';

describe(mapDefer.name, () => {
    it('should return correctly', () => {
        const defer = () => ignore();

        const mapDeferFn = mapDefer(defer);

        expect(mapDeferFn).toBeTruthy();
        expect(mapDeferFn[MapFnClassId.type]).toEqual(
            TransformationType.MapDefer
        );
        expect(mapDeferFn[MapFnClassId.fn]).toBe(defer);
    });
});
