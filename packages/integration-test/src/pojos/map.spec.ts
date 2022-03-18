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

describe('Map Pojos', () => {
    const mapper = createMapper({
        strategyInitializer: pojos(),
        namingConventions: new CamelCaseNamingConvention(),
    });

    afterEach(() => {
        mapper.dispose();
        PojosMetadataMap.reset();
    });

    it('should return null if source is null', () => {
        const dto = mapper.map(null, 'User', 'UserDto');
        expect(dto).toEqual(null);
    });

    it('should return undefined if source is undefined', () => {
        const dto = mapper.map(undefined, 'User', 'UserDto');
        expect(dto).toEqual(undefined);
    });

    it('should return [] if mapped with []', () => {
        const dtos = mapper.mapArray([], 'User', 'UserDto');
        expect(dtos).toEqual([]);
    });

    it('should throw error if mapped without the mapping', () => {
        const user = getUser();
        expect(() => mapper.map(user, 'User', 'UserDto')).toThrow();
    });

    it('should map user to userDto', () => {
        addProfile(mapper, addressProfile);
        addProfile(mapper, avatarProfile);
        addProfile(mapper, bioProfile);
        addProfile(mapper, userProfile);

        const user = getUser();
        const dto = mapper.map<User, UserDto>(user, 'User', 'UserDto');
        expect(dto.first).toEqual(user.firstName);
        expect(dto.last).toEqual(user.lastName);
        expect(dto.full).toEqual(user.firstName + ' ' + user.lastName);
        expect(dto.jobTitle).toEqual(user.job.title);
        expect(dto.jobAnnualSalary).toEqual(user.job.annualSalary);
        expect(dto.logins).toEqual(user.logins);
        expect(dto.lastLogin).toEqual(user.logins[user.logins.length - 1]);
    });

    it('should map array Users to UserDtos', () => {
        addProfile(mapper, addressProfile);
        addProfile(mapper, avatarProfile);
        addProfile(mapper, bioProfile);
        addProfile(mapper, userProfile);

        const user = getUser();
        const dtos = mapper.mapArray<User, UserDto>([user], 'User', 'UserDto');
        expect(dtos).toHaveLength(1);
        expect(dtos[0].first).toEqual(user.firstName);
        expect(dtos[0].last).toEqual(user.lastName);
        expect(dtos[0].full).toEqual(user.firstName + ' ' + user.lastName);
        expect(dtos[0].jobTitle).toEqual(user.job.title);
        expect(dtos[0].jobAnnualSalary).toEqual(user.job.annualSalary);
        expect(dtos[0].logins).toEqual(user.logins);
        expect(dtos[0].lastLogin).toEqual(user.logins[user.logins.length - 1]);
    });
});
