import { classes } from '@automapper/classes';
import { CamelCaseNamingConvention, createMapper } from '@automapper/core';
import { getMapperToken } from '@automapper/nestjs';
import type { Mapper } from '@automapper/types';
import { Test } from '@nestjs/testing';
import { getUser } from '../models/get-user';
import { User, UserVm } from '../models/user';
import {
  UserProfile as UserProfileModel,
  UserProfileVm,
} from '../models/user-profile';
import { AddressProfile } from './address.profile';
import { AvatarProfile } from './avatar.profile';
import { UserProfileProfile } from './user-profile.profile';
import { UserProfile } from './user.profile';

describe('addressProfile', () => {
  let mapper: Mapper;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: getMapperToken(),
          useValue: createMapper({
            name: '',
            pluginInitializer: classes,
            namingConventions: new CamelCaseNamingConvention(),
          }),
        },
        AddressProfile,
        AvatarProfile,
        UserProfileProfile,
        UserProfile,
      ],
    }).compile();
    mapper = moduleRef.get<Mapper>(getMapperToken());
  });

  it('should map', () => {
    const user = getUser();

    const vm = mapper.map(user, UserVm, User);
    expect(vm.first).toEqual(user.firstName);
    expect(vm.last).toEqual(user.lastName);
    expect(vm.full).toEqual(user.firstName + ' ' + user.lastName);
    expect(vm.jobTitle).toEqual(user.job.title);
    expect(vm.jobAnnualSalary).toEqual(user.job.annualSalary);
    expect(vm.profile).toEqual(
      mapper.map(user.profile, UserProfileVm, UserProfileModel)
    );
  });
});
