import { classes } from '@automapper/classes';
import {
    CamelCaseNamingConvention,
    constructUsing,
    createMap,
    createMapper,
} from '@automapper/core';
import { SimpleUserDto } from './dtos/simple-user.dto';
import { SimpleUser } from './models/simple-user';

describe('Map - Custom Constructor', () => {
    const mapper = createMapper({
        strategyInitializer: classes(),
        namingConventions: new CamelCaseNamingConvention(),
    });

    afterEach(() => {
        mapper.dispose();
    });

    it('should map with constructUsing', () => {
        createMap(
            mapper,
            SimpleUser,
            SimpleUserDto,
            // This is the same as mapFrom(s => s.firstName + s.lastName)
            // but this it to prove the point of using constructUsing
            constructUsing((source) => {
                const userDto = new SimpleUserDto();
                userDto.fullName = source.firstName + ' ' + source.lastName;
                return userDto;
            })
        );

        const dto = mapper.map(
            new SimpleUser('Chau', 'Tran'),
            SimpleUser,
            SimpleUserDto
        );
        expect(dto.fullName).toEqual('Chau Tran');
    });
});
