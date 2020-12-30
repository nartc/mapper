import { getMemberPath } from '@automapper/core';

describe('getMemberPath', () => {
  interface Foo {
    foo: string;
    bar: {
      baz: string;
    };
    returnFoo: string;
    'odd-property': string;
  }

  it('should return properly for ES6 arrow syntax', () => {
    const path = getMemberPath((s: Foo) => s.foo);
    expect(path).toEqual('foo');
  });

  it('should return properly for nested path for ES6 arrow syntax', () => {
    const path = getMemberPath((s: Foo) => s.bar.baz);
    expect(path).toEqual('bar.baz');
  });

  it('should return properly for ES5 function syntax', () => {
    const path = getMemberPath(function (s: Foo) {
      return s.foo;
    });
    expect(path).toEqual('foo');
  });

  it('should return properly for nested path for ES5 function syntax', () => {
    const path = getMemberPath(function (s: Foo) {
      return s.bar.baz;
    });
    expect(path).toEqual('bar.baz');
  });

  it('should return properly for mixed', () => {
    const path = getMemberPath((s: Foo) => {
      return s.foo;
    });
    expect(path).toEqual('foo');
  });

  it('should return properly for properties with return keyword', () => {
    let path = getMemberPath((s: Foo) => s.returnFoo);
    expect(path).toEqual('returnFoo');

    path = getMemberPath((s: Foo) => {
      return s.returnFoo;
    });
    expect(path).toEqual('returnFoo');

    path = getMemberPath(function (s: Foo) {
      return s.returnFoo;
    });
    expect(path).toEqual('returnFoo');
  });

  // TODO: need to implement this
  it('should return empty string with odd property', () => {
    let path = getMemberPath((s: Foo) => s['odd-property']);
    expect(path).toEqual('');

    path = getMemberPath(function (s: Foo) {
      return s['odd-property'];
    });
    expect(path).toEqual('');
  });
});
