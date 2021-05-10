import { getMemberPath } from '../get-member-path.util';

describe('getMemberPath', () => {
  interface Foo {
    foo: string;

    bar: {
      baz: string;
      ['']: string;
    };

    returnFoo: string;
    snake_case: string;

    'odd-property': string;
    'even[odd].prop': string;
    á: string;
    with_sṕéçiâl_chàrs: string;
  }

  it('should return properly for ES6 arrow syntax', () => {
    let path: ReturnType<typeof getMemberPath>;

    path = getMemberPath((s: Foo) => s.foo);
    expect(path).toEqual('foo');

    path = getMemberPath((s: Foo) => s['foo']);
    expect(path).toEqual('foo');

    path = getMemberPath((s: Foo) => s['snake_case']);
    expect(path).toEqual('snake_case');

    path = getMemberPath((s: Foo) => s.snake_case);
    expect(path).toEqual('snake_case');

    path = getMemberPath((s: Foo) => s['odd-property']);
    expect(path).toEqual('odd-property');

    path = getMemberPath((s: Foo) => s.snake_case);
    expect(path).toEqual('snake_case');

    path = getMemberPath((s: Foo) => s['even[odd].prop']);
    expect(path).toEqual('even[odd].prop');

    path = getMemberPath((s: Foo) => s.á);
    expect(path).toEqual('á');

    path = getMemberPath((s: Foo) => s['with_sṕéçiâl_chàrs']);
    expect(path).toEqual('with_sṕéçiâl_chàrs');
  });

  it('should return properly for nested path for ES6 arrow syntax', () => {
    let path: ReturnType<typeof getMemberPath>;

    path = getMemberPath((s: Foo) => s.bar.baz);
    expect(path).toEqual('bar.baz');

    path = getMemberPath((s: Foo) => s['bar']['baz']);
    expect(path).toEqual('bar.baz');

    path = getMemberPath((s: Foo) => s.bar.baz['']);
    expect(path).toEqual('bar.baz.');
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

  it('should return properly for properties with return keyword', () => {
    let path: ReturnType<typeof getMemberPath>;

    path = getMemberPath((s: Foo) => s.returnFoo);
    expect(path).toEqual('returnFoo');
    path = getMemberPath((s: Foo) => s['returnFoo']);
    expect(path).toEqual('returnFoo');

    path = getMemberPath((s: Foo) => {
      return s.returnFoo;
    });
    expect(path).toEqual('returnFoo');

    path = getMemberPath((s: Foo) => {
      return s['returnFoo'];
    });
    expect(path).toEqual('returnFoo');

    path = getMemberPath((s: Foo) => {
      return s.bar['baz'];
    });
    expect(path).toEqual('bar.baz');

    path = getMemberPath(function (s: Foo) {
      return s.returnFoo;
    });
    expect(path).toEqual('returnFoo');
  });

  describe('For non supported use cases', () => {
    it('should return empty string for ES5 function syntax using computed names', () => {
      let path: ReturnType<typeof getMemberPath>;

      path = getMemberPath(function (s: Foo) {
        return s['bar']['baz'];
      });
      expect(path).toEqual('');

      path = getMemberPath(function (s: Foo) {
        return s['foo'];
      });
      expect(path).toEqual('');

      path = getMemberPath(function (s: Foo) {
        return s['returnFoo'];
      });
      expect(path).toEqual('');
    });

    it('should return the wrong output', () => {
      let path: ReturnType<typeof getMemberPath>;

      path = getMemberPath((s: Foo) => s[' foo ']);
      expect(path).toEqual('foo');

      path = getMemberPath((s: Foo) => s['odd' + '-' + 'property']);
      expect(path).toEqual('odd');

      // Since template strings are not allowed
      path = getMemberPath((s: Foo) => s[`${'odd-property'}`]);
      expect(path).toEqual('');
    });
  });
});
