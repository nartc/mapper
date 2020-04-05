export function isClass(fn: Function | Object): boolean {
  return (
    (typeof fn === 'object' || typeof fn === 'function') &&
    fn.constructor &&
    (/^\s*function/.test(fn.constructor.toString()) ||
      /^\s*class/.test(fn.constructor.toString())) &&
    fn.constructor.toString().includes(fn.constructor.name)
  );
}
