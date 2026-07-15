import { AutoMap, classes } from '@automapper/classes';
import {
    CamelCaseNamingConvention,
    createMap,
    createMapper,
    SnakeCaseNamingConvention,
} from '@automapper/core';

class UserEntity {
    @AutoMap()
    password!: string;

    @AutoMap()
    password_reset_token!: string;
}

class UserDto {
    @AutoMap()
    password!: string;

    @AutoMap()
    passwordResetToken!: string;
}

describe('Issue 624', () => {
    it('should map similar-prefix snake_case members without flattening through the prefix', () => {
        const mapper = createMapper({
            strategyInitializer: classes(),
            namingConventions: {
                source: new SnakeCaseNamingConvention(),
                destination: new CamelCaseNamingConvention(),
            },
        });

        createMap(mapper, UserEntity, UserDto);

        const source = new UserEntity();
        source.password = 'hashed';
        source.password_reset_token = 'reset-token';

        const destination = mapper.map(source, UserEntity, UserDto);

        expect(destination.password).toEqual('hashed');
        expect(destination.passwordResetToken).toEqual('reset-token');
    });
});
