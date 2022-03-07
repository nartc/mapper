import { classes } from '@automapper/classes';
import {
    addProfile,
    CamelCaseNamingConvention,
    createMapper,
} from '@automapper/core';
import { UserDto } from '../dtos/user.dto';
import { User } from '../models/user';
import { addressProfile } from '../profiles/address.profile';
import { avatarProfile } from '../profiles/avatar.profile';
import { bioProfile } from '../profiles/bio.profile';
import { userProfile } from '../profiles/user.profile';
import { getUser } from '../utils/get-user';

describe('map', () => {
    const mapper = createMapper({
        strategyInitializer: classes(),
        namingConventions: new CamelCaseNamingConvention(),
    });

    it('should map user to userDto', () => {
        addProfile(mapper, addressProfile);
        addProfile(mapper, avatarProfile);
        addProfile(mapper, bioProfile);
        addProfile(mapper, userProfile);

        const user = getUser();

        const dto = mapper.map(user, User, UserDto);
        expect(dto).toBeTruthy();
    });
});
