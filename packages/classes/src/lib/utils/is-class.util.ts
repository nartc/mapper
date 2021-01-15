/**
 * Check for if a passed in `fn` is a Class constructor
 *
 * @param {Function} fn
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function isClass(fn: Function): boolean {
  const typeOfFn = typeof fn;
  const fnString = fn.toString();
  const constructorFnString = fn.prototype?.constructor?.toString();
  return (
    typeOfFn === 'function' &&
    !!constructorFnString &&
    (/^\s*function/.test(fnString) || /^\s*class/.test(fnString)) &&
    !!fn.name &&
    fnString.includes(fn.name)
  );
}
