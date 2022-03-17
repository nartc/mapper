import { classes } from '@automapper/classes';
import {
    CamelCaseNamingConvention,
    createMap,
    createMapper,
    forMember,
    fromValue,
    SnakeCaseNamingConvention,
} from '@automapper/core';
import {
    FooBarBazDto,
    FooBarBazQuxDto,
    FooBarDto,
    FooDto,
    FooFooDto,
    FooFooFooDto,
} from './dtos/deep-nest.dto';
import {
    Foo,
    FooBar,
    FooBarBaz,
    FooBarBazQux,
    FooFoo,
    FooFooFoo,
} from './models/deep-nest';

describe('Map - Deep Nest models', () => {
    describe('Without naming conventions', () => {
        const mapper = createMapper({ strategyInitializer: classes() });

        afterEach(() => {
            mapper.dispose();
        });

        it('should map properly', () => {
            createMap(mapper, FooFooFoo, FooFooFooDto);
            createMap(mapper, FooFoo, FooFooDto);
            createMap(mapper, Foo, FooDto);

            const foo = new Foo();
            foo.foo = new FooFoo();
            foo.foo.foo = new FooFooFoo('some string');

            const dto = mapper.map(foo, Foo, FooDto);
            expect(dto).toBeTruthy();
            expect(dto.foo.foo.foo).toEqual('some string');
        });
    });

    describe('With naming conventions', () => {
        const mapper = createMapper({
            strategyInitializer: classes(),
            namingConventions: {
                source: new CamelCaseNamingConvention(),
                destination: new SnakeCaseNamingConvention(),
            },
        });

        afterEach(() => {
            mapper.dispose();
        });

        it('should map properly', () => {
            createMap(mapper, FooBarBazQux, FooBarBazQuxDto);
            createMap(mapper, FooBarBaz, FooBarBazDto);
            createMap(mapper, FooBar, FooBarDto);

            const dto = mapper.map(
                { fooBar: { fooBarBaz: { fooBarBazQux: 'some foo bar' } } },
                FooBar,
                FooBarDto
            );
            expect(dto.foo_bar.foo_bar_baz.foo_bar_baz_qux).toEqual(
                'some foo bar'
            );
        });
    });

    describe('With custom mapping configurations', () => {
        const mapper = createMapper({ strategyInitializer: classes() });

        afterEach(() => {
            mapper.dispose();
        });

        it('should map with mapping configuration for depth 1', () => {
            createMap(
                mapper,
                FooFooFoo,
                FooFooFooDto,
                forMember((d) => d.foo, fromValue('FooFooFoo override'))
            );

            const foo = new FooFooFoo('some string');
            const dto = mapper.map(foo, FooFooFoo, FooFooFooDto);
            expect(dto.foo).toEqual('FooFooFoo override');
        });

        it('should map with mapping configuration for depth 2', () => {
            createMap(mapper, FooFooFoo, FooFooFooDto);
            createMap(
                mapper,
                FooFoo,
                FooFooDto,
                forMember((d) => d.foo.foo, fromValue('FooFoo override'))
            );

            const foo = new FooFoo();
            foo.foo = new FooFooFoo('some string');
            const dto = mapper.map(foo, FooFoo, FooFooDto);
            expect(dto.foo.foo).toEqual('FooFoo override');
        });

        it('should map with mapping configuration for depth 3', () => {
            createMap(mapper, FooFooFoo, FooFooFooDto);
            createMap(mapper, FooFoo, FooFooDto);
            createMap(
                mapper,
                Foo,
                FooDto,
                forMember((d) => d.foo.foo.foo, fromValue('Foo override'))
            );

            const foo = new Foo();
            foo.foo = new FooFoo();
            foo.foo.foo = new FooFooFoo('some string');
            const dto = mapper.map(foo, Foo, FooDto);
            expect(dto.foo.foo.foo).toEqual('Foo override');
        });
    });
});
