import { AutoMapper, ProfileBase } from '../../../src';
import {
  BaseEntity,
  CampusUser,
  ResponseBaseEntity,
  ResponseCampusUserDto,
  ResponseUserDto,
  User,
} from '../models/inheritance-test';

export class BaseEntityProfile extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(BaseEntity, ResponseBaseEntity);
  }
}

export class InheritanceUserProfile extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(User, ResponseUserDto, {
      includeBase: [BaseEntity, ResponseBaseEntity],
    });
  }
}

export class InheritanceCampusUserProfile extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(CampusUser, ResponseCampusUserDto, {
      includeBase: [User, ResponseUserDto],
    });
  }
}
