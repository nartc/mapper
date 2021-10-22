import { AutoMap } from '@automapper/classes';

export class AccountEntity {
  @AutoMap()
  id: string;

  @AutoMap()
  username: string;

  @AutoMap()
  password?: string;

  @AutoMap()
  email: string;

  @AutoMap()
  role: string;

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
  role: string;
}
