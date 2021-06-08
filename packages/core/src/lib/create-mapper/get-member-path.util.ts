import type { Selector } from '@automapper/types';

const PROXY_OBJECT = createProxy(() => undefined);

/**
 * For a given cleaned and serialzed JS function selector expression, return a
 * list of all members that were selected.
 *
 * @returns `null` if the given `fnSelector` doesn't match with anything.
 */
export function getMembers(fnSelector: Selector<any, unknown | (() => string[])>): string[] | null {
  // Making sure that the shared constant `/g` regex is in its initial state.
  const resultProxy = fnSelector(PROXY_OBJECT) as () => string[];
  if (typeof resultProxy !== 'function') {
    return null;
  }
  const members: string[] = Array.isArray(resultProxy) ? resultProxy : resultProxy();
  if (members.length === 0 || members.find(m => typeof m === 'symbol')) {
    return null;
  }
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
  // Note that we don't need to remove the `return` keyword because, for instance,
  // `(x) => { return x.prop }` will be turn into `x=>returnx.prop` (cleaned)
  // thus we'll still be able to get only the string `prop` properly.
  // The same for `function (x){}`
  const members = getMembers(fn);

  return members ? members.join('.') : '';
}

/**
 * @returns {Proxy} A proxy that's wrap on the target object and track of
 * the path of accessed nested properties
 */
// eslint-disable-next-line @typescript-eslint/ban-types
function createProxy<T extends object>(target: T, path: string[] = []): T {
  const realTraps: ProxyHandler<T> = {
    get(target: T, p: string): any {
      const childPath = path.slice();
      childPath.push(p);
      return createProxy(() => undefined, childPath);
    },
    apply(): any {
      return path;
    }
  };
  return new Proxy(target, realTraps);
}
