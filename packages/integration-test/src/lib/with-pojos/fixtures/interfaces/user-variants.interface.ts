import { createMetadataMap } from '@automapper/pojos';

export interface UserWithReturnKeyword {
  returnFirstName: string;
  returnLastName: string;
}

export interface UserWithReturnKeywordVm {
  returnReturnFirst: string;
  returnReturnLast: string;
  returnReturnFull: string;
}

export function createUserVariantsMetadata() {
  createMetadataMap('UserWithReturnKeyword', {
    returnFirstName: String,
    returnLastName: String,
  });

  createMetadataMap('UserWithReturnKeywordVm', {
    returnReturnFirst: String,
    returnReturnLast: String,
    returnReturnFull: String,
  });
}
