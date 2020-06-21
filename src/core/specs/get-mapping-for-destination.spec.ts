import { Mapping, MappingClassId } from '../../types';
import { getMappingForDestination } from '../get-mapping-for-destination';
import { Mapper } from '../../automapper';
import { AutoMap } from '../../decorators';

describe('GetMappingForDestination', () => {
  class Foo {
    @AutoMap()
    foo!: string;
  }

  class FooVm {
    @AutoMap()
    foo!: string;
  }

  afterEach(() => {
    Mapper.dispose();
  });

  it('should return mapping', () => {
    Mapper.createMap(Foo, FooVm);
    const mapping = getMappingForDestination(
      FooVm,
      Foo,
      Mapper.mappingStorage
    ) as Mapping;
    expect(mapping).toBeTruthy();
    expect(mapping[MappingClassId.models][0]).toBe(Foo);
    expect(mapping[MappingClassId.models][1]).toBe(FooVm);
  });

  it('should throw error if there is no mapping and no inherit', () => {
    expect(() =>
      getMappingForDestination(FooVm, Foo, Mapper.mappingStorage)
    ).toThrowError(
      `Mapping not found for source ${Foo.toString()} and destination ${FooVm.toString()}`
    );
  });

  it('should not throw if there is no mapping but inherit', () => {
    const mapping = getMappingForDestination(
      FooVm,
      Foo,
      Mapper.mappingStorage,
      true
    );
    expect(mapping).toBeUndefined();
  });
});
