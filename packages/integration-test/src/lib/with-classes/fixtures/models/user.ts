import { AutoMap } from '@automapper/classes';
import { Job } from './job';
import { UserProfile, UserProfileVm } from './user-profile';

export class User {
  @AutoMap()
  firstName!: string;
  @AutoMap()
  lastName!: string;
  @AutoMap(() => UserProfile)
  profile!: UserProfile;
  @AutoMap(() => Job)
  job!: Job;
}

export class UserVm {
  @AutoMap()
  first!: string;
  @AutoMap()
  last!: string;
  @AutoMap()
  full!: string;
  @AutoMap(() => UserProfileVm)
  profile!: UserProfileVm;
  @AutoMap()
  jobTitle!: string;
  @AutoMap()
  jobAnnualSalary!: number;
}
