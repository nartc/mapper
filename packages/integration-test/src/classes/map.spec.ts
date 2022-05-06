import { classes } from '@automapper/classes';
import { addProfile, CamelCaseNamingConvention, createMapper } from '@automapper/core';
import { UserDto } from './dtos/user.dto';
import { User } from './models/user';
import { addressProfile } from './profiles/address.profile';
import { avatarProfile } from './profiles/avatar.profile';
import { bioProfile } from './profiles/bio.profile';
import { userProfile } from './profiles/user.profile';
import { getUser } from './utils/get-user';

describe('Map Classes', () => {
    const mapper = createMapper({
        strategyInitializer: classes(),
        namingConventions: new CamelCaseNamingConvention(),
    });

    afterEach(() => {
        mapper.dispose();
    });

    it('should return null if source is null', () => {
        const dto = mapper.map(null, User, UserDto);
        expect(dto).toEqual(null);
    });

    it('should return undefined if source is undefined', () => {
        const dto = mapper.map(undefined, User, UserDto);
        expect(dto).toEqual(undefined);
    });

    it('should return [] if mapped with []', () => {
        const dtos = mapper.mapArray([], User, UserDto);
        expect(dtos).toEqual([]);
    });

    it('should throw error if mapped without the mapping', () => {
        const user = getUser();
        expect(() => mapper.map(user, User, UserDto)).toThrow();
    });

    it('should not freeze source', () => {
      addProfile(mapper, addressProfile);
      addProfile(mapper, avatarProfile);
      addProfile(mapper, bioProfile);
      addProfile(mapper, userProfile);

      const user = getUser();
      mapper.map(user, User, UserDto);

      expect(Object.isFrozen(user.bio.avatar)).toBe(false);
      user.bio.addresses.forEach((a) => expect(Object.isFrozen(a)).toBe(false));
      expect(Object.isFrozen(user.job)).toBe(false);
      expect(Object.isFrozen(user.bio)).toBe(false);
      expect(Object.isFrozen(user)).toBe(false);
    });

    it('should not freeze source array items', () => {
        addProfile(mapper, addressProfile);
        addProfile(mapper, avatarProfile);
        addProfile(mapper, bioProfile);
        addProfile(mapper, userProfile);

        const user = getUser();
        mapper.mapArray([user], User, UserDto);

        expect(Object.isFrozen(user.bio.avatar)).toBe(false);
        user.bio.addresses.forEach((a) => expect(Object.isFrozen(a)).toBe(false));
        expect(Object.isFrozen(user.job)).toBe(false);
        expect(Object.isFrozen(user.bio)).toBe(false);
        expect(Object.isFrozen(user)).toBe(false);
    });

    it('should not freeze destination', () => {
        addProfile(mapper, addressProfile);
        addProfile(mapper, avatarProfile);
        addProfile(mapper, bioProfile);
        addProfile(mapper, userProfile);

        const user = getUser();
        const dto = mapper.map(user, User, UserDto);

        expect(Object.isFrozen(dto.bio.avatar)).toBe(false);
        dto.bio.addresses.forEach((a) => expect(Object.isFrozen(a)).toBe(false));
        expect(Object.isFrozen(dto)).toBe(false);
    });

    it('should not freeze destination array', () => {
        addProfile(mapper, addressProfile);
        addProfile(mapper, avatarProfile);
        addProfile(mapper, bioProfile);
        addProfile(mapper, userProfile);

        const user = getUser();
        const dtos = mapper.mapArray([user], User, UserDto);

        expect(Object.isFrozen(dtos[0].bio.avatar)).toBe(false);
        dtos[0].bio.addresses.forEach((a) => expect(Object.isFrozen(a)).toBe(false));
        expect(Object.isFrozen(dtos[0])).toBe(false);
    });

    it('should map user to userDto', () => {
        addProfile(mapper, addressProfile);
        addProfile(mapper, avatarProfile);
        addProfile(mapper, bioProfile);
        addProfile(mapper, userProfile);

        const user = getUser();
        const dto = mapper.map(user, User, UserDto);
        expect(dto.first).toEqual(user.firstName);
        expect(dto.last).toEqual(user.lastName);
        expect(dto.full).toEqual(user.firstName + ' ' + user.lastName);
        expect(dto.jobTitle).toEqual(user.job.title);
        expect(dto.jobAnnualSalary).toEqual(user.job.annualSalary);
        expect(dto.logins).toEqual(user.logins);
        expect(dto.lastLogin).toEqual(user.logins[user.logins.length - 1]);
    });

    it('should map plain object as a class instance', () => {
        addProfile(mapper, addressProfile);
        addProfile(mapper, avatarProfile);
        addProfile(mapper, bioProfile);
        addProfile(mapper, userProfile);

        const user = getUser();
        const dto = mapper.map(Object.assign({}, user), User, UserDto);
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
        const dtos = mapper.mapArray([user], User, UserDto);
        expect(dtos).toHaveLength(1);
        expect(dtos[0].first).toEqual(user.firstName);
        expect(dtos[0].last).toEqual(user.lastName);
        expect(dtos[0].full).toEqual(user.firstName + ' ' + user.lastName);
        expect(dtos[0].jobTitle).toEqual(user.job.title);
        expect(dtos[0].jobAnnualSalary).toEqual(user.job.annualSalary);
        expect(dtos[0].logins).toEqual(user.logins);
        expect(dtos[0].lastLogin).toEqual(user.logins[user.logins.length - 1]);
    });

    it('should map plain array Users to UserDtos', () => {
        addProfile(mapper, addressProfile);
        addProfile(mapper, avatarProfile);
        addProfile(mapper, bioProfile);
        addProfile(mapper, userProfile);

        const user = getUser();
        const dtos = mapper.mapArray([Object.assign({}, user)], User, UserDto);
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
