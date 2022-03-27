import { classes } from '@automapper/classes';
import {
    afterMap,
    createMap,
    createMapper,
    forMember,
    ignore,
} from '@automapper/core';
import { SimpleUserDto } from './dtos/simple-user.dto';
import { SimpleUser } from './models/simple-user';

describe('Map Async Classes', () => {
    const mapper = createMapper({ strategyInitializer: classes() });

    it('should map', async () => {
        createMap(
            mapper,
            SimpleUser,
            SimpleUserDto,
            forMember((d) => d.fullName, ignore()),
            afterMap(async (_, destination) => {
                const fullName = await Promise.resolve().then(
                    () => 'Tran Chau'
                );
                Object.assign(destination, { fullName });
            })
        );

        const dto = await mapper.mapAsync(
            new SimpleUser('Chau', 'Tran'),
            SimpleUser,
            SimpleUserDto
        );
        expect(dto.fullName).toEqual('Tran Chau');
    });
});
