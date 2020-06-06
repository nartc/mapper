import { CamelCaseNamingConvention } from '../../conventions';
import { getSourcePropertyKey } from '../getSourcePropertyKey';

describe('GetSourcePropertyKey', () => {
  it('should return empty path if provided path is empty', () => {
    const path = getSourcePropertyKey(
      [CamelCaseNamingConvention, CamelCaseNamingConvention],
      ''
    );
    expect(path).toBe('');
  });
});
