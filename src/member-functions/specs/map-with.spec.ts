import { Mapper } from '../../automapper';
import {
  MemberMapFunctionReturnClassId,
  TransformationType,
} from '../../types';
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
    expect(mapWithFn[MemberMapFunctionReturnClassId.type]).toBe(
      TransformationType.MapWith
    );
    expect(mapWithFn[MemberMapFunctionReturnClassId.misc]).toBe(sourceSelector);
    expect(mapWithFn[MemberMapFunctionReturnClassId.fn]).toBeInstanceOf(
      Function
    );
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
    const result = mapWithFn[MemberMapFunctionReturnClassId.fn]({ foo });
    expect(result).toBeTruthy();
    expect(result).toBeInstanceOf(Bar);
    expect(result?.bar).toBe(foo.foo);
  });

  afterAll(() => {
    Mapper.dispose();
  });
});
