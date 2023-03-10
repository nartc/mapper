import { AutoMap, classes } from '@automapper/classes';
import { createMap, createMapper, typeConverter } from '@automapper/core';

export class SlippageDetails {
    @AutoMap()
    amountTryBought!: bigint;
    @AutoMap()
    actualAmountBought!: bigint;
    @AutoMap()
    amountTrySold!: bigint;
    @AutoMap()
    actualAmountSold!: bigint;
}

export class SlippageDetailsResponse {
    @AutoMap(() => String)
    amountTryBought!: string;
    @AutoMap(() => String)
    actualAmountBought!: string;
    @AutoMap(() => String)
    amountTrySold!: string;
    @AutoMap(() => String)
    actualAmountSold!: string;
}

describe('Discussion 457', () => {
    const mapper = createMapper({ strategyInitializer: classes() });

    it('should map properly', () => {
        createMap(
            mapper,
            SlippageDetailsResponse,
            SlippageDetails,
            typeConverter(String, BigInt, (str) => BigInt(str))
        );

        const details = mapper.map(
            {
                amountTryBought: '118037573493144275546370733802',
                actualAmountBought: '100333357843974197803636520962',
                amountTrySold: '8459357670662208186',
                actualAmountSold: '7212834513173318076',
            },
            SlippageDetailsResponse,
            SlippageDetails
        );

        expect(details.amountTryBought).toEqual(
            BigInt('118037573493144275546370733802')
        );
        expect(details.actualAmountBought).toEqual(
            BigInt('100333357843974197803636520962')
        );
        expect(details.amountTrySold).toEqual(BigInt('8459357670662208186'));
        expect(details.actualAmountSold).toEqual(BigInt('7212834513173318076'));
    });
});
