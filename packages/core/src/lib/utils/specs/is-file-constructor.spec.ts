import { isFileConstructor } from '../is-file-constructor.util';

describe('isFileConstructor', () => {
  it('should work', () => {
    expect(isFileConstructor(File)).toEqual(true);
    expect(isFileConstructor(Date)).toEqual(false);
  });
});
