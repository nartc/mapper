export function isClass(fn: Function | Object): boolean {
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
