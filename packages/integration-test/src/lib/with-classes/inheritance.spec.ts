import { setupClasses } from '../setup.spec';
import {
  EmptyFoo,
  EmptyFooVm,
  FooFoo,
  FooFooFoo,
  FooFooFooVm,
  FooFooVm,
} from './fixtures/models/simple-inheritance-foo';
import { simpleInheritanceFooProfile } from './fixtures/profiles/simple-inheritance-foo.profile';

describe('Inheritance', () => {
  const [mapper] = setupClasses('inheritance');

  it('should work with one level inheritance', () => {
    mapper.addProfile(simpleInheritanceFooProfile);

    const foo = new FooFoo();
    foo.foo = 'foo1';
    foo.fooFoo = 'foo2';

    const vm = mapper.map(foo, FooFooVm, FooFoo);
    expect(vm).toBeTruthy();
    expect(vm.fooVm).toEqual(foo.foo);
    expect(vm.fooFooVm).toEqual(foo.fooFoo);
  });

  it('should work with two level inheritance', () => {
    mapper.addProfile(simpleInheritanceFooProfile);

    const foo = new FooFooFoo();
    foo.foo = 'foo1';
    foo.fooFoo = 'foo2';
    foo.fooFooFoo = 'foo3';

    const vm = mapper.map(foo, FooFooFooVm, FooFooFoo);
    expect(vm).toBeTruthy();
    expect(vm.fooVm).toEqual(foo.foo);
    expect(vm.fooFooVm).toEqual(foo.fooFoo);
    expect(vm.fooFooFooVm).toEqual(foo.fooFooFoo);
  });

  it('should work with empty models', () => {
    mapper.addProfile(simpleInheritanceFooProfile);

    const foo = new EmptyFoo();
    foo.foo = 'foo1';
    foo.fooFoo = 'foo2';
    foo.fooFooFoo = 'foo3';

    const vm = mapper.map(foo, EmptyFooVm, EmptyFoo);
    expect(vm).toBeTruthy();
    expect(vm.fooVm).toEqual(foo.foo);
    expect(vm.fooFooVm).toEqual(foo.fooFoo);
    expect(vm.fooFooFooVm).toEqual(foo.fooFooFoo);
  });
});
