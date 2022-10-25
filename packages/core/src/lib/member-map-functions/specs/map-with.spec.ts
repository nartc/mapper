import type { Mapper } from '../../types';
import { MapFnClassId, TransformationType } from '../../types';
import { mapWith } from '../map-with';

describe(mapWith.name, () => {
    const selector = (s: any) => s;
    const withDestination = '';
    const withSource = '';

    const mapper = { map: jest.fn(), mapArray: jest.fn() };

    it('should return correctly', () => {
        const mapWithFn = mapWith(withDestination, withSource, selector);
        expect(mapWithFn).toBeTruthy();
        expect(mapWithFn[MapFnClassId.type]).toEqual(
            TransformationType.MapWith
        );
        expect(mapWithFn[MapFnClassId.fn]).toBeInstanceOf(Function);
    });

    it('should call mapper.map', () => {
        const mapWithFn = mapWith(withDestination, withSource, selector);
        mapWithFn[MapFnClassId.fn]({}, mapper as unknown as Mapper);
        expect(mapper.map).toHaveBeenCalledWith(
            {},
            withDestination,
            withSource,
            undefined
        );
    });

    it('should call mapper.mapArray', () => {
        const arrSelector = () => [];
        const mapWithFn = mapWith(withDestination, withSource, arrSelector);
        mapWithFn[MapFnClassId.fn]({}, mapper as unknown as Mapper);
        expect(mapper.mapArray).toHaveBeenCalledWith(
            [],
            withDestination,
            withSource,
            undefined
        );
    });
});
