import {
    addProfile,
    CamelCaseNamingConvention,
    createMapper,
} from '@automapper/core';
import { pojos, PojosMetadataMap } from '@automapper/pojos';
import { UserDto } from './dtos/user.dto';
import { User } from './models/user';
import { addressProfile } from './profiles/address.profile';
import { avatarProfile } from './profiles/avatar.profile';
import { bioProfile } from './profiles/bio.profile';
import { userProfile } from './profiles/user.profile';
import { getUser } from './utils/get-user';

describe('Map - Mutation', () => {
    const mapper = createMapper({
        strategyInitializer: pojos(),
        namingConventions: new CamelCaseNamingConvention(),
    });

    afterEach(() => {
        mapper.dispose();
        PojosMetadataMap.reset();
    });

    it('should mutate properly', () => {
        addProfile(mapper, addressProfile);
        addProfile(mapper, avatarProfile);
        addProfile(mapper, bioProfile);
        addProfile(mapper, userProfile);

        const user = getUser();
        const dto = {} as UserDto;
        mapper.mutate<User, UserDto>(user, dto, 'User', 'UserDto');
        expect(dto.first).toEqual(user.firstName);
        expect(dto.last).toEqual(user.lastName);
        expect(dto.full).toEqual(user.firstName + ' ' + user.lastName);
        expect(dto.jobTitle).toEqual(user.job.title);
        expect(dto.jobAnnualSalary).toEqual(user.job.annualSalary);
        expect(dto.logins).toEqual(user.logins);
        expect(dto.lastLogin).toEqual(user.logins[user.logins.length - 1]);
        expect(dto).toBe(dto);
    });

    it('should mutate array properly', () => {
        addProfile(mapper, addressProfile);
        addProfile(mapper, avatarProfile);
        addProfile(mapper, bioProfile);
        addProfile(mapper, userProfile);

        const user = getUser();
        const dtos: UserDto[] = [];
        mapper.mutateArray<User, UserDto>([user], dtos, 'User', 'UserDto');
        dtos.forEach((dto) => {
            expect(dto.first).toEqual(user.firstName);
            expect(dto.last).toEqual(user.lastName);
            expect(dto.full).toEqual(user.firstName + ' ' + user.lastName);
            expect(dto.jobTitle).toEqual(user.job.title);
            expect(dto.jobAnnualSalary).toEqual(user.job.annualSalary);
            expect(dto.logins).toEqual(user.logins);
            expect(dto.lastLogin).toEqual(user.logins[user.logins.length - 1]);
        });
        expect(dtos).toBe(dtos);
    });
});
