import { isEmpty } from '@automapper/core';

describe('isEmpty', () => {
  it('should return properly', () => {
    expect(isEmpty([])).toEqual(true);
    expect(isEmpty({})).toEqual(true);
    expect(isEmpty('')).toEqual(true);
    expect(isEmpty(0)).toEqual(true);
    expect(isEmpty(false)).toEqual(true);

    expect(isEmpty([''])).toEqual(false);
    expect(isEmpty({ foo: '' })).toEqual(false);
    expect(isEmpty('123')).toEqual(false);
    expect(isEmpty(123)).toEqual(false);
    expect(isEmpty(true)).toEqual(false);
  });
});
