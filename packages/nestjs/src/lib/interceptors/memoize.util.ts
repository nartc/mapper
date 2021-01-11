const defaultKey = 'default';

// eslint-disable-next-line @typescript-eslint/ban-types
export function memoize(fn: Function) {
  const cache = {};
  return (...args) => {
    const n =
      args.reduce(
        (key, arg) =>
          key.concat('|', typeof arg === 'string' ? arg : arg.toString()),
        ''
      ) || defaultKey;
    if (n in cache) {
      return cache[n];
    }

    const result = n === defaultKey ? fn() : fn(...args);
    cache[n] = result;
    return result;
  };
}
