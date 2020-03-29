import {
  AutoMapper,
  convertUsing,
  ignore,
  mapWith,
  ProfileBase,
} from '../../../src';
import { DateToStringConverter } from '../converters/date-to-string.converter';
import { AvatarVm } from '../models/avatar';
import { Profile, ProfileVm } from '../models/profile';

export class ProfileProfile extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper
      .createMap(Profile, ProfileVm)
      .forMember(
        d => d.avatar,
        mapWith(AvatarVm, s => s.avatar)
      )
      .forMember(
        d => d.birthday,
        convertUsing(new DateToStringConverter(), s => s.birthday)
      )
      .reverseMap()
      .forPath(s => s.birthday, ignore());
  }
}
