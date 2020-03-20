import { AutoMapper, mapWith, ProfileBase } from '../../../src';
import { AvatarVm } from '../models/avatar';
import { Profile, ProfileVm } from '../models/profile';

export class ProfileProfile extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(Profile, ProfileVm).forMember(
      d => d.avatar,
      mapWith(AvatarVm, s => s.avatar)
    );
  }
}
