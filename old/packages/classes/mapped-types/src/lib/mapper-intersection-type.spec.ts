import { AutoMap, classes } from '@automapper/classes';
import type { Mapper } from '@automapper/core';
import { createMapper } from '@automapper/core';
import { MapperIntersectionType } from './mapper-intersection-type';

describe(MapperIntersectionType.name, () => {
  let mapper: Mapper;

  class Baz {
    @AutoMap()
    baz: string;
  }

  class Foo {
    @AutoMap()
    foo: string;
    @AutoMap({ typeFn: () => Baz })
    baz: Baz;
  }

  class Bar {
    @AutoMap()
    bar: number;
  }

  class IntersectionFooBar extends MapperIntersectionType(Foo, Bar) {}

  beforeEach(() => {
    mapper = createMapper({
      name: 'intersectionTypeMapper',
      pluginInitializer: classes,
    });

    mapper.createMap(Baz, Baz);
    mapper.createMap(IntersectionFooBar, Foo);
    mapper.createMap(IntersectionFooBar, Bar);
  });

  it('should intersect properly', () => {
    const intersect = new IntersectionFooBar();
    intersect.foo = 'intersect foo';
    intersect.bar = 123;
    intersect.baz = new Baz();
    intersect.baz.baz = 'intersect baz';

    const foo = mapper.map(intersect, Foo, IntersectionFooBar);
    expect(foo.foo).toEqual(intersect.foo);
    expect(foo.baz).toEqual(intersect.baz);

    const bar = mapper.map(intersect, Bar, IntersectionFooBar);
    expect(bar.bar).toEqual(intersect.bar);
  });
});
