import { isClass } from '../is-class.util';

describe('isClass', () => {
  it('should work', () => {
    expect(isClass(String)).toEqual(true);
    expect(isClass(Number)).toEqual(true);
    expect(
      isClass(function something() {
        console.log('');
      })
    ).toEqual(true);
    expect(
      isClass(() => {
        console.log('');
      })
    ).toEqual(false);

    expect(
      isClass(function () {
        console.log('');
      })
    ).toEqual(false);

    class Foo {}

    expect(isClass(Foo)).toEqual(true);
  });
});
