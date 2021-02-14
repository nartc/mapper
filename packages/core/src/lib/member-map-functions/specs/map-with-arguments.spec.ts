import { mapWithArguments } from '@automapper/core';
import { MapFnClassId, TransformationType } from '@automapper/types';

describe('MapWithArgumentsFunction', () => {
  const withArgumentsResolver = (
    source: any,
    extraArguments: { foo: string }
  ) => source[extraArguments.foo];

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
});
