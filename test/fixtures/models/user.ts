import { AutoMap } from '../../../src';
import { Profile, ProfileVm } from './profile';

export class User {
  @AutoMap()
  firstName!: string;
  @AutoMap()
  lastName!: string;
}

export class UserVm {
  @AutoMap()
  firstName!: string;
  @AutoMap()
  lastName!: string;
  @AutoMap()
  fullName!: string;
}

export class ComplexUser {
  @AutoMap()
  firstName!: string;
  @AutoMap()
  lastName!: string;
  @AutoMap(() => Profile)
  profile!: Profile;
}

export class ComplexUserVm {
  @AutoMap()
  first!: string;
  @AutoMap()
  last!: string;
  @AutoMap()
  full!: string;
  @AutoMap(() => ProfileVm)
  profile!: ProfileVm;
}
