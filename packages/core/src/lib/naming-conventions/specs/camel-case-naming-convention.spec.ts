import { CamelCaseNamingConvention } from '../camel-case-naming-convention';

describe(CamelCaseNamingConvention.name, () => {
    const one = ['Address'];
    const two = ['Address', 'Street'];
    const three = ['Formatted', 'Address', 'Street'];
    const snakedOne = ['address'];
    const snakedTwo = ['address', 'street'];
    const snakedThree = ['formatted', 'address', 'street'];
    const toSplit = 'formattedAddressStreet';
    const camelCaseNamingConvention = new CamelCaseNamingConvention();

    it('should instantiate', () => {
        expect(camelCaseNamingConvention).toBeTruthy();
    });

    it('should split correctly', () => {
        const split = toSplit
            .split(camelCaseNamingConvention.splittingExpression)
            .filter(Boolean);
        expect(split).toEqual(['formatted', 'Address', 'Street']);
    });

    it('should convert PascalCase to camelCase', () => {
        const convertedOne =
            camelCaseNamingConvention.transformPropertyName(one);
        const convertedTwo =
            camelCaseNamingConvention.transformPropertyName(two);
        const convertedThree =
            camelCaseNamingConvention.transformPropertyName(three);
        expect(convertedOne).toEqual('address');
        expect(convertedTwo).toEqual('addressStreet');
        expect(convertedThree).toEqual(toSplit);
    });

    it('should convert lowercase (snake_case) to camelCase', () => {
        const convertedOne =
            camelCaseNamingConvention.transformPropertyName(snakedOne);
        const convertedTwo =
            camelCaseNamingConvention.transformPropertyName(snakedTwo);
        const convertedThree =
            camelCaseNamingConvention.transformPropertyName(snakedThree);
        expect(convertedOne).toEqual('address');
        expect(convertedTwo).toEqual('addressStreet');
        expect(convertedThree).toEqual(toSplit);
    });
});
