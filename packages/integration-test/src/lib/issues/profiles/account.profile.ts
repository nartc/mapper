import { MappingProfile } from '@automapper/core';
import { AccountDTO, AccountEntity } from '../models/account';

export const accountProfile: MappingProfile = (mapper) => {
  mapper.createMap(AccountEntity, AccountDTO);
};
