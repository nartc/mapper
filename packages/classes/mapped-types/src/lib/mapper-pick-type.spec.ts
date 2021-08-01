import { AutoMap, classes } from '@automapper/classes';
import { createMapper, mapFrom } from '@automapper/core';
import type { Mapper } from '@automapper/types';
import { MapperPickType } from './mapper-pick-type';

describe(MapperPickType.name, () => {
  let mapper: Mapper;

  class Baz {
    @AutoMap()
    baz: string;
  }

  class Foo {
    @AutoMap()
    foo: string;
    @AutoMap()
    bar: number;
    @AutoMap({ typeFn: () => Baz })
    baz: Baz;
  }

  class PickFoo extends MapperPickType(Foo, ['foo']) {}

  class PickBar extends MapperPickType(Foo, ['bar']) {}

  class PickFooExtra extends MapperPickType(Foo, ['foo', 'baz']) {
    @AutoMap()
    extra: number;
  }

  beforeEach(() => {
    mapper = createMapper({
      name: 'pickTypeMapper',
      pluginInitializer: classes,
    });

    mapper.createMap(Baz, Baz);
    mapper.createMap(Foo, PickFoo);
    mapper.createMap(Foo, PickBar);
    mapper.createMap(Foo, PickFooExtra).forMember(
      (d) => d.extra,
      mapFrom((s) => s.bar)
    );
  });

  it('should pick properly', () => {
    const foo = new Foo();
    foo.foo = 'testing foo';
    foo.bar = 123;
    foo.baz = new Baz();
    foo.baz.baz = 'testing baz';

    const pickedFoo = mapper.map(foo, PickFoo, Foo);
    expect(pickedFoo.foo).toEqual(foo.foo);

    const pickedBar = mapper.map(foo, PickBar, Foo);
    expect(pickedBar.bar).toEqual(foo.bar);

    const pickedFooExtra = mapper.map(foo, PickFooExtra, Foo);
    expect(pickedFooExtra.foo).toEqual(foo.foo);
    expect(pickedFooExtra.baz).toEqual(foo.baz);
    expect(pickedFooExtra.extra).toEqual(foo.bar);
  });
});
