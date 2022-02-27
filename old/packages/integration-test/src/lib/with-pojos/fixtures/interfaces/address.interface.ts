import { createMetadataMap } from '@automapper/pojos';

export interface Address {
  street: string;
  city: string;
  state: string;
}

export interface AddressVm {
  formattedAddress: string;
}

export function createAddressMetadata() {
  createMetadataMap('Address', {
    street: String,
    city: String,
    state: String,
  });
  createMetadataMap('AddressVm', {
    formattedAddress: String,
  });
}
