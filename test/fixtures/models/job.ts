import { AutoMap } from '../../../src/decorators';

export class SnakeCaseJob {
  @AutoMap()
  title!: string;
  @AutoMap()
  annual_salary!: number;
}

export class CamelCaseJob {
  @AutoMap()
  title!: string;
  @AutoMap()
  annualSalary!: number;
}
