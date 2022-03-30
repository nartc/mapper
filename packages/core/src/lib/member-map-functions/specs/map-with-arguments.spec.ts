import { MapFnClassId, TransformationType } from '../../types';
import { mapWithArguments } from '../map-with-arguments';

describe(mapWithArguments.name, () => {
    const withArgumentsResolver = (
        source: any,
        extraArguments: Record<string, any>
    ) => source[extraArguments['foo']];

    const resolver = {
        resolve(source: any, extraArguments: Record<string, any>) {
            return source[extraArguments['foo']];
        },
    };

    it('should return correctly', () => {
        const mapWithArgumentsFn = mapWithArguments(withArgumentsResolver);
        expect(mapWithArgumentsFn).toBeTruthy();
        expect(mapWithArgumentsFn[MapFnClassId.type]).toEqual(
            TransformationType.MapWithArguments
        );
        expect(mapWithArgumentsFn[MapFnClassId.fn]).toBe(withArgumentsResolver);
    });

    it('should map correctly', () => {
        const mapWithArgumentsFn = mapWithArguments(withArgumentsResolver);
        const result = mapWithArgumentsFn[MapFnClassId.fn](
            { foo: 'this is awesome' },
            { foo: 'foo' }
        );
        expect(result).toEqual('this is awesome');
    });

    it('should use resolver correctly', () => {
        const mapWithArgumentsFn = mapWithArguments(resolver);
        const result = mapWithArgumentsFn[MapFnClassId.fn](
            { foo: 'this is awesome resolver' },
            { foo: 'foo' }
        );
        expect(result).toEqual('this is awesome resolver');
    });
});
