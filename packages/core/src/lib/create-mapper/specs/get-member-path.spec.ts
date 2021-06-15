import { getMemberPath, getMembers } from '../get-member-path.util';

describe('getMembers', () => {
  describe('cases that are allowed', () => {
    const cases: Array<[(obj: any) => any, string[] | null]> = [
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

      [(s) => s['fo' + 'o'], ['foo']], // expected to be ['foo']
      // eslint-disable-next-line no-constant-condition
      [(s) => s[true ? 'foo' : 'bar'], ['foo']], // expected to be ['foo']
      [(s) => s[true && 'foo'], ['foo']], // expected to be ['foo']
      [(s) => s[`a`], ['a']], // To discourage the use of computed names
    ];

    test.each(cases)(
      'for "%s" should return %p list',
      (fnSelector, expectedOutput) => {
        const members = getMembers(fnSelector);
        expect(members).toStrictEqual(expectedOutput);
      }
    );
  });

  describe('cases that are disallowed', () => {
    const cases: Array<[(obj: any) => any, (string | symbol)[] | null]> = [
      [(s) => s, null], // Not a real one tho
      [(s) => s`foo`, null],
      [(s) => s[`foo`](), null], //user mustn't call the proxy method
      [() => null, null], // if null passed
      [() => undefined, null], // if undefined passed
      [(s) => s[Symbol()], null], // I'm not sure if we should support this
    ];

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
    [' foo ']: {
      [' bar ']: {
        baz: string;
      };
    };
    [' odd-property ']: {
      [' odd+property ']: {
        baz: string;
      };
    };
  }

  it('should return properly for ES6 arrow syntax', () => {
    let path: ReturnType<typeof getMemberPath>;

    const namedOne = (s: Foo) => s.foo;
    path = getMemberPath(namedOne);
    expect(path).toEqual(['foo']);

    const namedOne2 = (s: Foo) => s['foo'];
    path = getMemberPath(namedOne2);
    expect(path).toEqual(['foo']);

    path = getMemberPath((s: Foo) => s['snake_case']);
    expect(path).toEqual(['snake_case']);

    path = getMemberPath((s: Foo) => s.snake_case);
    expect(path).toEqual(['snake_case']);

    path = getMemberPath((s: Foo) => s['odd-property']);
    expect(path).toEqual(['odd-property']);

    path = getMemberPath((s: Foo) => s.snake_case);
    expect(path).toEqual(['snake_case']);

    path = getMemberPath((s: Foo) => s['even[odd].prop']);
    expect(path).toEqual(['even[odd].prop']);

    path = getMemberPath((s: Foo) => s.á);
    expect(path).toEqual(['á']);

    path = getMemberPath((s: Foo) => s['with_sṕéçiâl_chàrs']);
    expect(path).toEqual(['with_sṕéçiâl_chàrs']);

    path = getMemberPath((s: Foo) => s[' foo ']);
    expect(path).toEqual([' foo ']);

    path = getMemberPath((s: Foo) => s['odd' + '-' + 'property']);
    expect(path).toEqual(['odd-property']);

    path = getMemberPath((s: Foo) => s[`${'odd-property'}`]);
    expect(path).toEqual(['odd-property']);

    path = getMemberPath((s: Foo) => s['.startDot']);
    expect(path).toEqual(['.startDot']);

    path = getMemberPath((s: Foo) => s['mid.Dot']);
    expect(path).toEqual(['mid.Dot']);

    path = getMemberPath((s: Foo) => s['endDot.']);
    expect(path).toEqual(['endDot.']);
  });

  it('should return properly for nested path for ES6 arrow syntax', () => {
    let path: ReturnType<typeof getMemberPath>;

    path = getMemberPath((s: Foo) => s.bar.baz);
    expect(path).toEqual(['bar', 'baz']);

    path = getMemberPath((s: Foo) => s['bar']['baz']);
    expect(path).toEqual(['bar', 'baz']);

    path = getMemberPath((s: Foo) => s.bar.baz['']);
    expect(path).toEqual(['bar', 'baz', '']);

    path = getMemberPath((s: Foo) => s[' foo '][' bar '].baz);
    expect(path).toEqual([' foo ', ' bar ', 'baz']);

    path = getMemberPath(
      (s: Foo) => s['odd' + '-' + 'property']['odd' + '+' + 'property']
    );
    expect(path).toEqual(['odd-property', 'odd+property']);

    path = getMemberPath(
      (s: Foo) => s[`${'odd-property'}`][`${'odd+property'}`].baz
    );
    expect(path).toEqual(['odd-property', 'odd+property', 'baz']);

    path = getMemberPath((s: Foo) => s.bar.baz['']['']['']);
    expect(path).toEqual(['bar', 'baz', '', '', '']);

    path = getMemberPath((s: Foo) => s['mid.Dot']['.startDot']);
    expect(path).toEqual(['mid.Dot', '.startDot']);
  });

  it('should return properly for ES5 function syntax', () => {
    let path: ReturnType<typeof getMemberPath>;

    path = getMemberPath(function (s: Foo) {
      return s.foo;
    });
    expect(path).toEqual(['foo']);

    path = getMemberPath(function namedOne(s: Foo) {
      return s.foo;
    });
    expect(path).toEqual(['foo']);

    path = getMemberPath(function (s: Foo) {
      return s['foo'];
    });
    expect(path).toEqual(['foo']);

    path = getMemberPath(function (s: Foo) {
      return s[' odd' + '-' + 'property '];
    });
    expect(path).toEqual([' odd-property ']);

    path = getMemberPath(function (s: Foo) {
      return s[`${'odd-property'}`];
    });
    expect(path).toEqual(['odd-property']);
  });

  it('should return properly for nested path for ES5 function syntax', () => {
    let path: ReturnType<typeof getMemberPath>;

    path = getMemberPath(function (s: Foo) {
      return s.bar.baz;
    });
    expect(path).toEqual(['bar', 'baz']);

    path = getMemberPath(function (s: Foo) {
      return s['bar']['baz'];
    });
    expect(path).toEqual(['bar', 'baz']);
  });

  it('should return properly for properties with return keyword', () => {
    let path: ReturnType<typeof getMemberPath>;

    path = getMemberPath((s: Foo) => s.returnFoo);
    expect(path).toEqual(['returnFoo']);
    path = getMemberPath((s: Foo) => s['returnFoo']);
    expect(path).toEqual(['returnFoo']);

    path = getMemberPath((s: Foo) => {
      return s.returnFoo;
    });
    expect(path).toEqual(['returnFoo']);

    path = getMemberPath((s: Foo) => {
      return s['returnFoo'];
    });
    expect(path).toEqual(['returnFoo']);

    path = getMemberPath((s: Foo) => {
      return s.bar['baz'];
    });
    expect(path).toEqual(['bar', 'baz']);

    path = getMemberPath(function (s: Foo) {
      return s.returnFoo;
    });
    expect(path).toEqual(['returnFoo']);

    path = getMemberPath(function (s: Foo) {
      return s['returnFoo'];
    });
    expect(path).toEqual(['returnFoo']);

    path = getMemberPath((s: Foo) => s['.startDot']);
    expect(path).toEqual(['.startDot']);

    path = getMemberPath((s: Foo) => {
      return s['mid.Dot'];
    });
    expect(path).toEqual(['mid.Dot']);

    path = getMemberPath(function (s: Foo) {
      return s['mid.Dot']['.startDot'];
    });
    expect(path).toEqual(['mid.Dot', '.startDot']);

    path = getMemberPath(function (s: Foo) {
      return s['endDot.'];
    });
    expect(path).toEqual(['endDot.']);
  });
});
