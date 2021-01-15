import * as assert from 'assert';
import * as utils from 'expect/build/jasmineUtils';

let registry = new Set();

const getCallLine = () => new Error().stack.split('\n')[4];

const checkArgumentMatchers = (expectCall, args) => (match, matcher, i) => {
  // Propagate failure to the end
  if (!match) {
    return false;
  }

  const arg = args[i];

  // Assert the match for better messaging during a failure
  if (expectCall) {
    expect(arg).toEqual(matcher);
  }

  return utils.equals(arg, matcher);
};

export interface IWhenMock<T = unknown, Y extends unknown[] = unknown[]>
  extends jest.MockInstance<T, Y> {
  calledWith(...matchers: Y): this;

  expectCalledWith(...matchers: Y): this;

  mockReturnValue(value: T): this;

  mockReturnValueOnce(value: T): this;

  mockResolvedValue(value: jest.ResolvedValue<T>): this;

  mockResolvedValueOnce(value: jest.ResolvedValue<T>): this;

  mockRejectedValue(value: jest.RejectedValue<T>): this;

  mockRejectedValueOnce(value: jest.RejectedValue<T>): this;

  mockImplementation(fn: (...args: Y) => T): this;

  mockImplementationOnce(fn?: (...args: Y) => T): this;
}

export type When = <T, Y extends unknown[]>(
  fn: jest.MockInstance<T, Y>
) => IWhenMock<T, Y>;

class WhenMock {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callMocks: any[];

  constructor(fn, defaultImplementation = null) {
    // Incrementing ids assigned to each call mock to help with sorting as new mocks are added
    this.nextCallMockId = 0;
    this.fn = fn;
    fn.__whenMock__ = this;
    this.callMocks = [];
    this._origMock = fn.getMockImplementation();

    if (defaultImplementation) {
      this.fn.mockImplementation(() => {
        throw new Error(
          'Unintended use: Only use default value in combination with .calledWith(..), ' +
            'or use standard mocking without jest-when.'
        );
      });
    }

    const _mockImplementation = (matchers, expectCall, once = false) => (
      mockImplementation
    ) => {
      // To enable dynamic replacement during a test:
      // * call mocks with equal matchers are removed
      // * `once` mocks are used prioritized
      this.callMocks = this.callMocks
        .filter(
          (callMock) =>
            once || callMock.once || !utils.equals(callMock.matchers, matchers)
        )
        .concat({
          matchers,
          mockImplementation,
          expectCall,
          once,
          called: false,
          id: this.nextCallMockId,
          callLine: getCallLine(),
        })
        .sort((a, b) => {
          // Once mocks should appear before the rest
          if (a.once !== b.once) {
            return a.once ? -1 : 1;
          }
          return a.id - b.id;
        });

      this.nextCallMockId++;

      this.fn.mockImplementation((...args) => {
        for (let i = 0; i < this.callMocks.length; i++) {
          const {
            matchers,
            mockImplementation,
            expectCall,
            once,
            called,
          } = this.callMocks[i];

          // Do not let a once mock match more than once
          if (once && called) continue;

          const isMatch =
            args.length === matchers.length &&
            matchers.reduce(checkArgumentMatchers(expectCall, args), true);

          if (isMatch) {
            this.callMocks[i].called = true;
            return mockImplementation(...args);
          }
        }

        return defaultImplementation
          ? defaultImplementation(...args)
          : undefined;
      });

      return {
        ...this,
        ...mockFunctions(matchers, expectCall),
      };
    };

    const mockFunctions = (matchers, expectCall) => ({
      mockReturnValue: (returnValue) =>
        _mockImplementation(matchers, expectCall)(() => returnValue),
      mockReturnValueOnce: (returnValue) =>
        _mockImplementation(matchers, expectCall, true)(() => returnValue),
      mockResolvedValue: (returnValue) =>
        _mockImplementation(
          matchers,
          expectCall
        )(() => Promise.resolve(returnValue)),
      mockResolvedValueOnce: (returnValue) =>
        _mockImplementation(
          matchers,
          expectCall,
          true
        )(() => Promise.resolve(returnValue)),
      mockRejectedValue: (err) =>
        _mockImplementation(matchers, expectCall)(() => Promise.reject(err)),
      mockRejectedValueOnce: (err) =>
        _mockImplementation(
          matchers,
          expectCall,
          true
        )(() => Promise.reject(err)),
      mockImplementation: (implementation) =>
        _mockImplementation(matchers, expectCall)(implementation),
      mockImplementationOnce: (implementation) =>
        _mockImplementation(matchers, expectCall, true)(implementation),
    });

    this.mockImplementation = (mockImplementation) =>
      new WhenMock(fn, mockImplementation);
    this.mockReturnValue = (returnValue) =>
      this.mockImplementation(() => returnValue);
    this.mockResolvedValue = (returnValue) =>
      this.mockReturnValue(Promise.resolve(returnValue));
    this.mockRejectedValue = (err) => this.mockReturnValue(Promise.reject(err));

    this.calledWith = (...matchers) => ({ ...mockFunctions(matchers, false) });

    this.expectCalledWith = (...matchers) => ({
      ...mockFunctions(matchers, true),
    });

    this.resetWhenMocks = () => {
      resetWhenMocksOnFn(fn);
    };
  }
}

const when: When = (fn) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((fn as any).__whenMock__ instanceof WhenMock)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (fn as any).__whenMock__;
  const whenMock = new WhenMock(fn);
  registry.add(fn);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (fn as any)._origMockReset = fn.mockReset;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (fn as any).mockReset = () => {
    resetWhenMocksOnFn(fn);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fn.mockReset = (fn as any)._origMockReset;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (fn as any)._origMockReset = undefined;
    fn.mockReset();
  };
  return whenMock;
};

const resetAllWhenMocks = () => {
  registry.forEach(resetWhenMocksOnFn);
  registry = new Set();
};

function resetWhenMocksOnFn(fn) {
  fn.mockImplementation(fn.__whenMock__._origMock);
  fn.__whenMock__ = undefined;
  registry.delete(fn);
}

const verifyAllWhenMocksCalled = () => {
  const [allMocks, calledMocks, uncalledMocks] = Array.from(registry).reduce(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (acc, fn: any) => {
      const mocks = fn.__whenMock__.callMocks;
      const [calledMocks, uncalledMocks] = mocks.reduce(
        (memo, mock) => {
          memo[mock.called ? 0 : 1].push(mock);
          return memo;
        },
        [[], []]
      );
      return [
        [...acc[0], ...mocks],
        [...acc[1], ...calledMocks],
        [...acc[2], ...uncalledMocks],
      ];
    },
    [[], [], []]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) as any;

  const callLines = uncalledMocks
    .filter((m) => Boolean(m.callLine))
    .map((m) => `\n  ${String(m.callLine).trim()}`)
    .join('');

  const msg = `Failed verifyAllWhenMocksCalled: ${uncalledMocks.length} not called at:${callLines}\n\n\n...rest of the stack...`;

  assert.strictEqual(
    `called mocks: ${calledMocks.length}`,
    `called mocks: ${allMocks.length}`,
    msg
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(when as any).resetAllWhenMocks = resetAllWhenMocks;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(when as any).verifyAllWhenMocksCalled = verifyAllWhenMocksCalled;

export { when, resetAllWhenMocks, verifyAllWhenMocksCalled, WhenMock };
