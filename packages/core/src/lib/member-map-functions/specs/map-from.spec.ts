import type { Resolver } from '../../types';
import { MapFnClassId, TransformationType } from '../../types';
import { mapFrom } from '../map-from';

describe(mapFrom.name, () => {
    const source = {
        foo: 'bar',
    };

    const sourceSelector = (s: typeof source) => s.foo;

    it('should return correctly', () => {
        const mapFromFn = mapFrom(sourceSelector);
        expect(mapFromFn).toBeTruthy();
        expect(mapFromFn[MapFnClassId.type]).toEqual(
            TransformationType.MapFrom
        );
        expect(mapFromFn[MapFnClassId.fn]).toBeInstanceOf(Function);
    });

    it('should map to foo correctly', () => {
        const mapFromFn = mapFrom(sourceSelector);
        const result = mapFromFn[MapFnClassId.fn](source);
        expect(result).toEqual(source.foo);
    });

    it('should use resolver correctly', () => {
        const resolver: Resolver<typeof source> = {
            resolve(src: { foo: string }) {
                return src.foo;
            },
        };
        const mapFromFn = mapFrom(resolver);
        const result = mapFromFn[MapFnClassId.fn](source);
        expect(result).toEqual(source.foo);
    });
});
