import { AutoMap, classes } from '@automapper/classes';
import {
    createMap,
    createMapper,
    forMember,
    mapFrom,
    Mapper,
} from '@automapper/core';
import { MapperPickType } from '../mapper-pick-type';

describe(MapperPickType.name, () => {
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

    class PickFoo extends MapperPickType(Foo, ['foo']) {}

    class PickBar extends MapperPickType(Foo, ['bar']) {}

    class PickFooExtra extends MapperPickType(Foo, ['foo', 'baz']) {
        @AutoMap()
        extra!: number;
    }

    beforeEach(() => {
        mapper = createMapper({ strategyInitializer: classes() });

        createMap(mapper, Baz, Baz);
        createMap(mapper, Foo, PickFoo);
        createMap(mapper, Foo, PickBar);
        createMap(
            mapper,
            Foo,
            PickFooExtra,
            forMember(
                (d) => d.extra,
                mapFrom((s) => s.bar)
            )
        );
    });

    it('should pick properly', () => {
        const foo = new Foo();
        foo.foo = 'testing foo';
        foo.bar = 123;
        foo.baz = new Baz();
        foo.baz.baz = 'testing baz';

        const pickedFoo = mapper.map(foo, Foo, PickFoo);
        expect(pickedFoo.foo).toEqual(foo.foo);

        const pickedBar = mapper.map(foo, Foo, PickBar);
        expect(pickedBar.bar).toEqual(foo.bar);

        const pickedFooExtra = mapper.map(foo, Foo, PickFooExtra);
        expect(pickedFooExtra.foo).toEqual(foo.foo);
        expect(pickedFooExtra.baz).toEqual(foo.baz);
        expect(pickedFooExtra.extra).toEqual(foo.bar);
    });
});
