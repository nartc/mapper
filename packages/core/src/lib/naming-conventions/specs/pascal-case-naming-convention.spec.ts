import { PascalCaseNamingConvention } from '../pascal-case-naming-convention';

describe(PascalCaseNamingConvention.name, () => {
    const one = ['address'];
    const two = ['address', 'Street'];
    const three = ['formatted', 'Address', 'Street'];
    const snakedOne = ['address'];
    const snakedTwo = ['address', 'street'];
    const snakedThree = ['formatted', 'address', 'street'];
    const toSplit = 'FormattedAddressStreet';
    const pascalCaseNamingConvention = new PascalCaseNamingConvention();

    it('should instantiate', () => {
        expect(pascalCaseNamingConvention).toBeTruthy();
    });

    it('should split correctly', () => {
        const split = toSplit
            .split(pascalCaseNamingConvention.splittingExpression)
            .filter(Boolean);
        expect(split).toEqual(['Formatted', 'Address', 'Street']);
    });

    it('should convert camelCase to PascalCase', () => {
        const convertedOne =
            pascalCaseNamingConvention.transformPropertyName(one);
        const convertedTwo =
            pascalCaseNamingConvention.transformPropertyName(two);
        const convertedThree =
            pascalCaseNamingConvention.transformPropertyName(three);
        expect(convertedOne).toEqual('Address');
        expect(convertedTwo).toEqual('AddressStreet');
        expect(convertedThree).toEqual(toSplit);
    });

    it('should convert lowercase (snake_case) to PascalCase', () => {
        const convertedOne =
            pascalCaseNamingConvention.transformPropertyName(snakedOne);
        const convertedTwo =
            pascalCaseNamingConvention.transformPropertyName(snakedTwo);
        const convertedThree =
            pascalCaseNamingConvention.transformPropertyName(snakedThree);
        expect(convertedOne).toEqual('Address');
        expect(convertedTwo).toEqual('AddressStreet');
        expect(convertedThree).toEqual(toSplit);
    });
});
