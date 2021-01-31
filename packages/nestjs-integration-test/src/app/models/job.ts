import { AutoMap } from '@automapper/classes';

export class Job {
  @AutoMap(() => String)
  title!: string | null;
  @AutoMap()
  annualSalary!: number;
}
