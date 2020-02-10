import { AutoMap } from '../src';
import { instantiate } from '../src/metadata-explorer';

describe('MetadataManager', () => {
  class Base {
    @AutoMap()
    createdAt!: Date;
    @AutoMap()
    updatedAt!: Date;
  }

  class Address {
    @AutoMap()
    street!: string;
    @AutoMap()
    city!: string;
    @AutoMap()
    state!: string;
  }

  class User extends Base {
    @AutoMap()
    firstName!: string;
    @AutoMap()
    lastName!: string;
    @AutoMap()
    age!: number;
    @AutoMap()
    isAdmin!: boolean;
    @AutoMap(() => Address)
    address!: Address;
    @AutoMap()
    birthday!: Date;
  }

  it('metadata', () => {
    const user = instantiate(User);
    expect(user).toBeTruthy();
    expect(user).toBeInstanceOf(User);
    expect(user.firstName).toBe(undefined);
    expect(user.lastName).toBe(undefined);
    expect(user.age).toBe(undefined);
    expect(user.isAdmin).toBe(undefined);
    expect(user.address).toBeInstanceOf(Address);
    expect(user.address.street).toBe(undefined);
    expect(user.address.city).toBe(undefined);
    expect(user.address.state).toBe(undefined);
    expect(user.birthday).toBeInstanceOf(Date);
  });
});
