import type { MappingProfile } from '@automapper/core';
import { mapFrom } from '@automapper/core';
import type {
  PascalAddress,
  PascalAddressVm,
} from '../interfaces/address-pascal.interface';
import { createAddressPascalMetadata } from '../interfaces/address-pascal.interface';
import type {
  SnakeAddress,
  SnakeAddressVm,
} from '../interfaces/address-snake.interface';
import { createAddressSnakeMetadata } from '../interfaces/address-snake.interface';
import type { Address, AddressVm } from '../interfaces/address.interface';
import { createAddressMetadata } from '../interfaces/address.interface';

export const addressProfile: MappingProfile = (mapper) => {
  createAddressMetadata();
  createAddressPascalMetadata();
  createAddressSnakeMetadata();

  mapper.createMap<Address, AddressVm>('Address', 'AddressVm').forMember(
    (d) => d.formattedAddress,
    mapFrom((s) => `${s.street} ${s.city} ${s.state}`)
  );
  mapper
    .createMap<Address, PascalAddressVm>('Address', 'PascalAddressVm')
    .forMember(
      (d) => d.FormattedAddress,
      mapFrom((s) => `${s.street} ${s.city} ${s.state}`)
    );
  mapper
    .createMap<Address, SnakeAddressVm>('Address', 'SnakeAddressVm')
    .forMember(
      (d) => d.formatted_address,
      mapFrom((s) => `${s.street} ${s.city} ${s.state}`)
    );
};

export const pascalAddressProfile: MappingProfile = (mapper) => {
  createAddressMetadata();
  createAddressPascalMetadata();
  createAddressSnakeMetadata();

  mapper
    .createMap<PascalAddress, PascalAddressVm>(
      'PascalAddress',
      'PascalAddressVm'
    )
    .forMember(
      (d) => d.FormattedAddress,
      mapFrom((s) => `${s.Street} ${s.City} ${s.State}`)
    );
  mapper
    .createMap<PascalAddress, AddressVm>('PascalAddress', 'AddressVm')
    .forMember(
      (d) => d.formattedAddress,
      mapFrom((s) => `${s.Street} ${s.City} ${s.State}`)
    );
  mapper
    .createMap<PascalAddress, SnakeAddressVm>('PascalAddress', 'SnakeAddressVm')
    .forMember(
      (d) => d.formatted_address,
      mapFrom((s) => `${s.Street} ${s.City} ${s.State}`)
    );
};

export const snakeAddressProfile: MappingProfile = (mapper) => {
  createAddressMetadata();
  createAddressPascalMetadata();
  createAddressSnakeMetadata();

  mapper
    .createMap<SnakeAddress, SnakeAddressVm>('SnakeAddress', 'SnakeAddressVm')
    .forMember(
      (d) => d.formatted_address,
      mapFrom((s) => `${s.street} ${s.city} ${s.state}`)
    );
  mapper
    .createMap<SnakeAddress, AddressVm>('SnakeAddress', 'AddressVm')
    .forMember(
      (d) => d.formattedAddress,
      mapFrom((s) => `${s.street} ${s.city} ${s.state}`)
    );
  mapper
    .createMap<SnakeAddress, PascalAddressVm>('SnakeAddress', 'PascalAddressVm')
    .forMember(
      (d) => d.FormattedAddress,
      mapFrom((s) => `${s.street} ${s.city} ${s.state}`)
    );
};
