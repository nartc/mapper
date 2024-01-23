import { classes } from '@automapper/classes';
import {
  afterMap,
  createMap,
  createMapper,
  forMember,
  ignore
} from '@automapper/core';
import { SimpleUserDto } from './dtos/simple-user.dto';
import { SimpleUser } from './models/simple-user';

describe('Map Async Classes', () => {
    const mapper = createMapper({ strategyInitializer: classes() });

    it('should map a single', async () => {
        createMap(
            mapper,
            SimpleUser,
            SimpleUserDto,
            forMember((d) => d.fullName, ignore()),
            afterMap(async (_, destination) => {
                const fullName = await new Promise((resolve) => {
                    setTimeout(() => {
                        resolve('Tran Chau');
                    }, 1000);
                });
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

    it('should map an array', async () => {
        createMap(
            mapper,
            SimpleUser,
            SimpleUserDto,
            forMember((d) => d.fullName, ignore()),
            afterMap(async (_, destination) => {
                const fullName = await new Promise<string>((resolve) => {
                    setTimeout(() => {
                        resolve('Tran Chau');
                    }, 1000);
                });
                destination.fullName = fullName;
            })
        );
        const dtos = await mapper.mapArrayAsync(
            [new SimpleUser('Chau', 'Tran')],
            SimpleUser,
            SimpleUserDto
        );
        expect(dtos[0].fullName).toEqual('Tran Chau');
    });
});
