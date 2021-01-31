import { setupClasses } from '../setup.spec';
import {
  SimpleBarWithUnion,
  SimpleBarWithUnionVm,
  SimpleFooWithUnion,
  SimpleFooWithUnionVm,
} from './fixtures/models/simple-foo-bar-with-union';

describe('withUnion', () => {
  const [mapper] = setupClasses('mapper');

  it('should map', () => {
    mapper.createMap(SimpleBarWithUnion, SimpleBarWithUnionVm);
    mapper.createMap(SimpleFooWithUnion, SimpleFooWithUnionVm);

    const foo = new SimpleFooWithUnion();
    foo.foo = null;
    foo.fooBar = 123;
    foo.bar = new SimpleBarWithUnion();
    foo.bar.bar = 'barBar';

    const vm = mapper.map(foo, SimpleFooWithUnionVm, SimpleFooWithUnion);
    expect(vm.foo).toEqual(foo.foo);
    expect(vm.fooBar).toEqual(foo.fooBar);
    expect(vm.bar?.bar).toEqual(foo.bar.bar);
  });

  it('should map for all null', () => {
    mapper.createMap(SimpleBarWithUnion, SimpleBarWithUnionVm);
    mapper.createMap(SimpleFooWithUnion, SimpleFooWithUnionVm);

    const foo = new SimpleFooWithUnion();
    foo.foo = null;
    foo.fooBar = null;
    foo.bar = null;

    const vm = mapper.map(foo, SimpleFooWithUnionVm, SimpleFooWithUnion);
    expect(vm.foo).toEqual(null);
    expect(vm.fooBar).toEqual(null);
    expect(vm.bar).toEqual(null);
  });
});
