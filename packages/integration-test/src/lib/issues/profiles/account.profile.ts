import { MappingProfile } from '@automapper/types';
import { AccountDTO, AccountEntity } from '../models/account';

export const accountProfile: MappingProfile = mapper => {
  mapper.createMap(AccountEntity, AccountDTO);
}
