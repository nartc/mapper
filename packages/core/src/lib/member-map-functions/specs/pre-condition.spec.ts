import { preCondition } from '../pre-condition';

describe(preCondition.name, () => {
    it('should return correctly', () => {
        let preCondFn = preCondition(() => true);
        expect(preCondFn).toBeTruthy();
        expect(preCondFn?.[0]).toBeInstanceOf(Function);
        expect(preCondFn?.[1]).toEqual(undefined);

        preCondFn = preCondition(() => true, 'default');
        expect(preCondFn?.[1]).toEqual('default');
    });

    it('should return truthy when true', () => {
        const preCond = preCondition(() => true);
        const result = preCond?.[0]({});
        expect(result).toEqual(true);
    });

    it('should return falsy when false', () => {
        const preCond = preCondition(() => false);
        const result = preCond?.[0]({});
        expect(result).toEqual(false);
    });
});
