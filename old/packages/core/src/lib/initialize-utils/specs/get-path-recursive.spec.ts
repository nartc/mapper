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
    _privateFoo: undefined,
    get privateFoo() {
      return this._privateFoo;
    },
  };

  const resultPaths = [
    ['foo'],
    ['bar'],
    ['bar', 'baz'],
    ['baz'],
    ['barBaz'],
    ['barBaz', 'fooBar'],
    ['barBaz', 'fooBar', 'barFoo'],
    ['mid.Dot'],
    ['mid.Dot', '.startDot'],
    ['mid.Dot', 'endDot.'],
    ['_privateFoo'],
    ['privateFoo'],
  ];

  it('should work', () => {
    const paths = getPathRecursive(node);
    expect(paths).toEqual(resultPaths);
  });
});
