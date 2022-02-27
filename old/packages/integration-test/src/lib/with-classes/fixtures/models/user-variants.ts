import { AutoMap } from '@automapper/classes';

export class UserWithGetter {
  private _firstName!: string;
  @AutoMap()
  get firstName() {
    return this._firstName;
  }

  set firstName(value: string) {
    this._firstName = value;
  }

  private _lastName!: string;
  @AutoMap()
  get lastName() {
    return this._lastName;
  }

  set lastName(value: string) {
    this._lastName = value;
  }
}

export class UserWithOnlyGetter {
  private _firstName!: string;
  @AutoMap()
  get firstName(): string {
    return this._firstName;
  }

  private _lastName!: string;
  @AutoMap()
  get lastName(): string {
    return this._lastName;
  }

  setFirstName(v: string) {
    this._firstName = v;
    return this;
  }

  setLastName(v: string) {
    this._lastName = v;
    return this;
  }
}

export class UserWithReturnKeyword {
  @AutoMap()
  returnFirstName!: string;
  @AutoMap()
  returnLastName!: string;
}

export class UserWithReturnKeywordVm {
  @AutoMap()
  returnReturnFirst!: string;
  @AutoMap()
  returnReturnLast!: string;
  @AutoMap()
  returnReturnFull!: string;
}
