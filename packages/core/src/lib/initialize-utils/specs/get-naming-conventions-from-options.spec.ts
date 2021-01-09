import { CamelCaseNamingConvention } from '@automapper/core';
import { getNamingConventionsFromOptions } from '../get-naming-conventions-from-options.util';

describe('getNamingConventionsFromOptions', () => {
  it('should return properly', () => {
    expect(getNamingConventionsFromOptions()).toEqual(undefined);

    const camelCaseNamingConvention = new CamelCaseNamingConvention();
    expect(
      getNamingConventionsFromOptions({
        source: camelCaseNamingConvention,
        destination: camelCaseNamingConvention,
      })
    ).toEqual([camelCaseNamingConvention, camelCaseNamingConvention]);

    expect(getNamingConventionsFromOptions(camelCaseNamingConvention)).toEqual([
      camelCaseNamingConvention,
      camelCaseNamingConvention,
    ]);
  });
});
