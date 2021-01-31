import { AutoMap } from '@automapper/classes';
import { SnakeJob } from './job-snake';
import { SnakeUserProfile, SnakeUserProfileVm } from './user-profile-snake';

export class SnakeUser {
  @AutoMap()
  first_name!: string;
  @AutoMap()
  last_name!: string;
  @AutoMap(() => SnakeUserProfile)
  profile!: SnakeUserProfile;
  @AutoMap(() => SnakeJob)
  job!: SnakeJob;
}

export class SnakeUserVm {
  @AutoMap()
  first!: string;
  @AutoMap()
  last!: string;
  @AutoMap()
  full!: string;
  @AutoMap(() => SnakeUserProfileVm)
  profile!: SnakeUserProfileVm;
  @AutoMap()
  job_title!: string;
  @AutoMap()
  job_annual_salary!: number;
}
