import { isDateConstructor } from '../is-date-constructor.util';

describe('isDateConstructor', () => {
  it('should work', () => {
    expect(isDateConstructor(Date)).toEqual(true);
    expect(isDateConstructor(String)).toEqual(false);
    expect(isDateConstructor(Number)).toEqual(false);
  });
});
