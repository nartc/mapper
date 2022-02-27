import { setupPojos } from '../setup.spec';
import {
  FooFoo,
  FooFooFoo,
  FooFooFooVm,
  FooFooVm,
} from './fixtures/interfaces/simple-inheritance-foo.interface';
import { simpleInheritanceFooProfile } from './fixtures/profiles/simple-inheritance-foo.profile';

describe('Inheritance', () => {
  const [mapper] = setupPojos('inheritance');

  it('should work with one level inheritance', () => {
    mapper.addProfile(simpleInheritanceFooProfile);

    const foo = {
      foo: 'foo1',
      fooFoo: 'foo2',
    } as FooFoo;

    const vm = mapper.map<FooFoo, FooFooVm>(foo, 'FooFooVm', 'FooFoo');
    expect(vm).toBeTruthy();
    expect(vm.fooVm).toEqual(foo.foo);
    expect(vm.fooFooVm).toEqual(foo.fooFoo);
  });

  it('should work with two level inheritance', () => {
    mapper.addProfile(simpleInheritanceFooProfile);

    const foo = {
      foo: 'foo1',
      fooFoo: 'foo2',
      fooFooFoo: 'foo3',
    } as FooFooFoo;

    const vm = mapper.map<FooFooFoo, FooFooFooVm>(
      foo,
      'FooFooFooVm',
      'FooFooFoo'
    );
    expect(vm).toBeTruthy();
    expect(vm.fooVm).toEqual(foo.foo);
    expect(vm.fooFooVm).toEqual(foo.fooFoo);
    expect(vm.fooFooFooVm).toEqual(foo.fooFooFoo);
  });
});
