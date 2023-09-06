import type { Mapper, MappingProfile } from '@jersmart/automapper-core';
import { AutomapperProfile, InjectMapper } from '@jersmart/automapper-nestjs';
import { Injectable } from '@nestjs/common';
import { avatarProfile } from '../../classes/profiles/avatar.profile';

@Injectable()
export class AvatarProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile(): MappingProfile {
        return avatarProfile;
    }
}
