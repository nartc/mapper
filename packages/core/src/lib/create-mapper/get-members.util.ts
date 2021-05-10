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
 * To understand this regex, read the comments at the end of this file.
 */
const RE_ARROW_FN_SELECTOR_PROPS = /(?:(?<=\[)(['"]).*?\1)|(?:(?<=\.)[^.[]+)/g;

/**
 * @param {string} fnSelectorStr A serialized and cleaned arrow function expression.
 * @returns Will return `null` if the given `fnSelector` doesn't match with anything.
 */
export function getMembersFromArrowFunctionExpr(
  fnSelectorStr: string
): string[] | null {
  const matches = fnSelectorStr.match(RE_ARROW_FN_SELECTOR_PROPS);
  // May be we could optimise the following by using `.exec`
  // to prevent doing `.map` and `.match`
  if (matches) {
    const RE_HAS_QUOTES = /^(['"]).*\1$/;
    return matches.map((match) =>
      match.match(RE_HAS_QUOTES)
        ? match.slice(1, -1) // drop the first and the last quotes
        : match
    );
  }

  return null;
}

/******************************************************************************

// Explanation of RE_ARROW_FN_SELECTOR_PROPS regex

(?:        # (begin of non-capturing group)
  (?<=     # (begin of positive lookbehind)
    \[     # matches a  literal "[" but without including it in the match result
  )        # (end of positive lookbehind)
  (        # (begin capturing group #1)
    ['"]   # match one occurrence of a single or double quotes characters
  )        # (end capturing group #1)
  .*?      # followed by 0 or more of any character, but match as few characters as possible (which is 0)
  \1       # followed by the result of capture group #1
)          # (end of non-capturing group)
|          # Or matches with...
(?:        # (begin of non-capturing group)
  (?<=     # (begin of positive lookbehind)
    \.     # matches a literal "." but without including it in the match result
  )        # (end of positive lookbehind)
  [^.[]+   # followed by 1 or more occurrences of any character but "." nor "["
)          # (end of non-capturing group)

******************************************************************************/
