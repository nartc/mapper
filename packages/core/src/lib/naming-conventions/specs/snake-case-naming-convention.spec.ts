import { SnakeCaseNamingConvention } from '../snake-case-naming-convention';

describe(SnakeCaseNamingConvention.name, () => {
    const one = ['address'];
    const two = ['address', 'Street'];
    const three = ['formatted', 'Address', 'Street'];
    const pascalOne = ['Address'];
    const pascalTwo = ['Address', 'Street'];
    const pascalThree = ['Formatted', 'Address', 'Street'];
    const toSplit = 'formatted_address_street';
    const snakeCaseNamingConvention = new SnakeCaseNamingConvention();

    it('should instantiate', () => {
        expect(snakeCaseNamingConvention).toBeTruthy();
    });

    it('should split correctly', () => {
        const split = toSplit
            .split(snakeCaseNamingConvention.splittingExpression)
            .filter(Boolean);
        expect(split).toEqual(['formatted', 'address', 'street']);
    });

    it('should convert camelCase to snake_case', () => {
        const convertedOne =
            snakeCaseNamingConvention.transformPropertyName(one);
        const convertedTwo =
            snakeCaseNamingConvention.transformPropertyName(two);
        const convertedThree =
            snakeCaseNamingConvention.transformPropertyName(three);
        expect(convertedOne).toEqual('address');
        expect(convertedTwo).toEqual('address_street');
        expect(convertedThree).toEqual(toSplit);
    });

    it('should convert PascalCase to snake_case', () => {
        const convertedOne =
            snakeCaseNamingConvention.transformPropertyName(pascalOne);
        const convertedTwo =
            snakeCaseNamingConvention.transformPropertyName(pascalTwo);
        const convertedThree =
            snakeCaseNamingConvention.transformPropertyName(pascalThree);
        expect(convertedOne).toEqual('address');
        expect(convertedTwo).toEqual('address_street');
        expect(convertedThree).toEqual(toSplit);
    });

    it('should convert to empty string if provide empty string', () => {
        const converted = snakeCaseNamingConvention.transformPropertyName(['']);
        expect(converted).toEqual('');
    });
});
