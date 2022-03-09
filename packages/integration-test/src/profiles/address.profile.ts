import type { MappingProfile } from '@automapper/core';
import { createMap, forMember, mapFrom } from '@automapper/core';
import { AddressDto } from '../dtos/address.dto';
import { Address } from '../models/address';

export const addressProfile: MappingProfile = (mapper) => {
    createMap(
        mapper,
        Address,
        AddressDto,
        forMember(
            (d) => d.formattedAddress,
            mapFrom((s) => s.state)
        )
    );
};
