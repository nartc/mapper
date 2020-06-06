import { Mapper } from '../../automapper';
import { TransformationType } from '../../types';
import { mapFrom } from '../map-from';
import { mapWith } from '../map-with';

describe('MapWithFunction', () => {
  class Bar {
    bar!: string;
  }

  const sourceSelector = (s: any) => s.foo;

  it('should return correctly', () => {
    const mapWithFn = mapWith(Bar, sourceSelector);
    expect(mapWithFn).toBeTruthy();
    expect(mapWithFn[0]).toBe(TransformationType.MapWith);
    expect(mapWithFn[1]).toBe(sourceSelector);
    expect(mapWithFn[2]).toBeInstanceOf(Function);
  });

  class Foo {
    foo!: string;
  }

  it('should map correctly', () => {
    Mapper.createMap(Foo, Bar).forMember(
      d => d.bar,
      mapFrom(s => s.foo)
    );

    const mapWithFn = mapWith(Bar, sourceSelector);
    const foo = new Foo();
    foo.foo = 'bar';
    const result = mapWithFn[2]({ foo }, Mapper.mappingStorage);
    expect(result).toBeTruthy();
    expect(result).toBeInstanceOf(Bar);
    expect(result?.bar).toBe(foo.foo);
  });

  it('should return null when sourceValue is empty', () => {
    const mapWithFn = mapWith(Bar, sourceSelector);
    const result = mapWithFn[2]({ foo: null }, Mapper.mappingStorage);
    expect(result).toBeNull();
    const result2 = mapWithFn[2](
      {
        foo: 'test',
      },
      Mapper.mappingStorage
    );
    expect(result2).toBeNull();
  });

  it('should map correctly for array of MapWith', () => {
    const mapWithFn = mapWith(Bar, sourceSelector);

    class FooTwo {
      foo!: string[];
    }

    Mapper.createMap(FooTwo, Bar).forMember(
      d => d.bar,
      mapFrom(s => s.foo.join(''))
    );
    const foo = new FooTwo();
    foo.foo = ['1'];
    const result = mapWithFn[2]({ foo: [foo] }, Mapper.mappingStorage);
    expect(result).toBeTruthy();
    expect(result).toHaveLength(1);
  });

  it('should map correctly for array of MapWith with provided source model', () => {
    const mapWithFn = mapWith(Bar, sourceSelector, () => FooTwo);

    class FooTwo {
      foo!: string[];
    }

    Mapper.createMap(FooTwo, Bar).forMember(
      d => d.bar,
      mapFrom(s => s.foo.join(''))
    );
    const foo = new FooTwo();
    foo.foo = ['1'];
    const result = mapWithFn[2]({ foo: [foo] }, Mapper.mappingStorage);
    expect(result).toBeTruthy();
    expect(result).toHaveLength(1);
  });

  it('should return empty array for empty array', () => {
    const mapWithFn = mapWith(Bar, sourceSelector);
    const result = mapWithFn[2]({ foo: [[]] }, Mapper.mappingStorage);
    expect(result).toBeTruthy();
    expect(result).toHaveLength(0);
  });

  afterAll(() => {
    Mapper.dispose();
  });
});
