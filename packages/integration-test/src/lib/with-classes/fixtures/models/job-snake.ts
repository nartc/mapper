import { AutoMap } from '@automapper/classes';

export class SnakeJob {
  @AutoMap()
  title!: string;
  @AutoMap()
  annual_salary!: number;
}
