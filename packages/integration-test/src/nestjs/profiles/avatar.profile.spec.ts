import { classes } from '@automapper/classes';
import type { Mapper } from '@automapper/core';
import { createMapper } from '@automapper/core';
import { getMapperToken } from '@automapper/nestjs';
import { Test } from '@nestjs/testing';
import { AvatarDto } from '../../classes/dtos/avatar.dto';
import { Avatar } from '../../classes/models/avatar';
import { AvatarProfile } from './avatar.profile';

describe('avatarProfile', () => {
    let mapper: Mapper;
    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                {
                    provide: getMapperToken(),
                    useValue: createMapper({ strategyInitializer: classes() }),
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

        const dto = mapper.map(avatar, Avatar, AvatarDto);
        expect(dto.url).toEqual(avatar.source);
        expect(dto.willBeIgnored).toEqual(undefined);
        expect(dto.shouldBeSubstituted).toEqual(avatar.shouldBeSubstituted);
        expect(dto.forCondition).toEqual(avatar.forCondition);
    });
});
