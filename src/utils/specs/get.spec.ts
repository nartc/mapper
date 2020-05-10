import { get } from '../get';

describe('get edge cases', () => {
  it('should', () => {
    const val = get({ foo: { bar: 'blah' } }, null, 'foo', 'bar');
    const val2 = get({ foo: 'blah' }, null, 'bar');
    expect(val).toBe('blah');
    expect(val2).toBeNull();
  });
});
