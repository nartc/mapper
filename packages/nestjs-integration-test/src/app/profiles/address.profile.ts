import { mapFrom } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import type { Mapper, MappingProfile } from '@automapper/types';
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

// export const addressProfile: MappingProfile = (mapper) => {
//   mapper.createMap(Address, AddressVm).forMember(
//     (d) => d.formattedAddress,
//     mapFrom((s) => `${s.street} ${s.city} ${s.state}`)
//   );
//   mapper.createMap(Address, PascalAddressVm).forMember(
//     (d) => d.FormattedAddress,
//     mapFrom((s) => `${s.street} ${s.city} ${s.state}`)
//   );
//   mapper.createMap(Address, SnakeAddressVm).forMember(
//     (d) => d.formatted_address,
//     mapFrom((s) => `${s.street} ${s.city} ${s.state}`)
//   );
// };
//
// export const pascalAddressProfile: MappingProfile = (mapper) => {
//   mapper.createMap(PascalAddress, PascalAddressVm).forMember(
//     (d) => d.FormattedAddress,
//     mapFrom((s) => `${s.Street} ${s.City} ${s.State}`)
//   );
//   mapper.createMap(PascalAddress, AddressVm).forMember(
//     (d) => d.formattedAddress,
//     mapFrom((s) => `${s.Street} ${s.City} ${s.State}`)
//   );
//   mapper.createMap(PascalAddress, SnakeAddressVm).forMember(
//     (d) => d.formatted_address,
//     mapFrom((s) => `${s.Street} ${s.City} ${s.State}`)
//   );
// };
//
// export const snakeAddressProfile: MappingProfile = (mapper) => {
//   mapper.createMap(SnakeAddress, SnakeAddressVm).forMember(
//     (d) => d.formatted_address,
//     mapFrom((s) => `${s.street} ${s.city} ${s.state}`)
//   );
//   mapper.createMap(SnakeAddress, AddressVm).forMember(
//     (d) => d.formattedAddress,
//     mapFrom((s) => `${s.street} ${s.city} ${s.state}`)
//   );
//   mapper.createMap(SnakeAddress, PascalAddressVm).forMember(
//     (d) => d.FormattedAddress,
//     mapFrom((s) => `${s.street} ${s.city} ${s.state}`)
//   );
// };
