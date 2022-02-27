import { setupClasses } from '../setup.spec';
import {
  BarWithFoo,
  BarWithFooZeroDepth,
} from './fixtures/models/circular-deps-bar';
import {
  FooWithBar,
  FooWithBarZeroDepth,
} from './fixtures/models/circular-deps-foo';

describe('Circular Dependencies', () => {
  const [mapper] = setupClasses('circularDeps');

  it('should map with depth of 1', () => {
    mapper.createMap(BarWithFoo, BarWithFoo);
    mapper.createMap(FooWithBar, FooWithBar);

    const vm = mapper.map(
      { id: '1', bar: { foo: { id: '2', bar: null }, id: '1' } },
      FooWithBar,
      FooWithBar
    );

    expect(vm).toBeTruthy();
    expect(vm.id).toEqual('1');
    expect(vm.bar).toBeInstanceOf(BarWithFoo);
    expect(vm.bar?.foo).toBeInstanceOf(FooWithBar);
  });

  it('should map with depth of 0', () => {
    mapper.createMap(BarWithFooZeroDepth, BarWithFooZeroDepth);
    mapper.createMap(FooWithBarZeroDepth, FooWithBarZeroDepth);

    const vm = mapper.map(
      { id: '1', bar: { foo: { id: '2', bar: null }, id: '1' } },
      FooWithBarZeroDepth,
      FooWithBarZeroDepth
    );
    expect(vm).toBeTruthy();
    expect(vm.id).toEqual('1');
    expect(vm.bar).toBeInstanceOf(BarWithFooZeroDepth);
    expect(vm.bar?.foo).toBeInstanceOf(FooWithBarZeroDepth);
  });
});
