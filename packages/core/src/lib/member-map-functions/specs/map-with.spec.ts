import type { Mapper } from '@automapper/types';
import { MapFnClassId, TransformationType } from '@automapper/types';
import { mapWith } from '../map-with';

describe('MapWithFunction', () => {
  const selector = (s: any) => s;
  const withDestination = () => '';
  const withSource = () => '';

  const mapper = { map: jest.fn(), mapArray: jest.fn() };

  it('should return correctly', () => {
    const mapWithFn = mapWith(withDestination, selector, withSource);
    expect(mapWithFn).toBeTruthy();
    expect(mapWithFn[MapFnClassId.type]).toEqual(TransformationType.MapWith);
    expect(mapWithFn[MapFnClassId.fn]).toBeInstanceOf(Function);
    expect(mapWithFn[MapFnClassId.misc]).toBe(selector);
  });

  it('should call mapper.map', () => {
    const mapWithFn = mapWith(withDestination, selector, withSource);
    mapWithFn[MapFnClassId.fn]({}, (mapper as unknown) as Mapper);
    expect(mapper.map).toHaveBeenCalledWith(
      {},
      withDestination(),
      withSource()
    );
  });

  it('should call mapper.mapArray', () => {
    const arrSelector = () => [];
    const mapWithFn = mapWith(withDestination, arrSelector, withSource);
    mapWithFn[MapFnClassId.fn]({}, (mapper as unknown) as Mapper);
    expect(mapper.mapArray).toHaveBeenCalledWith(
      [],
      withDestination(),
      withSource()
    );
  });
});
