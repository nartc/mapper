import { createMetadataMap } from '@automapper/pojos';

export interface PascalAddress {
  Street: string;
  City: string;
  State: string;
}

export interface PascalAddressVm {
  FormattedAddress: string;
}

export function createAddressPascalMetadata() {
  createMetadataMap('PascalAddress', {
    Street: String,
    City: String,
    State: String,
  });
  createMetadataMap('PascalAddressVm', {
    FormattedAddress: String,
  });
}
