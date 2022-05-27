import { classes } from '@automapper/classes';
import {
    addProfile,
    CamelCaseNamingConvention,
    createMapper,
    PascalCaseNamingConvention,
    SnakeCaseNamingConvention,
} from '@automapper/core';
import { PascalUserDto, SnakeUserDto, UserDto } from './dtos/user.dto';
import { PascalUser, SnakeUser, User } from './models/user';
import {
    addressProfile,
    pascalAddressProfile,
    snakeAddressProfile,
} from './profiles/address.profile';
import {
    avatarProfile,
    pascalAvatarProfile,
    snakeAvatarProfile,
} from './profiles/avatar.profile';
import {
    bioProfile,
    pascalBioProfile,
    snakeBioProfile,
} from './profiles/bio.profile';
import {
    pascalUserProfile,
    snakeUserProfile,
    userProfile,
} from './profiles/user.profile';
import { getPascalUser, getSnakeUser, getUser } from './utils/get-user';

describe('Map - Naming Conventions', () => {
    describe('Pascal -> Camel', () => {
        const mapper = createMapper({
            strategyInitializer: classes(),
            namingConventions: {
                source: new PascalCaseNamingConvention(),
                destination: new CamelCaseNamingConvention(),
            },
        });

        afterEach(() => {
            mapper.dispose();
        });

        it('should map from pascal to camel', () => {
            addProfile(mapper, pascalAddressProfile);
            addProfile(mapper, pascalAvatarProfile);
            addProfile(mapper, pascalBioProfile);
            addProfile(mapper, pascalUserProfile);

            const user = getPascalUser();
            const dto = mapper.map(user, PascalUser, UserDto);
            expect(dto.first).toEqual(user.FirstName);
            expect(dto.last).toEqual(user.LastName);
            expect(dto.full).toEqual(user.FirstName + ' ' + user.LastName);
            expect(dto.jobTitle).toEqual(user.Job.Title);
            expect(dto.jobAnnualSalary).toEqual(user.Job.AnnualSalary);
        });
    });

    describe('Camel -> Pascal', () => {
        const mapper = createMapper({
            strategyInitializer: classes(),
            namingConventions: {
                source: new CamelCaseNamingConvention(),
                destination: new PascalCaseNamingConvention(),
            },
        });

        afterEach(() => {
            mapper.dispose();
        });

        it('should map from camel to pascal', () => {
            addProfile(mapper, addressProfile);
            addProfile(mapper, avatarProfile);
            addProfile(mapper, bioProfile);
            addProfile(mapper, userProfile);

            const user = getUser();
            const dto = mapper.map(user, User, PascalUserDto);
            expect(dto.First).toEqual(user.firstName);
            expect(dto.Last).toEqual(user.lastName);
            expect(dto.Full).toEqual(user.firstName + ' ' + user.lastName);
            expect(dto.JobTitle).toEqual(user.job.title);
            expect(dto.JobAnnualSalary).toEqual(user.job.annualSalary);
        });
    });

    describe('Snake -> Camel', () => {
        const mapper = createMapper({
            strategyInitializer: classes(),
            namingConventions: {
                source: new SnakeCaseNamingConvention(),
                destination: new CamelCaseNamingConvention(),
            },
        });

        afterEach(() => {
            mapper.dispose();
        });

        it('should map from snake to camel', () => {
            addProfile(mapper, snakeAddressProfile);
            addProfile(mapper, snakeAvatarProfile);
            addProfile(mapper, snakeBioProfile);
            addProfile(mapper, snakeUserProfile);

            const user = getSnakeUser();
            const dto = mapper.map(user, SnakeUser, UserDto);
            expect(dto.first).toEqual(user.first_name);
            expect(dto.last).toEqual(user.last_name);
            expect(dto.full).toEqual(user.first_name + ' ' + user.last_name);
            expect(dto.jobTitle).toEqual(user.job.title);
            expect(dto.jobAnnualSalary).toEqual(user.job.annual_salary);
        });
    });

    describe('Camel -> Snake', () => {
        const mapper = createMapper({
            strategyInitializer: classes(),
            namingConventions: {
                source: new CamelCaseNamingConvention(),
                destination: new SnakeCaseNamingConvention(),
            },
        });

        afterEach(() => {
            mapper.dispose();
        });

        it('should map from camel to snake', () => {
            addProfile(mapper, addressProfile);
            addProfile(mapper, avatarProfile);
            addProfile(mapper, bioProfile);
            addProfile(mapper, userProfile);

            const user = getUser();
            const dto = mapper.map(user, User, SnakeUserDto);
            expect(dto.first).toEqual(user.firstName);
            expect(dto.last).toEqual(user.lastName);
            expect(dto.full).toEqual(user.firstName + ' ' + user.lastName);
            expect(dto.job_title).toEqual(user.job.title);
            expect(dto.job_annual_salary).toEqual(user.job.annualSalary);
        });
    });

    describe('Snake -> Pascal', () => {
        const mapper = createMapper({
            strategyInitializer: classes(),
            namingConventions: {
                source: new SnakeCaseNamingConvention(),
                destination: new PascalCaseNamingConvention(),
            },
        });

        afterEach(() => {
            mapper.dispose();
        });

        it('should map from snake to pascal', () => {
            addProfile(mapper, snakeAddressProfile);
            addProfile(mapper, snakeAvatarProfile);
            addProfile(mapper, snakeBioProfile);
            addProfile(mapper, snakeUserProfile);

            const user = getSnakeUser();
            const dto = mapper.map(user, SnakeUser, PascalUserDto);
            expect(dto.First).toEqual(user.first_name);
            expect(dto.Last).toEqual(user.last_name);
            expect(dto.Full).toEqual(user.first_name + ' ' + user.last_name);
            expect(dto.JobTitle).toEqual(user.job.title);
            expect(dto.JobAnnualSalary).toEqual(user.job.annual_salary);
        });
    });

    describe('Pascal -> Snake', () => {
        const mapper = createMapper({
            strategyInitializer: classes(),
            namingConventions: {
                source: new PascalCaseNamingConvention(),
                destination: new SnakeCaseNamingConvention(),
            },
        });

        afterEach(() => {
            mapper.dispose();
        });

        it('should map from pascal to snake', () => {
            addProfile(mapper, pascalAddressProfile);
            addProfile(mapper, pascalAvatarProfile);
            addProfile(mapper, pascalBioProfile);
            addProfile(mapper, pascalUserProfile);

            const user = getPascalUser();
            const dto = mapper.map(user, PascalUser, SnakeUserDto);
            expect(dto.first).toEqual(user.FirstName);
            expect(dto.last).toEqual(user.LastName);
            expect(dto.full).toEqual(user.FirstName + ' ' + user.LastName);
            expect(dto.job_title).toEqual(user.Job.Title);
            expect(dto.job_annual_salary).toEqual(user.Job.AnnualSalary);
        });
    });

    // describe('No flattening', () => {
    //     const mapper = createMapper({
    //         strategyInitializer: classes(),
    //         namingConventions: {
    //             source: new CamelCaseNamingConvention(),
    //             destination: new PascalCaseNamingConvention(),
    //         },
    //         flattening: false,
    //     });
    //
    //     afterEach(() => {
    //         mapper.dispose();
    //     });
    //
    //     it('should map with naming conventions without flattening', () => {
    //         addProfile(mapper, addressProfile);
    //         addProfile(mapper, avatarProfile);
    //         addProfile(mapper, bioProfile);
    //         addProfile(mapper, userProfile);
    //
    //         const user = getUser();
    //         const dto = mapper.map(user, User, PascalUserDto);
    //         console.log(dto);
    //     });
    // });
});
