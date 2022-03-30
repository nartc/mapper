import {
    CamelCaseNamingConvention,
    createMap,
    createMapper,
    forMember,
    fromValue,
    SnakeCaseNamingConvention,
} from '@automapper/core';
import { pojos, PojosMetadataMap } from '@automapper/pojos';
import {
    createDeepNestDtoMetadata,
    FooBarBazDto,
    FooBarBazQuxDto,
    FooBarDto,
    FooDto,
    FooFooDto,
    FooFooFooDto,
} from './dtos/deep-nest.dto';
import {
    createDeepNestMetadata,
    Foo,
    FooBar,
    FooBarBaz,
    FooBarBazQux,
    FooFoo,
    FooFooFoo,
} from './models/deep-nest';

describe('Map - Deep Nest models', () => {
    describe('Without naming conventions', () => {
        const mapper = createMapper({ strategyInitializer: pojos() });

        beforeEach(() => {
            createDeepNestMetadata();
            createDeepNestDtoMetadata();
        });

        afterEach(() => {
            mapper.dispose();
            PojosMetadataMap.reset();
        });

        it('should map properly', () => {
            createMap<FooFooFoo, FooFooFooDto>(
                mapper,
                'FooFooFoo',
                'FooFooFooDto'
            );
            createMap<FooFoo, FooFooDto>(mapper, 'FooFoo', 'FooFooDto');
            createMap<Foo, FooDto>(mapper, 'Foo', 'FooDto');

            const foo: Foo = {
                foo: {
                    foo: {
                        foo: 'some string',
                    },
                },
            };

            const dto = mapper.map<Foo, FooDto>(foo, 'Foo', 'FooDto');
            expect(dto).toBeTruthy();
            expect(dto.foo.foo.foo).toEqual('some string');
        });
    });

    describe('With naming conventions', () => {
        const mapper = createMapper({
            strategyInitializer: pojos(),
            namingConventions: {
                source: new CamelCaseNamingConvention(),
                destination: new SnakeCaseNamingConvention(),
            },
        });

        beforeEach(() => {
            createDeepNestMetadata();
            createDeepNestDtoMetadata();
        });

        afterEach(() => {
            mapper.dispose();
            PojosMetadataMap.reset();
        });

        it('should map properly', () => {
            createMap<FooBarBazQux, FooBarBazQuxDto>(
                mapper,
                'FooBarBazQux',
                'FooBarBazQuxDto'
            );
            createMap<FooBarBaz, FooBarBazDto>(
                mapper,
                'FooBarBaz',
                'FooBarBazDto'
            );
            createMap<FooBar, FooBarDto>(mapper, 'FooBar', 'FooBarDto');

            const dto = mapper.map<FooBar, FooBarDto>(
                { fooBar: { fooBarBaz: { fooBarBazQux: 'some foo bar' } } },
                'FooBar',
                'FooBarDto'
            );
            expect(dto.foo_bar.foo_bar_baz.foo_bar_baz_qux).toEqual(
                'some foo bar'
            );
        });
    });

    describe('With custom mapping configurations', () => {
        const mapper = createMapper({ strategyInitializer: pojos() });

        beforeEach(() => {
            createDeepNestMetadata();
            createDeepNestDtoMetadata();
        });

        afterEach(() => {
            mapper.dispose();
            PojosMetadataMap.reset();
        });

        it('should map with mapping configuration for depth 1', () => {
            createMap<FooFooFoo, FooFooFooDto>(
                mapper,
                'FooFooFoo',
                'FooFooFooDto',
                forMember((d) => d.foo, fromValue('FooFooFoo override'))
            );

            const foo: FooFooFoo = { foo: 'some string' };
            const dto = mapper.map<FooFooFoo, FooFooFooDto>(
                foo,
                'FooFooFoo',
                'FooFooFooDto'
            );
            expect(dto.foo).toEqual('FooFooFoo override');
        });

        it('should map with mapping configuration for depth 2', () => {
            createMap<FooFooFoo, FooFooFooDto>(
                mapper,
                'FooFooFoo',
                'FooFooFooDto'
            );
            createMap<FooFoo, FooFooDto>(
                mapper,
                'FooFoo',
                'FooFooDto',
                forMember((d) => d.foo.foo, fromValue('FooFoo override'))
            );

            const foo: FooFoo = {
                foo: {
                    foo: 'some string',
                },
            };
            const dto = mapper.map<FooFoo, FooFooDto>(
                foo,
                'FooFoo',
                'FooFooDto'
            );
            expect(dto.foo.foo).toEqual('FooFoo override');
        });

        it('should map with mapping configuration for depth 3', () => {
            createMap<FooFooFoo, FooFooFooDto>(
                mapper,
                'FooFooFoo',
                'FooFooFooDto'
            );
            createMap<FooFoo, FooFooDto>(mapper, 'FooFoo', 'FooFooDto');
            createMap<Foo, FooDto>(
                mapper,
                'Foo',
                'FooDto',
                forMember((d) => d.foo.foo.foo, fromValue('Foo override'))
            );

            const foo: Foo = {
                foo: {
                    foo: {
                        foo: 'some string',
                    },
                },
            };
            const dto = mapper.map<Foo, FooDto>(foo, 'Foo', 'FooDto');
            expect(dto.foo.foo.foo).toEqual('Foo override');
        });
    });
});
