import { AutoMap, classes } from '@automapper/classes';
import { constructUsing, createMap, createMapper } from '@automapper/core';

class Source {
    constructor(firstName: string, lastName: string) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    @AutoMap()
    firstName!: string;

    @AutoMap()
    lastName!: string;
}

class Destination {
    private constructor(fullName: string) {
        this.fullName = fullName;
    }

    @AutoMap()
    fullName!: string;

    static createForMapping(fullName: string): Destination {
        return new Destination(fullName);
    }
}

describe('Issue 625', () => {
    it('should allow constructUsing to map to a destination with a private constructor', () => {
        const mapper = createMapper({ strategyInitializer: classes() });
        createMap(
            mapper,
            Source,
            Destination,
            constructUsing((source) =>
                Destination.createForMapping(
                    `${source.firstName} ${source.lastName}`
                )
            )
        );

        const destination = mapper.map(
            new Source('Chau', 'Tran'),
            Source,
            Destination
        );

        expect(destination.fullName).toEqual('Chau Tran');
    });
});
