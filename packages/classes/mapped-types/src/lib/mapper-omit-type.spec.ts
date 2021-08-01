import { AutoMap, classes } from '@automapper/classes';
import { createMapper, mapFrom } from '@automapper/core';
import type { Mapper } from '@automapper/types';
import { MapperOmitType } from './mapper-omit-type';

describe(MapperOmitType.name, () => {
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

  class OmitFoo extends MapperOmitType(Foo, ['foo']) {}

  class OmitBar extends MapperOmitType(Foo, ['bar']) {}

  class OmitFooExtra extends MapperOmitType(Foo, ['foo', 'baz']) {
    @AutoMap()
    extra: number;
  }

  beforeEach(() => {
    mapper = createMapper({
      name: 'omitTypeMapper',
      pluginInitializer: classes,
    });

    mapper.createMap(Baz, Baz);
    mapper.createMap(Foo, OmitFoo);
    mapper.createMap(Foo, OmitBar);
    mapper.createMap(Foo, OmitFooExtra).forMember(
      (d) => d.extra,
      mapFrom((s) => s.bar)
    );
  });

  it('should omit properly', () => {
    const foo = new Foo();
    foo.foo = 'testing foo';
    foo.bar = 123;
    foo.baz = new Baz();
    foo.baz.baz = 'testing baz';

    const omitFoo = mapper.map(foo, OmitFoo, Foo);
    expect(omitFoo.bar).toEqual(foo.bar);
    expect(omitFoo.baz).toEqual(foo.baz);

    const omitBar = mapper.map(foo, OmitBar, Foo);
    expect(omitBar.foo).toEqual(foo.foo);
    expect(omitBar.baz).toEqual(foo.baz);

    const omitFooExtra = mapper.map(foo, OmitFooExtra, Foo);
    expect(omitFooExtra.bar).toEqual(foo.bar);
    expect(omitFooExtra.extra).toEqual(foo.bar);
  });
});
