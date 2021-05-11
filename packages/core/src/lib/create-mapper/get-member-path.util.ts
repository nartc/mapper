import type { Selector } from '@automapper/types';

/**
 * An regular expression to match will all property names of a given cleaned
 * arrow function expression. Note that if there is some computed names thus
 * they are returning if the quotes.
 *
 * @example
 * ```js
 * "s=>s.foo['bar']".match(RE_ARROW_FN_SELECTOR_PROPS)
 * // will return
 * ["foo", "'bar'"]
 * ```
 *
 * ### Explanation:
 * ```
 * (?:        // (begin of non-capturing group)
 *   (?<=     // (begin of positive lookbehind)
 *     \[     // matches a  literal "[" but without including it in the match result
 *   )        // (end of positive lookbehind)
 *   (        // (begin capturing group #1)
 *     ['"]   // match one occurrence of a single or double quotes characters
 *   )        // (end capturing group #1)
 *   (        // (begin capturing group #2)
 *     .*?    // followed by 0 or more of any character, but match as few characters as possible (which is 0)
 *   )        // (end capturing group #2)
 *   \1       // followed by the result of capture group #1
 * )          // (end of non-capturing group)
 * |          // Or matches with...
 * (?:        // (begin of non-capturing group)
 *   (?<=     // (begin of positive lookbehind)
 *     \.     // matches a literal "." but without including it in the match result
 *   )        // (end of positive lookbehind)
 *   [^.[]+   // followed by 1 or more occurrences of any character but "." nor "["
 * )          // (end of non-capturing group)
 * ```
 */
const RE_FN_SELECTOR_PROPS = /(?:(?<=\[)(['"])(.*?)\1)|(?:(?<=\.)[^.[]+)/g;

/**
 * For a given cleaned and serialzed JS function selector expression, return a
 * list of all members that were selected.
 *
 * @returns `null` if the given `fnSelector` doesn't match with anything.
 */
export function getMembers(fnSelectorStr: string): string[] | null {
  let matches = RE_FN_SELECTOR_PROPS.exec(fnSelectorStr);

  if (!matches) return null;

  const members: string[] = [];
  do {
    // Use the value of the second captured group or the entire match, since
    // we do not want to capture the matching quotes (when any)
    const propFound = matches[2] ?? matches[0];
    //                           ^^ Using the nullish operator since the left
    //                              side could be an empty string, which is falsy.
    members.push(propFound);
  } while ((matches = RE_FN_SELECTOR_PROPS.exec(fnSelectorStr)));

  return members;
}

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

  const cleaned = cleanseAssertionOperators(fnString);

  // Note that we don't need to remove the `return` keyword because, for instance,
  // `(x) => { return x.prop }` will be turn into `x=>returnx.prop` (cleaned)
  // thus we'll still be able to get only the string `prop` properly.
  // The same for `function (x){}`
  const members = getMembers(cleaned);

  return members ? members.join('.') : '';
}

/**
 * @returns {string} The given `parseName` but without curly brackets, blank
 * spaces, semicolons, parentheses, "?" and "!" characters.
 */
function cleanseAssertionOperators(parsedName: string): string {
  return parsedName.replace(/[\s{}()?!;]+/gm, '');
}
