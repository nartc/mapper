import { getPathRecursive } from '../get-path-recursive.util';

describe('getPathRecursive', () => {
  const node = {
    foo: undefined,
    bar: {
      baz: undefined,
    },
    baz: [],
    barBaz: [
      {
        fooBar: {
          barFoo: undefined,
        },
      },
      {
        fooBar: {
          barFoo: undefined,
        },
      },
    ],
  };

  const resultPaths = [
    'foo',
    'bar',
    'bar.baz',
    'baz',
    'barBaz',
    'barBaz.fooBar',
    'barBaz.fooBar.barFoo',
  ];

  it('should work', () => {
    const paths = getPathRecursive(node);
    expect(paths).toEqual(resultPaths);
  });
});
