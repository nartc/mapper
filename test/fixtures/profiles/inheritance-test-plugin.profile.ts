import { AutoMapper, ProfileBase } from '../../../src';
import {
  BaseEntityPlugin,
  CampusUserPlugin,
  ResponseBaseEntityPlugin,
  ResponseCampusUserDtoPlugin,
  ResponseUserDtoPlugin,
  UserPlugin,
} from '../models/inheritance-test-plugin';

export class BaseEntityPluginProfile extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(BaseEntityPlugin, ResponseBaseEntityPlugin);
  }
}

export class InheritanceUserPluginProfile extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(UserPlugin, ResponseUserDtoPlugin, {
      includeBase: [BaseEntityPlugin, ResponseBaseEntityPlugin],
    });
  }
}

export class InheritanceCampusUserPluginProfile extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(CampusUserPlugin, ResponseCampusUserDtoPlugin, {
      includeBase: [UserPlugin, ResponseUserDtoPlugin],
    });
  }
}
