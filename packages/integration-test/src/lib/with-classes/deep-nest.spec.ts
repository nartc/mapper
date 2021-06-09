import { setupClasses } from '../setup.spec';
import {
  Foo,
  FooDto,
  FooFoo,
  FooFooDto,
  FooFooFoo,
  FooFooFooDto,
} from './fixtures/models/deep-nest';

describe('Deep Nest models', () => {
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
