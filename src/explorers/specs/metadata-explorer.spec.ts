import { AutoMap } from '../../decorators';
import { metadataStorage } from '../../storages';
import { MetadataExplorer } from '../metadata.explorer';

describe('MetadataExplorer', () => {
  it('explore can be invoked', () => {
    const spy = jest
      .spyOn(MetadataExplorer, 'explore')
      .mockImplementation(() => 'returned');

    class Foo {
      @AutoMap()
      foo!: string;
    }

    class Bar {
      @AutoMap()
      bar!: number;
    }

    MetadataExplorer.explore(Foo, Bar);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveReturnedWith('returned');
    spy.mockRestore();
  });

  it('should work with plugin and metadataStorage', () => {
    const spy = jest.spyOn(metadataStorage, 'addMetadata');

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
        return {
          street: () => String,
          city: () => String,
          state: () => String,
        };
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

    MetadataExplorer.explore(Address, User);
    expect(spy).toHaveBeenCalledTimes(12);
  });
});
