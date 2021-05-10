import { getMembersFromArrowFunctionExpr } from '../get-members.util';

describe('getMembersFromArrowFunctionExpr', () => {
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
        const members = getMembersFromArrowFunctionExpr(fnSelector);
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
        const members = getMembersFromArrowFunctionExpr(fnSelector);
        expect(members).toStrictEqual(expectedOutput);
      }
    );
  });
});
