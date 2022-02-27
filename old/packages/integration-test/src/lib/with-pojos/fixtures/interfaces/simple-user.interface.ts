import { createMetadataMap } from '@automapper/pojos';

export interface SimpleUser {
  firstName: string;
  lastName: string;
}

export interface SimpleUserVm {
  firstName: string;
  lastName: string;
  fullName: string;
}

export function createSimpleUserMetadata() {
  createMetadataMap('SimpleUser', {
    firstName: String,
    lastName: String,
  });
  createMetadataMap('SimpleUserVm', 'SimpleUser', {
    fullName: String,
  });
}
