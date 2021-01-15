import type { AbstractType, BaseSpyObject, CompatibleSpy, Type } from './types';

export type SpyObject<T> = BaseSpyObject<T> &
  {
    [P in keyof T]: T[P] &
      (T[P] extends (...args: unknown[]) => infer R ? jest.Mock<R> : T[P]);
  };

/**
 * @internal
 */

function installProtoMethods<T>(
  mock: unknown,
  proto: unknown,
  // eslint-disable-next-line @typescript-eslint/ban-types
  createSpyFn: Function
): void {
  if (proto === null || proto === Object.prototype) {
    return;
  }

  for (const key of Object.getOwnPropertyNames(proto)) {
    const descriptor = Object.getOwnPropertyDescriptor(proto, key);

    if (!descriptor) {
      continue;
    }

    if (
      typeof descriptor.value === 'function' &&
      key !== 'constructor' &&
      typeof mock[key] === 'undefined'
    ) {
      mock[key] = createSpyFn(key);
      // eslint-disable-next-line no-prototype-builtins
    } else if (descriptor.get && !mock.hasOwnProperty(key)) {
      Object.defineProperty(mock, key, {
        set: (value) => (mock[`_${key}`] = value),
        get: () => mock[`_${key}`],
        configurable: true,
      });
    }
  }

  installProtoMethods(mock, Object.getPrototypeOf(proto), createSpyFn);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (mock as BaseSpyObject<T>).castToWritable = () => mock as any;
}

/**
 * @publicApi
 */
export function createSpyObject<T>(
  type: Type<T> | AbstractType<T>,
  template?: Partial<Record<keyof T, unknown>>
): SpyObject<T> {
  const mock: unknown = { ...template } || {};

  installProtoMethods(mock, type.prototype, () => {
    const jestFn = jest.fn();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newSpy: CompatibleSpy = jestFn as any;

    // eslint-disable-next-line @typescript-eslint/ban-types
    newSpy.andCallFake = (fn: Function) => {
      jestFn.mockImplementation(fn as (...args: unknown[]) => unknown);

      return newSpy;
    };

    newSpy.andReturn = (val: unknown) => {
      jestFn.mockReturnValue(val);
    };

    newSpy.reset = () => {
      jestFn.mockReset();
    };

    return newSpy;
  });

  return mock as SpyObject<T>;
}
