import { createMetadataMap } from '@automapper/pojos';

export interface SnakeAddress {
  street: string;
  city: string;
  state: string;
}

export interface SnakeAddressVm {
  formatted_address: string;
}

export function createAddressSnakeMetadata() {
  createMetadataMap('SnakeAddress', {
    street: String,
    city: String,
    state: String,
  });
  createMetadataMap('SnakeAddressVm', {
    formatted_address: String,
  });
}
