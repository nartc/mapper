import { AutoMap } from '@automapper/classes';

export class Job {
  @AutoMap({ typeFn: () => String })
  title!: string | null;
  @AutoMap()
  annualSalary!: number;
}
