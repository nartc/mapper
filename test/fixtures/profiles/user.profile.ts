import { AutoMapper, mapFrom, ProfileBase } from '../../../src';
import {
  ComplexUser,
  ComplexUserVm,
  User,
  UserInformation,
  UserVm,
} from '../models/user';

export class UserProfile extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(User, UserVm).forMember(
      d => d.fullName,
      mapFrom(s => s.firstName + ' ' + s.lastName)
    );

    mapper.createMap(User, UserInformation).forMember(
      d => d.fullName,
      mapFrom(s => s.firstName + ' ' + s.lastName)
    );
  }
}

export class ComplexUserProfile extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper
      .createMap(ComplexUser, ComplexUserVm)
      .forMember(
        d => d.first,
        mapFrom(s => s.firstName)
      )
      .forMember(
        d => d.last,
        mapFrom(s => s.lastName)
      )
      .forMember(
        d => d.full,
        mapFrom(s => s.firstName + ' ' + s.lastName)
      )
      .reverseMap();
  }
}
