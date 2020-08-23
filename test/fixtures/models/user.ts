import { AutoMap } from '../../../src';
import { Avatar, AvatarVm } from './avatar';
import {
  AbstractBase,
  AbstractBaseVm,
  Base,
  BaseVm,
  FooBase,
  FooVmBase,
  NestedFooBase,
  NestedFooVmBase,
} from './base';
import { CamelCaseJob, SnakeCaseJob } from './job';
import { EmptyProfile, EmptyProfileVm, Profile, ProfileVm } from './profile';

export class UserNoDecorator {
  firstName!: string;
  lastName!: string;
  age!: number;
  birthday!: Date;
  isAdult!: boolean;
  addresses!: string[];
  profile!: Profile;
}

export class UserNoDecoratorTwo {
  firstName!: string;
  lastName!: string;
  age!: number;
}

export class User {
  @AutoMap()
  firstName!: string;
  @AutoMap()
  lastName!: string;
}

export class UserVm {
  @AutoMap()
  firstName!: string;
  @AutoMap()
  lastName!: string;
  @AutoMap()
  fullName!: string;
}

export class UserInformation {
  @AutoMap()
  fullName!: string;
}

export class ComplexUser {
  @AutoMap()
  firstName!: string;
  @AutoMap()
  lastName!: string;
  @AutoMap(() => Profile)
  profile!: Profile;
}

export class ComplexUserVm {
  @AutoMap()
  first!: string;
  @AutoMap()
  last!: string;
  @AutoMap()
  full!: string;
  @AutoMap(() => ProfileVm)
  profile!: ProfileVm;
}

export class SnakeCaseUser {
  @AutoMap()
  first_name!: string;
  @AutoMap()
  last_name!: string;
  @AutoMap()
  some_long_property!: number;
  @AutoMap(() => SnakeCaseJob)
  job!: SnakeCaseJob;
}

export class CamelCaseUser {
  @AutoMap()
  firstName!: string;
  @AutoMap()
  lastName!: string;
  @AutoMap()
  someLongProperty!: number;
  @AutoMap(() => CamelCaseJob)
  job!: CamelCaseJob;
}

export class SnakeCaseUserVm {
  @AutoMap()
  firstName!: string;
  @AutoMap()
  lastName!: string;
  @AutoMap()
  someLongProperty!: number;
  @AutoMap()
  jobTitle!: string;
  @AutoMap()
  jobAnnualSalary!: number;
}

export class PascalCaseUserVm {
  @AutoMap()
  FirstName!: string;
  @AutoMap()
  LastName!: string;
  @AutoMap()
  SomeLongProperty!: number;
  @AutoMap()
  JobTitle!: string;
  @AutoMap()
  JobAnnualSalary!: number;
}

export class UserWithBase extends Base {
  @AutoMap()
  firstName!: string;
  @AutoMap()
  lastName!: string;
  @AutoMap()
  about!: string;
}

export class UserVmWithBase extends BaseVm {
  @AutoMap()
  first!: string;
  @AutoMap()
  last!: string;
  @AutoMap()
  full!: string;
  @AutoMap()
  aboutMe!: string;
}

export class UserWithGetter {
  private _firstName!: string;
  @AutoMap()
  public get firstName() {
    return this._firstName;
  }

  public set firstName(value: string) {
    this._firstName = value;
  }

  private _lastName!: string;
  @AutoMap()
  public get lastName() {
    return this._lastName;
  }

  public set lastName(value: string) {
    this._lastName = value;
  }
}

export class UserWithEmptyProfile {
  @AutoMap()
  name!: string;
  @AutoMap(() => EmptyProfile)
  profile!: EmptyProfile;
}

export class UserWithEmptyProfileVm {
  @AutoMap()
  name!: string;
  @AutoMap(() => EmptyProfileVm)
  profile!: EmptyProfileVm;
}

export class UserWithAbstractBase extends AbstractBase {
  @AutoMap()
  name!: string;
}

export class UserWithAbstractBaseVm extends AbstractBaseVm {
  @AutoMap()
  name!: string;
}

export class UserWithFooBase extends FooBase {
  @AutoMap(() => NestedFooBase)
  nestedFooBase!: NestedFooBase;
}

export class UserWithFooVmBase extends FooVmBase {
  @AutoMap(() => NestedFooVmBase)
  nestedFooBase!: NestedFooVmBase;
}

export class UserWithListFooBase extends FooBase {
  @AutoMap(() => NestedFooBase)
  nestedFooBases!: NestedFooBase[];
}

export class UserWithListFooVmBase extends FooVmBase {
  @AutoMap(() => NestedFooVmBase)
  nestedFooBases!: NestedFooVmBase[];
}

export class UserWithDepartments {
  @AutoMap()
  departments!: number[];
}

export class UserWithDepartmentsVm {
  @AutoMap()
  departments!: number[];
}

export class UserWithPromisedField {
  @AutoMap(() => Avatar)
  promised!: Promise<Avatar[]>;
}

export class UserWithPromisedFieldVm {
  @AutoMap(() => AvatarVm)
  promised!: AvatarVm[];
}
