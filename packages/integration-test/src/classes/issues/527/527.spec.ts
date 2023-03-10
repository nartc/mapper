import { AutoMap, classes } from '@automapper/classes';
import {
    CamelCaseNamingConvention,
    createMap,
    createMapper,
    forMember,
    mapFrom,
    SnakeCaseNamingConvention,
} from '@automapper/core';

export class Source {
    @AutoMap()
    inspection_order_status?: number;

    @AutoMap()
    inspection_order_status_id!: number;
}

export class Destination {
    @AutoMap()
    inspectionOrderStatus?: number;

    @AutoMap()
    inspectionOrderStatusId!: number;
}

describe('Issue 527', () => {
    const mapper = createMapper({
        strategyInitializer: classes(),
        namingConventions: {
            source: new SnakeCaseNamingConvention(),
            destination: new CamelCaseNamingConvention(),
        },
    });

    it('should map properly', () => {
        createMap(
            mapper,
            Source,
            Destination,
            forMember(
                (d) => d.inspectionOrderStatusId,
                mapFrom((s) => s.inspection_order_status_id)
            )
        );
        const source = new Source();
        source.inspection_order_status = 1;
        source.inspection_order_status_id = 2;
        const destination = mapper.map(source, Source, Destination);

        expect(destination.inspectionOrderStatus).toEqual(1);
        expect(destination.inspectionOrderStatusId).toEqual(2);
    });
});
