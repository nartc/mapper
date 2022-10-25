import { AutoMap, classes } from '@automapper/classes';
import {
    CamelCaseNamingConvention,
    createMap,
    createMapper,
    extend,
    forMember,
    nullSubstitution,
} from '@automapper/core';

export class Source {
    @AutoMap(() => String)
    foo!: string | null;
}

export class Destination {
    @AutoMap()
    foo?: string;
}

export class Destination2 extends Destination {}

describe('Issue 503', () => {
    const mapper = createMapper({
        strategyInitializer: classes(),
        namingConventions: new CamelCaseNamingConvention(),
    });

    it('should map properly', () => {
        const mapping = createMap(
            mapper,
            Source,
            Destination,
            forMember((d) => d.foo, nullSubstitution(undefined))
        );
        createMap(mapper, Source, Destination2, extend(mapping));

        const source = new Source();
        source.foo = null;

        const destination = mapper.map(source, Source, Destination);
        expect(destination.foo).toEqual(undefined);

        const destination2 = mapper.map(source, Source, Destination2);
        expect(destination2.foo).toEqual(undefined);
    });
});
