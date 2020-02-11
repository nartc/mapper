import { AutoMap } from '../src';
import {
  instantiate,
  MetadataExplorer,
  metadataManager,
} from '../src/metadata-explorer';

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

  afterAll(() => {
    metadataManager.dispose();
  });

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

describe('MetadataManager - plugin', () => {
  class Base {
    @AutoMap()
    createdAt!: Date;
    @AutoMap()
    updatedAt!: Date;
    @AutoMap()
    id!: string;
  }

  class Address {
    street!: string;
    city!: string;
    state!: string;

    static __NARTC_AUTOMAPPER_METADATA_FACTORY() {
      return { street: () => String, city: () => String, state: () => String };
    }
  }

  class User extends Base {
    firstName!: string;
    lastName!: string;
    age!: number;
    isAdmin!: boolean;
    address!: Address;
    birthday!: Date;

    static __NARTC_AUTOMAPPER_METADATA_FACTORY() {
      return {
        firstName: () => String,
        lastName: () => String,
        age: () => Number,
        isAdmin: () => Boolean,
        address: () => Address,
        birthday: () => Date,
      };
    }
  }

  beforeAll(() => {
    MetadataExplorer.exploreMany(Address, User);
  });

  afterAll(() => {
    metadataManager.dispose();
  });

  it('metadata', () => {
    const user = instantiate(User);
    expect(user).toBeTruthy();
  });
});
