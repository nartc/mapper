import { AutoMap, classes } from '@automapper/classes';
import type { Mapper } from '@automapper/core';
import { createMap, createMapper, forMember, mapFrom } from '@automapper/core';
import { MapperOmitType } from '../mapper-omit-type';

describe(MapperOmitType.name, () => {
    let mapper: Mapper;

    class Baz {
        @AutoMap()
        baz!: string;
    }

    class Foo {
        @AutoMap()
        foo!: string;
        @AutoMap()
        bar!: number;
        @AutoMap(() => Baz)
        baz!: Baz;
    }

    class OmitFoo extends MapperOmitType(Foo, ['foo']) {}

    class OmitBar extends MapperOmitType(Foo, ['bar']) {}

    class OmitFooExtra extends MapperOmitType(Foo, ['foo', 'baz']) {
        @AutoMap()
        extra!: number;
    }

    beforeEach(() => {
        mapper = createMapper({ strategyInitializer: classes() });

        createMap(mapper, Baz, Baz);
        createMap(mapper, Foo, OmitFoo);
        createMap(mapper, Foo, OmitBar);
        createMap(
            mapper,
            Foo,
            OmitFooExtra,
            forMember(
                (d) => d.extra,
                mapFrom((s) => s.bar)
            )
        );
    });

    it('should omit properly', () => {
        const foo = new Foo();
        foo.foo = 'testing foo';
        foo.bar = 123;
        foo.baz = new Baz();
        foo.baz.baz = 'testing baz';

        const omitFoo = mapper.map(foo, Foo, OmitFoo);
        expect(omitFoo.bar).toEqual(foo.bar);
        expect(omitFoo.baz).toEqual(foo.baz);

        const omitBar = mapper.map(foo, Foo, OmitBar);
        expect(omitBar.foo).toEqual(foo.foo);
        expect(omitBar.baz).toEqual(foo.baz);

        const omitFooExtra = mapper.map(foo, Foo, OmitFooExtra);
        expect(omitFooExtra.bar).toEqual(foo.bar);
        expect(omitFooExtra.extra).toEqual(foo.bar);
    });
});
