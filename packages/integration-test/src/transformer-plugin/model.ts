export const userModelText = `
enum Role {
  ADMIN,
  USER
}
enum StringEnum {
  FOO = "foo",
  BAR = "bar"
}
function AutoMap(): PropertyDecorator {
  return () => {}
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
  /**
   * @autoMapIgnore
   */
  ignoreMe: string;
  @AutoMap()
  ignoreMeToo: string;
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
function AutoMap(): PropertyDecorator {
  return () => {}
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
  /**
   * @autoMapIgnore
   */
  ignoreMe: string;
  @AutoMap()
  ignoreMeToo!: string;
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
function AutoMap() {
    return () => { };
}
class Address {
    street;
    static __AUTOMAPPER_METADATA_FACTORY__() {
        return [
            ["street", { type: () => String, depth: 1 }]
        ];
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
        return [
            ["bio", { type: () => String, depth: 1 }],
            ["age", { type: () => String, depth: 1 }],
            ["date", { type: () => Date, depth: 1 }],
            ["num", { type: () => Number, depth: 1 }],
            ["role", { type: () => Number, depth: 1 }],
            ["roles", { type: () => [Number], depth: 1 }],
            ["maybeRole", { type: () => Number, depth: 1 }],
            ["maybeRoles", { type: () => [Number], depth: 1 }],
            ["nullableRole", { type: () => Number, depth: 1 }],
            ["stringEnum", { type: () => String, depth: 1 }],
            ["stringEnums", { type: () => [String], depth: 1 }],
            ["maybeStringEnum", { type: () => String, depth: 1 }],
            ["maybeStringEnums", { type: () => [String], depth: 1 }],
            ["nullableStringEnum", { type: () => String, depth: 1 }]
        ];
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
    /**
     * @autoMapIgnore
     */
    ignoreMe;
    ignoreMeToo;
    static __AUTOMAPPER_METADATA_FACTORY__() {
        return [
            ["firstName", { type: () => String, depth: 1 }],
            ["lastName", { type: () => String, depth: 1 }],
            ["profile", { type: () => Profile, depth: 1 }],
            ["addresses", { type: () => [Address], depth: 1 }],
            ["otherAddresses", { type: () => [Address], depth: 1 }],
            ["flag", { type: () => Boolean, depth: 1 }],
            ["nullable", { type: () => String, depth: 1 }],
            ["primitives", { type: () => [String], depth: 1 }],
            ["nullableType", { type: () => Address, depth: 1 }],
            ["maybePrimitives", { type: () => [String], depth: 1 }],
            ["nullablePrimitives", { type: () => [String], depth: 1 }],
            ["maybeType", { type: () => Address, depth: 1 }]
        ];
    }
}
__decorate([
    AutoMap()
], User.prototype, "ignoreMeToo", void 0);
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
function AutoMap() {
    return () => { };
}
class Address {
    street;
    static __AUTOMAPPER_METADATA_FACTORY__() {
        return [
            ["street", { type: () => String, depth: 1 }]
        ];
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
        return [
            ["bio", { type: () => String, depth: 1 }],
            ["age", { type: () => String, depth: 1 }],
            ["date", { type: () => Date, depth: 1 }],
            ["num", { type: () => Number, depth: 1 }],
            ["role", { type: () => Number, depth: 1 }],
            ["roles", { type: () => [Number], depth: 1 }],
            ["maybeRole", { type: () => Number, depth: 1 }],
            ["maybeRoles", { type: () => [Number], depth: 1 }],
            ["nullableRole", { type: () => Number, depth: 1 }],
            ["stringEnum", { type: () => String, depth: 1 }],
            ["stringEnums", { type: () => [String], depth: 1 }],
            ["maybeStringEnum", { type: () => String, depth: 1 }],
            ["maybeStringEnums", { type: () => [String], depth: 1 }],
            ["nullableStringEnum", { type: () => String, depth: 1 }]
        ];
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
    /**
     * @autoMapIgnore
     */
    ignoreMe;
    ignoreMeToo;
    static __AUTOMAPPER_METADATA_FACTORY__() {
        return [
            ["firstName", { type: () => String, depth: 1 }],
            ["lastName", { type: () => String, depth: 1 }],
            ["profile", { type: () => Profile, depth: 1 }],
            ["addresses", { type: () => [Address], depth: 1 }],
            ["otherAddresses", { type: () => [Address], depth: 1 }],
            ["flag", { type: () => Boolean, depth: 1 }],
            ["nullable", { type: () => String, depth: 1 }],
            ["primitives", { type: () => [String], depth: 1 }],
            ["nullableType", { type: () => Address, depth: 1 }],
            ["maybePrimitives", { type: () => [String], depth: 1 }],
            ["nullablePrimitives", { type: () => [String], depth: 1 }],
            ["maybeType", { type: () => Address, depth: 1 }]
        ];
    }
}
__decorate([
    AutoMap()
], User.prototype, "ignoreMeToo", void 0);
`;
