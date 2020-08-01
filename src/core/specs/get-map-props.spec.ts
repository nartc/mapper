import { AutoMap } from '../../decorators';
import { MapOptions } from '../../types';
import { getMapProps } from '../get-map-props';

describe('GetMapProps', () => {
  class Foo {
    @AutoMap()
    foo!: string;
  }

  class FooVm {
    @AutoMap()
    foo!: string;
  }

  const destination = FooVm;
  const source = Foo;
  const options: MapOptions = {
    beforeMap: () => {},
  };
  const defaultOptions = {
    skipUnmappedAssertion: false,
    beforeMap: undefined,
    afterMap: undefined,
  };

  it('should return array with destination and default options if only destination passed in', () => {
    const result = getMapProps([destination], false);
    expect(result).toHaveLength(2);
    expect(result[0]).toBe(destination);
    expect(result[1]).toEqual(defaultOptions);
  });

  it('should return array with all 3 arguments', () => {
    const result = getMapProps([destination, source, options], false);
    expect(result).toHaveLength(3);
    expect(result[0]).toBe(destination);
    expect(result[1]).toEqual({ ...defaultOptions, ...options });
    expect(result[2]).toBe(source);
  });

  it('should return array with destination and source', () => {
    const result = getMapProps([destination, source], false);
    expect(result).toHaveLength(3);
    expect(result[0]).toBe(destination);
    expect(result[1]).toEqual(defaultOptions);
    expect(result[2]).toBe(source);
  });

  it('should return array with destination and options', () => {
    const result = getMapProps([destination, options], false);
    expect(result).toHaveLength(2);
    expect(result[0]).toBe(destination);
    expect(result[1]).toEqual({ ...defaultOptions, ...options });
    expect(result[2]).toBeUndefined();
  });
});
