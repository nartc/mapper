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

  it('should map', () => {
    mapper.createMap(SimpleBar, SimpleBarVm);
    mapper.createMap(SimpleFoo, SimpleFooVm).forMember(
      (d) => d.fooBar,
      mapWithArguments(
        (source, { multiplier }: { multiplier: number }) =>
          source.fooBar * multiplier
      )
    );

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
});
