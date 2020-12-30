/**
 * Check for if a passed in `fn` is a Class constructor
 *
 * @param {Function} fn
 */
export function isClass(fn: unknown): boolean {
  const typeOfFn = typeof fn;
  const constructorFnString = fn.constructor?.toString();
  return (
    (typeOfFn === 'object' || typeOfFn === 'function') &&
    fn.constructor &&
    (/^\s*function/.test(constructorFnString) ||
      /^\s*class/.test(constructorFnString)) &&
    constructorFnString.includes(fn.constructor.name)
  );
}
