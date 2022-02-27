import { AutoMap } from '@automapper/classes';

export enum AccountRole {
  Foo = 'foo',
  Bar = 'bar',
}

export class AccountEntity {
  @AutoMap()
  id: string;

  @AutoMap()
  username: string;

  @AutoMap()
  email: string;

  @AutoMap()
  role: AccountRole;

  @AutoMap()
  topics: string[];

  @AutoMap()
  posts: string[];

  emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }
}

export class AccountDTO {
  @AutoMap()
  id: string;

  @AutoMap()
  username: string;

  @AutoMap()
  email: string;

  @AutoMap()
  role: AccountRole;
}
