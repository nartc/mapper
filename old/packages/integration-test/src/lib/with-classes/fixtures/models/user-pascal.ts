import { AutoMap } from '@automapper/classes';
import { PascalJob } from './job-pascal';
import { PascalUserProfile, PascalUserProfileVm } from './user-profile-pascal';

export class PascalUser {
  @AutoMap()
  FirstName!: string;
  @AutoMap()
  LastName!: string;
  @AutoMap({ typeFn: () => PascalUserProfile })
  Profile!: PascalUserProfile;
  @AutoMap({ typeFn: () => PascalJob })
  Job!: PascalJob;
}

export class PascalUserVm {
  @AutoMap()
  First!: string;
  @AutoMap()
  Last!: string;
  @AutoMap()
  Full!: string;
  @AutoMap({ typeFn: () => PascalUserProfileVm })
  Profile!: PascalUserProfileVm;
  @AutoMap()
  JobTitle!: string;
  @AutoMap()
  JobAnnualSalary!: number;
}
