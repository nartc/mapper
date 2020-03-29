import { getPathRecursive } from '../getPathRecursive';

describe('getPathRecursive edge cases', () => {
  it('should return empty array if a primitive is passed in', () => {
    const paths = getPathRecursive('');
    expect(paths).toEqual([]);
  });

  it('should skip if parent path exists', () => {
    const paths = getPathRecursive({
      'foo.foo': 'bar',
      foo: { foo: { foo: 'test' } },
    });
    expect(paths).toBeTruthy();
  });
});
