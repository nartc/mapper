import type { Selector } from '@automapper/types';

import { getMembersFromArrowFunctionExpr } from './get-members.util';

/**
 * Get a dot-separated string of the properties selected by a given `fn` selector
 * function.
 *
 * @example
 * ```js
 * getMemberPath(s => s.foo.bar) === 'foo.bar'
 * getMemberPath(s => s['foo']) === 'foo'
 * getMemberPath(s => s.foo['']) === 'foo.'
 * // invalid usage
 * getMemberPath(s => s) === ''
 * ```
 */
export function getMemberPath(fn: Selector): string {
  const fnString = fn
    .toString()
    // .replace(/\/\* istanbul ignore next \*\//g, '')
    .replace(/cov_.+\n/g, '');

  // ES6 prop selector:
  // "x => x.prop"
  if (fnString.includes('=>')) {
    const cleaned = cleanseAssertionOperators(fnString);
    // Note that we don't need to remove the `return` keyword because, for instance,
    // `(x) => { return x.prop }` will be turn into `x=>returnx.prop` (cleaned)
    // thus we'll still be able to get only the string `prop` properly.
    const members = getMembersFromArrowFunctionExpr(cleaned);
    return members ? members.join('.') : '';
  }

  // ES5 prop selector:
  // "function (x) { return x.prop; }"
  // webpack production build excludes the spaces and optional trailing semicolon:
  //   "function(x){return x.prop}"
  // FYI - during local dev testing i observed carriage returns after the curly brackets as well
  // Note by maintainer: See https://github.com/IRCraziestTaxi/ts-simple-nameof/pull/13#issuecomment-567171802 for
  // explanation of this regex.
  const matchRegex = /function\s*\(\w+\)\s*{[\r\n\s]*return\s+\w+\.((\w+\.)*(\w+))/i;

  const es5Match = fnString.match(matchRegex);

  if (es5Match) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return es5Match[1]!;
  }

  return '';
}

/**
 * @param {string} parsedName
 * @returns {string} The given `parseName` but without curly brackets, blank
 * spaces, semicolons, parentheses, "?" and "!" characters.
 */
function cleanseAssertionOperators(parsedName: string): string {
  return parsedName.replace(/[\s{}()?!;]+/gm, '');
}
