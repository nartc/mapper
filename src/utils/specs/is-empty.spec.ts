import { isEmpty } from '../isEmpty';

describe('isEmpty edge cases', () => {
  it('should return true for an empty Map', () => {
    const result = isEmpty(new Map());
    expect(result).toBe(true);
  });
});
