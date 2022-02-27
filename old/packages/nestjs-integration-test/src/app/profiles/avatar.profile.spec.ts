import { classes } from '@automapper/classes';
import type { Mapper } from '@automapper/core';
import { createMapper } from '@automapper/core';
import { getMapperToken } from '@automapper/nestjs';
import { Test } from '@nestjs/testing';
import { Avatar, AvatarVm } from '../models/avatar';
import { AvatarProfile } from './avatar.profile';

describe('avatarProfile', () => {
  let mapper: Mapper;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: getMapperToken(),
          useValue: createMapper({ name: '', pluginInitializer: classes }),
        },
        AvatarProfile,
      ],
    }).compile();
    mapper = moduleRef.get<Mapper>(getMapperToken());
  });

  it('should map', () => {
    const avatar = new Avatar();
    avatar.url = 'url';
    avatar.shouldIgnore = 6;
    avatar.source = 'source';
    avatar.shouldBeSubstituted = 'should not substitute';
    avatar.forCondition = true;

    const vm = mapper.map(avatar, AvatarVm, Avatar);
    expect(vm.url).toEqual(avatar.source);
    expect(vm.willBeIgnored).toEqual(undefined);
    expect(vm.shouldBeSubstituted).toEqual(avatar.shouldBeSubstituted);
    expect(vm.forCondition).toEqual(avatar.forCondition);
  });
});
