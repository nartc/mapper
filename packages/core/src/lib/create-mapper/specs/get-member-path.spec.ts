import { getMembers, getMemberPath } from '../get-member-path.util';

describe('getMembers', () => {
  describe('cases that are allowed', () => {
    const cases = [
      [(something) => something.foo, ['foo']],
      [(s) => s.foo, ['foo']],
      [(s) => s.foo.bar, ['foo', 'bar']],
      [(s) => s.returnFoo, ['returnFoo']],
      [(s) => s.return_foo, ['return_foo']],

      [(s) => s[' aaa '], [' aaa ']],
      [(s) => s['aaa'], ['aaa']],
      [(s) => s['ab-cd'], ['ab-cd']],
      [(s) => s['ab_cd'], ['ab_cd']],

      [(s) => s['bbb'].bar, ['bbb', 'bar']],
      [(s) => s.bbb['bar'], ['bbb', 'bar']],

      [(s) => s['aaa']['ddd'], ['aaa', 'ddd']],
      [(s) => s['aaa'].ccc['ddd'], ['aaa', 'ccc', 'ddd']],

      [(s) => s['.foo.bar'], ['.foo.bar']],
      [(s) => s['foo=>s[bar'], ['foo=>s[bar']],
      [(s) => s["['a']"], ["['a']"]],
      [(s) => s['bad[foo]'], ['bad[foo]']],
      [(s) => s.bar['bad[foo]'], ['bar', 'bad[foo]']],
      [(s) => s["'a"], ["'a"]],
      [(s) => s['aa']['bo"o'], ['aa', 'bo"o']],

      [(s) => s['with_sṕéçiâl_chàrs'], ['with_sṕéçiâl_chàrs']],

      [(s) => s['á'], ['á']],
      [(s) => s.á, ['á']],
      [(s) => s.good.á, ['good', 'á']],
      [(s) => s['good'].á, ['good', 'á']],
      [(s) => s.á['good'], ['á', 'good']],

      [(s) => s[''], ['']],
      [(s) => s.foo[''], ['foo', '']],
      [(s) => s[''].foo, ['', 'foo']],
    ].map<[serializedSelector: string, members: string[]]>(([fn, expected]) => [
      fn.toString(),
      expected as string[],
    ]);

    test.each(cases)(
      'for "%s" should return %p list',
      (fnSelector, expectedOutput) => {
        const members = getMembers(fnSelector);
        expect(members).toStrictEqual(expectedOutput);
      }
    );
  });

  describe('cases that are disallowed', () => {
    const cases = [
      [(s) => s, null], // Not a real one tho
      [(s) => s`foo`, null],

      // Known limitations that should be avoided in user land code because
      // they will produce wrong outputs and cannot be detected beforehand
      [(s) => s['fo' + 'o'], ['fo']], // expected to be ['foo']
      // eslint-disable-next-line no-constant-condition
      [(s) => s[true ? 'foo' : 'bar'], null], // expected to be ['foo']
      [(s) => s[true && 'foo'], null], // expected to be ['foo']

      [(s) => s[Symbol()], null], // I'm not sure if we should support this
      [(s) => s[`a`], null], // To discourage the use of computed names
    ].map<[serializedSelector: string, members: string[]]>(([fn, expected]) => [
      fn.toString(),
      expected as string[],
    ]);

    test.each(cases)(
      'for "%s" should return %p',
      (fnSelector, expectedOutput) => {
        const members = getMembers(fnSelector);
        expect(members).toStrictEqual(expectedOutput);
      }
    );
  });
});

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

    const namedOne = (s: Foo) => s.foo;
    path = getMemberPath(namedOne);
    expect(path).toEqual('foo');

    const namedOne2 = (s: Foo) => s['foo'];
    path = getMemberPath(namedOne2);
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
    let path: ReturnType<typeof getMemberPath>;

    path = getMemberPath(function (s: Foo) {
      return s.foo;
    });
    expect(path).toEqual('foo');

    path = getMemberPath(function namedOne(s: Foo) {
      return s.foo;
    });
    expect(path).toEqual('foo');

    path = getMemberPath(function (s: Foo) {
      return s['foo'];
    });
    expect(path).toEqual('foo');
  });

  it('should return properly for nested path for ES5 function syntax', () => {
    let path: ReturnType<typeof getMemberPath>;

    path = getMemberPath(function (s: Foo) {
      return s.bar.baz;
    });
    expect(path).toEqual('bar.baz');

    path = getMemberPath(function (s: Foo) {
      return s['bar']['baz'];
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

    path = getMemberPath(function (s: Foo) {
      return s['returnFoo'];
    });
    expect(path).toEqual('returnFoo');
  });

  describe('For non supported use cases', () => {
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
