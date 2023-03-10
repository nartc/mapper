import { classes } from '@automapper/classes';
import { addProfile, createMapper } from '@automapper/core';

import { DecoratorlessUserDto } from './dtos/decoratorless-user.dto';
import { DecoratorlessUser } from './models/decoratorless-user';
import { decoratorlessUserProfileFactory } from './profiles/decoratorless-user.profile';

describe('Map Without Decorators', () => {
    const mapper = createMapper({ strategyInitializer: classes() });

    beforeAll(() => {
        addProfile(mapper, decoratorlessUserProfileFactory());
    });

    it('should map model to DTO', async () => {
        const dto = await mapper.mapAsync(
            new DecoratorlessUser('Gabriel', 'Kim'),
            DecoratorlessUser,
            DecoratorlessUserDto
        );

        expect(dto.firstName).toEqual('Gabriel');
        expect(dto.lastName).toEqual('Kim');
        expect(dto.fullName).toEqual('Gabriel Kim');
    });

    it('should map DTO to model', async () => {
        const dto = new DecoratorlessUserDto();
        dto.firstName = 'Gabriel';
        dto.lastName = 'Kim';
        dto.fullName = 'Gabriel Kim';

        const model = await mapper.mapAsync(
            dto,
            DecoratorlessUserDto,
            DecoratorlessUser
        );

        expect(model.firstName).toEqual('Gabriel');
        expect(model.lastName).toEqual('Kim');
        expect(model).not.toHaveProperty('fullName');
    });
});
