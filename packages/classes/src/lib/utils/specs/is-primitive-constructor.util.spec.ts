import { isPrimitiveConstructor } from '../is-primitive-constructor.util';

describe('isPrimitiveConstructor', () => {
  it('should work', () => {
    expect(isPrimitiveConstructor(String)).toEqual(true);
    expect(isPrimitiveConstructor(Number)).toEqual(true);
    expect(isPrimitiveConstructor(Boolean)).toEqual(true);
    expect(isPrimitiveConstructor(Date)).toEqual(false);
  });
});
