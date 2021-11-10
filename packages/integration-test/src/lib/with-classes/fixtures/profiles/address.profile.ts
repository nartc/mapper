import type { MappingProfile } from '@automapper/core';
import { mapFrom } from '@automapper/core';
import { Address, AddressVm } from '../models/address';
import { PascalAddress, PascalAddressVm } from '../models/address-pascal';
import { SnakeAddress, SnakeAddressVm } from '../models/address-snake';

export const addressProfile: MappingProfile = (mapper) => {
  mapper.createMap(Address, AddressVm).forMember(
    (d) => d.formattedAddress,
    mapFrom((s) => `${s.street} ${s.city} ${s.state}`)
  );
  mapper.createMap(Address, PascalAddressVm).forMember(
    (d) => d.FormattedAddress,
    mapFrom((s) => `${s.street} ${s.city} ${s.state}`)
  );
  mapper.createMap(Address, SnakeAddressVm).forMember(
    (d) => d.formatted_address,
    mapFrom((s) => `${s.street} ${s.city} ${s.state}`)
  );
};

export const pascalAddressProfile: MappingProfile = (mapper) => {
  mapper.createMap(PascalAddress, PascalAddressVm).forMember(
    (d) => d.FormattedAddress,
    mapFrom((s) => `${s.Street} ${s.City} ${s.State}`)
  );
  mapper.createMap(PascalAddress, AddressVm).forMember(
    (d) => d.formattedAddress,
    mapFrom((s) => `${s.Street} ${s.City} ${s.State}`)
  );
  mapper.createMap(PascalAddress, SnakeAddressVm).forMember(
    (d) => d.formatted_address,
    mapFrom((s) => `${s.Street} ${s.City} ${s.State}`)
  );
};

export const snakeAddressProfile: MappingProfile = (mapper) => {
  mapper.createMap(SnakeAddress, SnakeAddressVm).forMember(
    (d) => d.formatted_address,
    mapFrom((s) => `${s.street} ${s.city} ${s.state}`)
  );
  mapper.createMap(SnakeAddress, AddressVm).forMember(
    (d) => d.formattedAddress,
    mapFrom((s) => `${s.street} ${s.city} ${s.state}`)
  );
  mapper.createMap(SnakeAddress, PascalAddressVm).forMember(
    (d) => d.FormattedAddress,
    mapFrom((s) => `${s.street} ${s.city} ${s.state}`)
  );
};
