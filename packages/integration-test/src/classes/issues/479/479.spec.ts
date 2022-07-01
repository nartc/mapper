import { AutoMap, classes } from '@automapper/classes';
import { createMap, createMapper, forMember, mapFrom } from '@automapper/core';

export class Idp {
    @AutoMap() id!: number;
    @AutoMap() entityId!: string;
    @AutoMap() name!: string;
    @AutoMap() url!: string;
    @AutoMap() defaultEnvironmentLabel!: string;
}

export class GetIdpsResponse {
    @AutoMap(() => [Idp]) results!: Idp[];
}

describe('Issue 479', () => {
    const mapper = createMapper({ strategyInitializer: classes() });

    it('should map properly', () => {
        createMap(
            mapper,
            Idp,
            forMember(
                (x) => x.defaultEnvironmentLabel,
                mapFrom((x) => x.defaultEnvironmentLabel ?? x.name)
            )
        );
        createMap(mapper, GetIdpsResponse);

        const idp = new Idp();
        idp.url = 'url';
        idp.id = 123;
        idp.entityId = '123';
        idp.name = 'name';
        const response = new GetIdpsResponse();
        response.results = [idp];

        const mapped = mapper.map(response, GetIdpsResponse);
        expect(mapped).toBeTruthy();
        expect(mapped.results[0].defaultEnvironmentLabel).toEqual(
            response.results[0].name
        );
    });
});
