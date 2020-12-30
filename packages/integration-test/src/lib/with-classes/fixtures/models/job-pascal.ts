import { AutoMap } from '@automapper/classes';

export class PascalJob {
  @AutoMap()
  Title: string;
  @AutoMap()
  AnnualSalary: number;
}
