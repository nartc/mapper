import type { Mapper } from '@automapper/core';
import { createMap, forMember, mapFrom } from '@automapper/core';
import { AddressDto } from '../dtos/address.dto';
import { Address } from '../models/address';

export function addressProfile(mapper: Mapper) {
    createMap(
        mapper,
        Address,
        AddressDto,
        forMember(
            (d) => d.formattedAddress,
            mapFrom((s) => `${s.street} ${s.city} ${s.state}`)
        )
    );
}
