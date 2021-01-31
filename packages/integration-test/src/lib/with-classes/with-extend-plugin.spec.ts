import { classes } from '@automapper/classes';
import { createMapper } from '@automapper/core';
import { ErrorHandler } from '@automapper/types';
import {
  SimpleBar,
  SimpleBarVm,
  SimpleFoo,
  SimpleFooVm,
} from './fixtures/models/simple-foo-bar';

describe('with extends plugin', () => {
  const customClasses = (errorHandler: ErrorHandler) => {
    function nullify(srcObj: Record<string, unknown>) {
      for (const srcKey in srcObj) {
        if (srcObj[srcKey] === null) {
          srcObj[srcKey] = undefined;
        }

        if (
          typeof srcObj[srcKey] === 'object' &&
          !Array.isArray(srcObj[srcKey])
        ) {
          nullify(srcObj[srcKey] as Record<string, unknown>);
        }
      }
    }

    const originalClasses = classes(errorHandler);

    const originalPreMap = originalClasses.preMap;
    originalClasses.preMap = (...args) => {
      const originalPreMapResult = originalPreMap(...args);
      nullify(originalPreMapResult[0]);
      return originalPreMapResult;
    };

    return originalClasses;
  };

  const mapper = createMapper({
    name: 'customClasses',
    pluginInitializer: customClasses,
  });

  afterEach(() => {
    mapper.dispose();
  });

  it('should map', () => {
    mapper.createMap(SimpleBar, SimpleBarVm);

    const bar = new SimpleBar();
    bar.bar = 'string';
    const vm = mapper.map(bar, SimpleBarVm, SimpleBar);
    expect(vm.bar).toEqual(bar.bar);
  });

  it('should map null to undefined', () => {
    mapper.createMap(SimpleBar, SimpleBarVm);
    const bar = new SimpleBar();
    bar.bar = null;

    const vm = mapper.map(bar, SimpleBarVm, SimpleBar);
    expect(vm.bar).toEqual(undefined);
  });

  it('should map null to undefined for nested', () => {
    mapper.createMap(SimpleBar, SimpleBarVm);
    mapper.createMap(SimpleFoo, SimpleFooVm);

    const foo = new SimpleFoo();
    foo.fooBar = null;
    foo.foo = 'foo';
    foo.bar = new SimpleBar();
    foo.bar.bar = null;

    const vm = mapper.map(foo, SimpleFooVm, SimpleFoo);
    expect(vm.foo).toEqual(foo.foo);
    expect(vm.fooBar).toEqual(undefined);
    expect(vm.bar.bar).toEqual(undefined);
  });
});
