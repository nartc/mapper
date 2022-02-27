import type { Resolver } from '@automapper/core';
import { mapWithArguments } from '@automapper/core';
import { setupClasses } from '../setup.spec';
import {
  SimpleBar,
  SimpleBarVm,
  SimpleFoo,
  SimpleFooVm,
} from './fixtures/models/simple-foo-bar';

interface Extra {
  multiplier: number;
}

describe('withExtraArguments', () => {
  const [mapper] = setupClasses('withExtraArguments');

  beforeEach(() => {
    const fooBarResolver: Resolver<SimpleFoo, { multiplier: number }, number> =
      {
        resolve(
          source: SimpleFoo,
          { multiplier }: { multiplier: number }
        ): number {
          return source.fooBar * multiplier;
        },
      };
    mapper.createMap(SimpleBar, SimpleBarVm).forMember(
      (d) => d.bar,
      mapWithArguments(
        (source, { concat = 'default concat' }: { concat?: string }) =>
          source.bar + ' ' + concat
      )
    );
    mapper
      .createMap(SimpleFoo, SimpleFooVm)
      .forMember((d) => d.fooBar, mapWithArguments(fooBarResolver));
  });

  afterEach(() => {
    mapper.dispose();
  });

  it('should map', () => {
    const foo = new SimpleFoo();
    foo.foo = 'foo';
    foo.fooBar = 2;

    const extra: Extra = { multiplier: 2 };

    let vm = mapper.map(foo, SimpleFooVm, SimpleFoo, {
      extraArguments: extra,
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

  it('should map with args for nested Bar', () => {
    const foo = new SimpleFoo();
    foo.foo = 'foo';
    foo.fooBar = 2;
    foo.bar = new SimpleBar();
    foo.bar.bar = 'bar';

    let vm = mapper.map(foo, SimpleFooVm, SimpleFoo, {
      extraArguments: { multiplier: 3 },
    });
    expect(vm.foo).toEqual(foo.foo);
    expect(vm.fooBar).toEqual(foo.fooBar * 3);
    expect(vm.bar.bar).toEqual(foo.bar.bar + ' default concat');

    vm = mapper.map(foo, SimpleFooVm, SimpleFoo, {
      extraArguments: { multiplier: 2, concat: 'concat this instead' },
    });
    expect(vm.fooBar).toEqual(foo.fooBar * 2);
    expect(vm.bar.bar).toEqual(foo.bar.bar + ' concat this instead');
  });

  it('should mapArray with args for nested Bar', () => {
    const foo = new SimpleFoo();
    foo.foo = 'foo';
    foo.fooBar = 2;
    foo.bar = new SimpleBar();
    foo.bar.bar = 'bar';

    const foo2 = new SimpleFoo();
    foo2.foo = 'foo2';
    foo2.fooBar = 3;
    foo2.bar = new SimpleBar();
    foo2.bar.bar = 'bar2';

    const foos = [foo, foo2];

    let vms = mapper.mapArray(foos, SimpleFooVm, SimpleFoo, {
      extraArguments: { multiplier: 3 },
    });

    vms.forEach((vm, index) => {
      expect(vm.fooBar).toEqual(foos[index].fooBar * 3);
      expect(vm.bar.bar).toEqual(foos[index].bar.bar + ' default concat');
    });

    vms = mapper.mapArray(foos, SimpleFooVm, SimpleFoo, {
      extraArguments: { multiplier: 2, concat: 'concat this instead' },
    });

    vms.forEach((vm, index) => {
      expect(vm.fooBar).toEqual(foos[index].fooBar * 2);
      expect(vm.bar.bar).toEqual(foos[index].bar.bar + ' concat this instead');
    });
  });
});
