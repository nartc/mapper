import {CamelCaseNamingConvention, SnakeCaseNamingConvention,} from '@automapper/core';
import {setupClasses} from '../setup.spec';
import {
  Foo,
  FooBar,
  FooBarBaz,
  FooBarBazDto,
  FooBarBazQux,
  FooBarBazQuxDto,
  FooBarDto,
  FooDto,
  FooFoo,
  FooFooDto,
  FooFooFoo,
} from './fixtures/models/deep-nest';

describe('Deep Nest models', () => {
  describe('regular', () => {
    const [mapper] = setupClasses('deep-nest');

    it('should map properly', () => {
      mapper.createMap(FooFooFoo, FooFooFooDto);
      mapper.createMap(FooFoo, FooFooDto);
      mapper.createMap(Foo, FooDto);

      const foo = new Foo();
      foo.foo = new FooFoo();
      foo.foo.foo = new FooFooFoo();
      foo.foo.foo.foo = 'some string';

      const vm = mapper.map(foo, FooDto, Foo);
      expect(vm).toBeTruthy();
    });
  });

  describe('with naming conventions', () => {
    const [mapper] = setupClasses('deep-nest-naming', {
      source: new CamelCaseNamingConvention(),
      destination: new SnakeCaseNamingConvention(),
    });

    it('should map with naming conventions', () => {
      mapper.createMap(FooBarBazQux, FooBarBazQuxDto);
      mapper.createMap(FooBarBaz, FooBarBazDto);
      mapper.createMap(FooBar, FooBarDto);

      const vm = mapper.map(
        { fooBar: { fooBarBaz: { fooBarBazQux: 'some foo bar' } } },
        FooBarDto,
        FooBar
      );
      expect(vm).toBeTruthy();
    });
  });
});
