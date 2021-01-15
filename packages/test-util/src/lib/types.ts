export interface AbstractType<T> extends Function {
  prototype: T;
}

export interface Type<T> extends Function {
  new (...args: unknown[]): T;
}

type Writable<T> = { -readonly [P in keyof T]: T[P] };

export interface CompatibleSpy extends jasmine.Spy {
  /**
   * By chaining the spy with and.returnValue, all calls to the function will return a specific
   * value.
   */
  andReturn(val: unknown): void;

  /**
   * By chaining the spy with and.callFake, all calls to the spy will delegate to the supplied
   * function.
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  andCallFake(fn: Function): this;

  /**
   * removes all recorded calls
   */
  reset(): void;
}

export type BaseSpyObject<T> = T &
  // eslint-disable-next-line @typescript-eslint/ban-types
  { [P in keyof T]: T[P] extends Function ? T[P] & CompatibleSpy : T[P] } & {
    /**
     * Casts to type without readonly properties
     */
    castToWritable(): Writable<T>;
  };
