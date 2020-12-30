import { SnakeCaseNamingConvention } from '@automapper/core';

describe('SnakeCaseNamingConvention', () => {
  const one = ['address'];
  const two = ['address', 'Street'];
  const three = ['formatted', 'Address', 'Street'];
  const pascalOne = ['Address'];
  const pascalTwo = ['Address', 'Street'];
  const pascalThree = ['Formatted', 'Address', 'Street'];
  const toSplit = 'formatted_address_street';
  const namingConvention = new SnakeCaseNamingConvention();

  it('should instantiate', () => {
    expect(namingConvention).toBeTruthy();
  });

  it('should split correctly', () => {
    const split = toSplit
      .split(namingConvention.splittingExpression)
      .filter(Boolean);
    expect(split).toEqual(['formatted', 'address', 'street']);
  });

  it('should convert camelCase to snake_case', () => {
    const convertedOne = namingConvention.transformPropertyName(one);
    const convertedTwo = namingConvention.transformPropertyName(two);
    const convertedThree = namingConvention.transformPropertyName(three);
    expect(convertedOne).toEqual('address');
    expect(convertedTwo).toEqual('address_street');
    expect(convertedThree).toEqual(toSplit);
  });

  it('should convert PascalCase to snake_case', () => {
    const convertedOne = namingConvention.transformPropertyName(pascalOne);
    const convertedTwo = namingConvention.transformPropertyName(pascalTwo);
    const convertedThree = namingConvention.transformPropertyName(pascalThree);
    expect(convertedOne).toEqual('address');
    expect(convertedTwo).toEqual('address_street');
    expect(convertedThree).toEqual(toSplit);
  });

  it('should convert to empty string if provide empty string', () => {
    const converted = namingConvention.transformPropertyName(['']);
    expect(converted).toEqual('');
  });
});
