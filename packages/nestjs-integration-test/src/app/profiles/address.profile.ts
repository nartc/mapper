import type { Mapper, MappingProfile } from '@automapper/core';
import { mapFrom } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { Address, AddressVm } from '../models/address';

@Injectable()
export class AddressProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile(): MappingProfile {
    return (mapper) => {
      mapper.createMap(Address, AddressVm).forMember(
        (d) => d.formattedAddress,
        mapFrom((s) => `${s.street} ${s.city} ${s.state}`)
      );
    };
  }
}
