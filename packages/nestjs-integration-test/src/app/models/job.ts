import { AutoMap } from '@automapper/classes';

export class Job {
  @AutoMap()
  title: string;
  @AutoMap()
  annualSalary: number;
}
