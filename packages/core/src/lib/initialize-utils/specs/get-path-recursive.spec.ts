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
    ['mid.Dot']: {
      ['.startDot']: undefined,
      ['endDot.']: undefined,
    },
  };

  const resultPaths = [
    ['foo'],
    ['bar'],
    ['bar','baz'],
    ['baz'],
    ['barBaz'],
    ['barBaz','fooBar'],
    ['barBaz','fooBar','barFoo'],
    ['mid.Dot'],
    ['mid.Dot','.startDot'],
    ['mid.Dot','endDot.'],
  ];

  it('should work', () => {
    const paths = getPathRecursive(node);
    expect(paths).toEqual(resultPaths);
  });
});
