import type { Mapper, MappingProfile } from '@jersmart/automapper-core';
import { AutomapperProfile, InjectMapper } from '@jersmart/automapper-nestjs';
import { Injectable } from '@nestjs/common';
import { addressProfile } from '../../classes/profiles/address.profile';

@Injectable()
export class AddressProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile(): MappingProfile {
        return addressProfile;
    }
}
