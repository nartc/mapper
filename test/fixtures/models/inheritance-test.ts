import { AutoMap } from '../../../src';

export class BaseEntity {
  @AutoMap()
  id!: string;
}

export class User extends BaseEntity {
  @AutoMap()
  name!: string;
}

export class CampusUser extends User {
  @AutoMap()
  campusId!: string;
}

export class ResponseBaseEntity {
  @AutoMap()
  id!: string;
}

export class ResponseUserDto extends ResponseBaseEntity {
  @AutoMap()
  name!: string;
}

export class ResponseCampusUserDto extends ResponseUserDto {
  @AutoMap()
  campusId!: string;
}
