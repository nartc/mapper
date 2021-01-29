import { classes } from '@automapper/classes';
import { createMapper } from '@automapper/core';
import { getMapperToken } from '@automapper/nestjs';
import type { Mapper } from '@automapper/types';
import { Test } from '@nestjs/testing';
import { Address, AddressVm } from '../models/address';
import { Avatar, AvatarVm } from '../models/avatar';
import { UserProfile, UserProfileVm } from '../models/user-profile';
import { AddressProfile } from './address.profile';
import { AvatarProfile } from './avatar.profile';
import { UserProfileProfile } from './user-profile.profile';

describe('userProfileProfile', () => {
  let mapper: Mapper;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: getMapperToken(),
          useValue: createMapper({ name: '', pluginInitializer: classes }),
        },
        AvatarProfile,
        AddressProfile,
        UserProfileProfile,
      ],
    }).compile();
    mapper = moduleRef.get<Mapper>(getMapperToken());
  });

  it('should map', () => {
    const address = new Address();
    address.street = 'street';
    address.city = 'city';
    address.state = 'state';

    const avatar = new Avatar();
    avatar.url = 'url';
    avatar.shouldIgnore = 6;
    avatar.source = 'source';
    avatar.shouldBeSubstituted = 'should not substitute';
    avatar.forCondition = true;

    const profile = new UserProfile();
    profile.bio = 'bio';
    profile.birthday = new Date('10/14/1991');
    profile.avatar = avatar;
    profile.addresses = [address];

    const vm = mapper.map(profile, UserProfileVm, UserProfile);
    expect(vm.bio).toEqual(profile.bio);
    expect(vm.birthday).toEqual(profile.birthday.toDateString());
    expect(vm.avatar).toEqual(mapper.map(avatar, AvatarVm, Avatar));
    expect(vm.addresses).toEqual([mapper.map(address, AddressVm, Address)]);
  });
});
