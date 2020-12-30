import {
  CamelCaseNamingConvention,
  getNamingConventionsFromOptions,
} from '@automapper/core';

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
  });
});
