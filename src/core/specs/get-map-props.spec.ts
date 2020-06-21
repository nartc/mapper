import { MapOptions } from '../../types';
import { getMapProps } from '../get-map-props';
import { AutoMap } from '../../decorators';

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

  it('should return array with only destination if only destination passed in', () => {
    const result = getMapProps([destination]);
    expect(result).toHaveLength(1);
    expect(result[0]).toBe(destination);
  });

  it('should return array with all 3 arguments', () => {
    const result = getMapProps([destination, source, options]);
    expect(result).toHaveLength(3);
    expect(result[0]).toBe(destination);
    expect(result[1]).toBe(source);
    expect(result[2]).toBe(options);
  });

  it('should return array with destination and source', () => {
    const result = getMapProps([destination, source]);
    expect(result).toHaveLength(2);
    expect(result[0]).toBe(destination);
    expect(result[1]).toBe(source);
  });

  it('should return array with destination and options', () => {
    const result = getMapProps([destination, options]);
    expect(result).toHaveLength(3);
    expect(result[0]).toBe(destination);
    expect(result[1]).toBeUndefined();
    expect(result[2]).toBe(options);
  });
});
