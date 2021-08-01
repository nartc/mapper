import { AutoMap } from '@automapper/classes';
import { Job } from './docs-job';

export class Bio {
  @AutoMap({ typeFn: () => Job })
  job!: Job;
  birthday!: Date;
  @AutoMap()
  avatarUrl!: string;
}

export class BioDto {
  @AutoMap()
  jobTitle!: string;
  @AutoMap()
  jobSalary!: number;
  birthday!: string;
  @AutoMap()
  avatarUrl!: string;
}
