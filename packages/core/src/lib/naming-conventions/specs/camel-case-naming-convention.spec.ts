import { CamelCaseNamingConvention } from '@automapper/core';

describe('CamelCaseNamingConvention', () => {
  const one = ['Address'];
  const two = ['Address', 'Street'];
  const three = ['Formatted', 'Address', 'Street'];
  const snakedOne = ['address'];
  const snakedTwo = ['address', 'street'];
  const snakedThree = ['formatted', 'address', 'street'];
  const toSplit = 'formattedAddressStreet';
  const namingConvention = new CamelCaseNamingConvention();

  it('should instantiate', () => {
    expect(namingConvention).toBeTruthy();
  });

  it('should split correctly', () => {
    const split = toSplit
      .split(namingConvention.splittingExpression)
      .filter(Boolean);
    expect(split).toEqual(['formatted', 'Address', 'Street']);
  });

  it('should convert PascalCase to camelCase', () => {
    const convertedOne = namingConvention.transformPropertyName(one);
    const convertedTwo = namingConvention.transformPropertyName(two);
    const convertedThree = namingConvention.transformPropertyName(three);
    expect(convertedOne).toEqual('address');
    expect(convertedTwo).toEqual('addressStreet');
    expect(convertedThree).toEqual(toSplit);
  });

  it('should convert lowercase (snake_case) to camelCase', () => {
    const convertedOne = namingConvention.transformPropertyName(snakedOne);
    const convertedTwo = namingConvention.transformPropertyName(snakedTwo);
    const convertedThree = namingConvention.transformPropertyName(snakedThree);
    expect(convertedOne).toEqual('address');
    expect(convertedTwo).toEqual('addressStreet');
    expect(convertedThree).toEqual(toSplit);
  });
});
