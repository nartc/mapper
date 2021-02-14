import { mapWithArguments } from '@automapper/core';
import { setupClasses } from '../setup.spec';
import {
  SimpleBar,
  SimpleBarVm,
  SimpleFoo,
  SimpleFooVm,
} from './fixtures/models/simple-foo-bar';

describe('withExtraArguments', () => {
  const [mapper] = setupClasses('withExtraArguments');

  beforeEach(() => {
    mapper.createMap(SimpleBar, SimpleBarVm);
    mapper.createMap(SimpleFoo, SimpleFooVm).forMember(
      (d) => d.fooBar,
      mapWithArguments(
        (source, { multiplier }: { multiplier: number }) =>
          source.fooBar * multiplier
      )
    );
  });

  afterEach(() => {
    mapper.dispose();
  });

  it('should map', () => {
    const foo = new SimpleFoo();
    foo.foo = 'foo';
    foo.fooBar = 2;

    let vm = mapper.map(foo, SimpleFooVm, SimpleFoo, {
      extraArguments: { multiplier: 2 },
    });
    expect(vm.foo).toEqual(foo.foo);
    expect(vm.fooBar).toEqual(foo.fooBar * 2);

    vm = mapper.map(foo, SimpleFooVm, SimpleFoo, {
      extraArguments: { multiplier: 3 },
    });
    expect(vm.fooBar).toEqual(foo.fooBar * 3);
  });

  it('should map array', () => {
    const foo = new SimpleFoo();
    foo.foo = 'foo';
    foo.fooBar = 2;

    const foo2 = new SimpleFoo();
    foo2.foo = 'foo2';
    foo2.fooBar = 3;

    const foos = [foo, foo2];

    let vms = mapper.mapArray(foos, SimpleFooVm, SimpleFoo, {
      extraArguments: { multiplier: 2 },
    });

    vms.forEach((vm, index) => {
      expect(vm.foo).toEqual(foos[index].foo);
      expect(vm.fooBar).toEqual(foos[index].fooBar * 2);
    });

    vms = mapper.mapArray(foos, SimpleFooVm, SimpleFoo, {
      extraArguments: { multiplier: 3 },
    });

    vms.forEach((vm, index) => {
      expect(vm.foo).toEqual(foos[index].foo);
      expect(vm.fooBar).toEqual(foos[index].fooBar * 3);
    });
  });
});
