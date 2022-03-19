import { classes } from '@automapper/classes';
import type { Mapper } from '@automapper/core';
import { CamelCaseNamingConvention, createMapper } from '@automapper/core';
import { getMapperToken } from '@automapper/nestjs';
import { Test } from '@nestjs/testing';
import { BioDto } from '../../classes/dtos/bio.dto';
import { UserDto } from '../../classes/dtos/user.dto';
import { Bio } from '../../classes/models/bio';
import { User } from '../../classes/models/user';
import { getUser } from '../../classes/utils/get-user';
import { AddressProfile } from './address.profile';
import { AvatarProfile } from './avatar.profile';
import { BioProfile } from './bio.profile';
import { UserProfile } from './user.profile';

describe('addressProfile', () => {
    let mapper: Mapper;
    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                {
                    provide: getMapperToken(),
                    useValue: createMapper({
                        strategyInitializer: classes(),
                        namingConventions: new CamelCaseNamingConvention(),
                    }),
                },
                AddressProfile,
                AvatarProfile,
                BioProfile,
                UserProfile,
            ],
        }).compile();
        mapper = moduleRef.get<Mapper>(getMapperToken());
    });

    it('should map', () => {
        const user = getUser();

        const dto = mapper.map(user, User, UserDto);
        expect(dto.first).toEqual(user.firstName);
        expect(dto.last).toEqual(user.lastName);
        expect(dto.full).toEqual(user.firstName + ' ' + user.lastName);
        expect(dto.jobTitle).toEqual(user.job.title);
        expect(dto.jobAnnualSalary).toEqual(user.job.annualSalary);
        expect(dto.bio).toEqual(mapper.map(user.bio, Bio, BioDto));
    });
});
