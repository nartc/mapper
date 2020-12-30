import { AutoMap } from '@automapper/classes';

export class SimpleUser {
  @AutoMap()
  firstName: string;
  @AutoMap()
  lastName: string;
}

export class SimpleUserVm {
  @AutoMap()
  firstName: string;
  @AutoMap()
  lastName: string;
  @AutoMap()
  fullName: string;
}
