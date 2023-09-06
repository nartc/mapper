import type { Mapper, MappingProfile } from '@jersmart/automapper-core';
import { AutomapperProfile, InjectMapper } from '@jersmart/automapper-nestjs';
import { Injectable } from '@nestjs/common';
import { userProfile } from '../../classes/profiles/user.profile';

@Injectable()
export class UserProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile(): MappingProfile {
        return userProfile;
    }
}
