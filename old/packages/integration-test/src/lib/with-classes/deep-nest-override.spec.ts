import { setupClasses } from '../setup.spec';
import {
  Foo,
  FooDto,
  FooFoo,
  FooFooDto,
  FooFooFoo,
  FooFooFooDto,
} from './fixtures/models/deep-nest';
import { deepNestedFooFooFooProfile } from './fixtures/profiles/deep-nest-override.profile';

describe('Override Deep Nest models', () => {
  const [mapper] = setupClasses('deep-nest-override');

  it('should map forMember override properly', () => {
    mapper.addProfile(deepNestedFooFooFooProfile);

    const foo = new FooFooFoo();
    foo.foo = 'some value';

    const vm = mapper.map(foo, FooFooFooDto, FooFooFoo);
    expect(vm).toBeTruthy();
    expect(vm.foo).toEqual('FooFooFoo Custom Value');
  });

  it('should map inner forMember override properly', () => {
    mapper.addProfile(deepNestedFooFooFooProfile);

    const foo = new FooFoo();
    foo.foo = new FooFooFoo();
    foo.foo.foo = 'some value';

    const vm = mapper.map(foo, FooFooDto, FooFoo);
    expect(vm).toBeTruthy();
    expect(vm.foo.foo).toEqual('FooFoo Custom Value');
  });

  it('should map deep inner forMember override properly', () => {
    mapper.addProfile(deepNestedFooFooFooProfile);

    const vm = mapper.map({ foo: { foo: { foo: 'some value' } } }, FooDto, Foo);
    expect(vm).toBeTruthy();
    expect(vm.foo.foo.foo).toEqual('Foo Custom Value');
  });
});
