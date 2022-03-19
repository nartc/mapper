import { classes } from '@automapper/classes';
import type { Mapper } from '@automapper/core';
import { createMapper } from '@automapper/core';
import { getMapperToken } from '@automapper/nestjs';
import { Test } from '@nestjs/testing';
import { AddressDto } from '../../classes/dtos/address.dto';
import { AvatarDto } from '../../classes/dtos/avatar.dto';
import { BioDto } from '../../classes/dtos/bio.dto';
import { Address } from '../../classes/models/address';
import { Avatar } from '../../classes/models/avatar';
import { Bio } from '../../classes/models/bio';
import { AddressProfile } from './address.profile';
import { AvatarProfile } from './avatar.profile';
import { BioProfile } from './bio.profile';

describe('userProfileProfile', () => {
    let mapper: Mapper;
    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                {
                    provide: getMapperToken(),
                    useValue: createMapper({ strategyInitializer: classes() }),
                },
                AvatarProfile,
                AddressProfile,
                BioProfile,
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

        const profile = new Bio();
        profile.text = 'bio';
        profile.birthday = new Date('10/14/1991');
        profile.avatar = avatar;
        profile.addresses = [address];

        const dto = mapper.map(profile, Bio, BioDto);
        expect(dto.text).toEqual(profile.text);
        expect(dto.birthday).toEqual(profile.birthday.toDateString());
        expect(dto.avatar).toEqual(mapper.map(avatar, Avatar, AvatarDto));
        expect(dto.addresses).toEqual([
            mapper.map(address, Address, AddressDto),
        ]);
    });
});
