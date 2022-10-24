import { AutoMap, classes } from '@automapper/classes';
import {
    CamelCaseNamingConvention,
    createMap,
    createMapper,
    forMember,
    mapWith,
    mapWithArguments,
    Resolver,
} from '@automapper/core';

class Bar {
    @AutoMap(() => String)
    bar!: string | null;

    constructor(bar: string) {
        this.bar = bar;
    }
}

class Foo {
    @AutoMap()
    foo!: string;
    @AutoMap(() => Bar)
    bar!: Bar;
    @AutoMap(() => Number)
    fooBar!: number | null;

    constructor(fooBar: number) {
        this.foo = `foo${fooBar}`;
        this.fooBar = fooBar;
        this.bar = new Bar(`bar${fooBar}`);
    }
}

class BarDto {
    @AutoMap(() => String)
    bar!: string | null;
}

class FooDto {
    @AutoMap()
    foo!: string;
    @AutoMap(() => BarDto)
    bar!: BarDto;
    @AutoMap(() => Number)
    fooBar!: number | null;
}

describe('Map - Extra Arguments', () => {
    const mapper = createMapper({
        strategyInitializer: classes(),
        namingConventions: new CamelCaseNamingConvention(),
    });

    beforeEach(() => {
        const resolver: Resolver<Foo, { multiplier: number }, number> = {
            resolve(
                source: Foo,
                { multiplier }: { multiplier: number }
            ): number {
                return (source.fooBar || 1) * multiplier;
            },
        };

        createMap(
            mapper,
            Bar,
            BarDto,
            forMember(
                (d) => d.bar,
                mapWithArguments(
                    (source, { concat = 'default concat' }) =>
                        source.bar + ' ' + concat
                )
            )
        );

        createMap(
            mapper,
            Foo,
            FooDto,
            forMember((d) => d.fooBar, mapWithArguments(resolver))
        );
    });

    afterEach(() => {
        mapper.dispose();
    });

    it('should map with arguments properly', () => {
        const foo = new Foo(2);

        let dto = mapper.map(foo, Foo, FooDto, {
            extraArgs: () => ({ multiplier: 2 }),
        });

        expect(dto.foo).toEqual(foo.foo);
        expect(dto.fooBar).toEqual((foo.fooBar || 1) * 2);

        dto = mapper.map(foo, Foo, FooDto, {
            extraArgs: () => ({ multiplier: 3 }),
        });
        expect(dto.fooBar).toEqual((foo.fooBar || 1) * 3);
    });

    it('should map with arguments for nested model', () => {
        const foo = new Foo(2);
        let dto = mapper.map(foo, Foo, FooDto, {
            extraArgs: () => ({ multiplier: 2 }),
        });

        expect(dto.foo).toEqual(foo.foo);
        expect(dto.fooBar).toEqual((foo.fooBar || 1) * 2);
        expect(dto.bar.bar).toEqual(foo.bar.bar + ' default concat');

        dto = mapper.map(foo, Foo, FooDto, {
            extraArgs: () => ({ multiplier: 3, concat: 'concat me' }),
        });

        expect(dto.fooBar).toEqual((foo.fooBar || 1) * 3);
        expect(dto.bar.bar).toEqual(foo.bar.bar + ' concat me');
    });
});

describe('Map - Extra Arguments deep', () => {
    const mapper = createMapper({
        strategyInitializer: classes(),
        namingConventions: new CamelCaseNamingConvention(),
    });

    beforeEach(() => {
        createMap(
            mapper,
            Bar,
            BarDto,
            forMember(
                (d) => d.bar,
                mapWithArguments(
                    (source, { concat = 'default concat' }) =>
                        source.bar + ' ' + concat
                )
            )
        );

        createMap(
            mapper,
            Foo,
            FooDto,
            forMember(
                (d) => d.bar,
                mapWith(BarDto, Bar, (s) => s.bar)
            )
        );
    });

    afterEach(() => {
        mapper.dispose();
    });

    it('should transfer extra args to nested map', () => {
        const foo = new Foo(2);
        const dto = mapper.map(foo, Foo, FooDto, {
            extraArgs: () => ({ multiplier: 3, concat: 'concat me' }),
        });

        expect(dto.foo).toEqual(foo.foo);
        expect(dto.bar.bar).toEqual(foo.bar.bar + ' concat me');
    });
});
