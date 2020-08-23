import { AutoMapper, fromValue, ignore, mapDefer, mapFrom, ProfileBase } from '../../../src';
import { Avatar, AvatarVm } from '../models/avatar';
import {
  ComplexUser,
  ComplexUserVm,
  User,
  UserInformation,
  UserVm,
  UserWithDepartments,
  UserWithDepartmentsVm,
  UserWithEmptyProfile,
  UserWithEmptyProfileVm,
  UserWithPromisedField,
  UserWithPromisedFieldVm,
} from '../models/user';

export class UserProfile extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper
      .createMap(User, UserVm)
      .forMember(
        d => d.fullName,
        mapDefer(source => {
          if (source.lastName === 'Ngo') {
            return fromValue('Chau Ngo');
          }

          return mapFrom(s => s.firstName + ' ' + s.lastName);
        }),
      )
      .forMember(
        d => d.firstName,
        mapDefer(source => {
          if (source.lastName === 'Ngo') {
            return fromValue('Chau');
          }
          return mapFrom(s => s.firstName);
        }),
      )
      .reverseMap();

    mapper.createMap(User, UserInformation).forMember(
      d => d.fullName,
      mapFrom(s => s.firstName + ' ' + s.lastName),
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
        mapFrom(s => s.firstName),
      )
      .forMember(
        d => d.last,
        mapFrom(s => s.lastName),
      )
      .forMember(
        d => d.full,
        mapFrom(s => s.firstName + ' ' + s.lastName),
      )
      .reverseMap();
  }
}

export class UserWithEmptyProfileProfile extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(UserWithEmptyProfile, UserWithEmptyProfileVm);
  }
}

export class UserWithDepartmentsProfile extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(UserWithDepartments, UserWithDepartmentsVm);
  }
}

export class UserWithPromiseFieldProfile extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(UserWithPromisedField, UserWithPromisedFieldVm)
      .forMember(d => d.promised, ignore())
      .afterMap(async (source, destination) => {
        const resolvedValues = await source.promised;
        destination.promised = mapper.mapArray(resolvedValues, AvatarVm, Avatar);
      });
  }
}
