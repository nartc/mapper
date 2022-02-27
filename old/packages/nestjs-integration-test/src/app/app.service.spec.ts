import { classes } from '@automapper/classes';
import { CamelCaseNamingConvention, createMapper } from '@automapper/core';
import { getMapperToken } from '@automapper/nestjs';
import { Test } from '@nestjs/testing';

import { AppService } from './app.service';
import { User, UserVm } from './models/user';
import { AddressProfile } from './profiles/address.profile';
import { AvatarProfile } from './profiles/avatar.profile';
import { UserProfileProfile } from './profiles/user-profile.profile';
import { UserProfile } from './profiles/user.profile';

describe('AppService', () => {
  let service: AppService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: getMapperToken(),
          useValue: createMapper({
            name: 'test',
            pluginInitializer: classes,
            namingConventions: new CamelCaseNamingConvention(),
          }),
        },
        AvatarProfile,
        AddressProfile,
        UserProfileProfile,
        UserProfile,
      ],
    }).compile();

    service = app.get<AppService>(AppService);
  });

  it('should return "Welcome to nestjs-integration-test!"', () => {
    expect(service.getData()).toEqual({
      message: 'Welcome to nestjs-integration-test!',
    });
  });

  it('should return UserVm', () => {
    expect(service.getUserVm()).toBeInstanceOf(UserVm);
  });

  it('should return user', () => {
    expect(service.getRawUser()).toBeInstanceOf(User);
  });
});
