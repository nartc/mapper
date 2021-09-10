export const userModelText = `
enum Role {
  ADMIN,
  USER
}
enum StringEnum {
  FOO = "foo",
  BAR = "bar"
}
class Address {
  street: string;
}
class Profile {
  bio: string;
  age: string;
  date: Date;
  num: number;
  role: Role;
  roles: Role[];
  maybeRole?: Role;
  maybeRoles?: Role[];
  nullableRole: Role | null;
  stringEnum: StringEnum;
  stringEnums: StringEnum[];
  maybeStringEnum?: StringEnum;
  maybeStringEnums?: StringEnum[];
  nullableStringEnum: StringEnum | null;
}
export class User {
  firstName: string;
  lastName: string;
  profile: Profile;
  addresses: Address[];
  otherAddresses: Array<Address>;
  flag: boolean;
  foo: any;
  nullable: string | null;
  primitives: string[];
  nullableType: Address | null;
  maybePrimitives?: string[];
  nullablePrimitives: string[] | null;
  maybeType?: Address;
}
`;

export const userModelTextStrict = `
enum Role {
  ADMIN,
  USER
}
enum StringEnum {
  FOO = "foo",
  BAR = "bar"
}
class Address {
  street!: string;
}
class Profile {
  bio!: string;
  age!: string;
  date!: Date;
  num!: number;
  role!: Role;
  roles!: Role[];
  maybeRole?: Role;
  maybeRoles?: Role[];
  nullableRole!: Role | null;
  stringEnum!: StringEnum;
  stringEnums!: StringEnum[];
  maybeStringEnum?: StringEnum;
  maybeStringEnums?: StringEnum[];
  nullableStringEnum!: StringEnum | null;
}
export class User {
  firstName!: string;
  lastName!: string;
  profile!: Profile;
  addresses!: Address[];
  otherAddresses!: Array<Address>;
  flag!: boolean;
  foo!: any;
  nullable!: string | null;
  primitives!: string[];
  nullableType!: Address | null;
  maybePrimitives?: string[];
  nullablePrimitives!: string[] | null;
  maybeType?: Address;
}
`;

export const userModelTranspiledText = `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var Role;
(function (Role) {
    Role[Role["ADMIN"] = 0] = "ADMIN";
    Role[Role["USER"] = 1] = "USER";
})(Role || (Role = {}));
var StringEnum;
(function (StringEnum) {
    StringEnum["FOO"] = "foo";
    StringEnum["BAR"] = "bar";
})(StringEnum || (StringEnum = {}));
class Address {
    street;
    static __AUTOMAPPER_METADATA_FACTORY__() {
        return [["street", { typeFn: () => String }]];
    }
}
class Profile {
    bio;
    age;
    date;
    num;
    role;
    roles;
    maybeRole;
    maybeRoles;
    nullableRole;
    stringEnum;
    stringEnums;
    maybeStringEnum;
    maybeStringEnums;
    nullableStringEnum;
    static __AUTOMAPPER_METADATA_FACTORY__() {
        return [["bio", { typeFn: () => String }], ["age", { typeFn: () => String }], ["date", { typeFn: () => Date }], ["num", { typeFn: () => Number }], ["role", { typeFn: () => Number }], ["roles", { typeFn: () => Number }], ["maybeRole", { typeFn: () => Number }], ["maybeRoles", { typeFn: () => Number }], ["nullableRole", { typeFn: () => Number }], ["stringEnum", { typeFn: () => String }], ["stringEnums", { typeFn: () => String }], ["maybeStringEnum", { typeFn: () => String }], ["maybeStringEnums", { typeFn: () => String }], ["nullableStringEnum", { typeFn: () => String }]];
    }
}
class User {
    firstName;
    lastName;
    profile;
    addresses;
    otherAddresses;
    flag;
    foo;
    nullable;
    primitives;
    nullableType;
    maybePrimitives;
    nullablePrimitives;
    maybeType;
    static __AUTOMAPPER_METADATA_FACTORY__() {
        return [["firstName", { typeFn: () => String }], ["lastName", { typeFn: () => String }], ["profile", { typeFn: () => Profile, depth: 0 }], ["addresses", { typeFn: () => Address, depth: 0 }], ["otherAddresses", { typeFn: () => Address, depth: 0 }], ["flag", { typeFn: () => Boolean }], ["foo", { typeFn: () => null, depth: 0 }], ["nullable", { typeFn: () => String }], ["primitives", { typeFn: () => String }], ["nullableType", { typeFn: () => Address, depth: 0 }], ["maybePrimitives", { typeFn: () => String }], ["nullablePrimitives", { typeFn: () => String }], ["maybeType", { typeFn: () => Address, depth: 0 }]];
    }
}
exports.User = User;
`;

export const userModelTranspiledTextESM = `var Role;
(function (Role) {
    Role[Role["ADMIN"] = 0] = "ADMIN";
    Role[Role["USER"] = 1] = "USER";
})(Role || (Role = {}));
var StringEnum;
(function (StringEnum) {
    StringEnum["FOO"] = "foo";
    StringEnum["BAR"] = "bar";
})(StringEnum || (StringEnum = {}));
class Address {
    street;
    static __AUTOMAPPER_METADATA_FACTORY__() {
        return [["street", { typeFn: () => String }]];
    }
}
class Profile {
    bio;
    age;
    date;
    num;
    role;
    roles;
    maybeRole;
    maybeRoles;
    nullableRole;
    stringEnum;
    stringEnums;
    maybeStringEnum;
    maybeStringEnums;
    nullableStringEnum;
    static __AUTOMAPPER_METADATA_FACTORY__() {
        return [["bio", { typeFn: () => String }], ["age", { typeFn: () => String }], ["date", { typeFn: () => Date }], ["num", { typeFn: () => Number }], ["role", { typeFn: () => Number }], ["roles", { typeFn: () => Number }], ["maybeRole", { typeFn: () => Number }], ["maybeRoles", { typeFn: () => Number }], ["nullableRole", { typeFn: () => Number }], ["stringEnum", { typeFn: () => String }], ["stringEnums", { typeFn: () => String }], ["maybeStringEnum", { typeFn: () => String }], ["maybeStringEnums", { typeFn: () => String }], ["nullableStringEnum", { typeFn: () => String }]];
    }
}
export class User {
    firstName;
    lastName;
    profile;
    addresses;
    otherAddresses;
    flag;
    foo;
    nullable;
    primitives;
    nullableType;
    maybePrimitives;
    nullablePrimitives;
    maybeType;
    static __AUTOMAPPER_METADATA_FACTORY__() {
        return [["firstName", { typeFn: () => String }], ["lastName", { typeFn: () => String }], ["profile", { typeFn: () => Profile, depth: 0 }], ["addresses", { typeFn: () => Address, depth: 0 }], ["otherAddresses", { typeFn: () => Address, depth: 0 }], ["flag", { typeFn: () => Boolean }], ["foo", { typeFn: () => null, depth: 0 }], ["nullable", { typeFn: () => String }], ["primitives", { typeFn: () => String }], ["nullableType", { typeFn: () => Address, depth: 0 }], ["maybePrimitives", { typeFn: () => String }], ["nullablePrimitives", { typeFn: () => String }], ["maybeType", { typeFn: () => Address, depth: 0 }]];
    }
}
`;
