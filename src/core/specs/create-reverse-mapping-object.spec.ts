import { createReverseMappingObject } from '../create-reverse-mapping-object';
import { Mapper } from '../../automapper';
import { AutoMap } from '../../decorators';
import { Mapping, MappingClassId } from '../../types';

import { mockedGetMappingForDestination } from './mocks/get-mapping-for-destination.mock';
import { mockedInheritBaseMapping } from './mocks/inherit-base-mapping.mock';
import { mockedInitializeReverseMappingProps } from './mocks/initialize-reverse-mapping-props.mock';

jest.mock('../get-mapping-for-destination');
jest.mock('../inherit-base-mapping');
jest.mock('../initialize-reverse-mapping-props');

describe('CreateReverseMappingObject', () => {
  class Foo {
    @AutoMap()
    foo!: string;
  }

  class FooVm {
    @AutoMap()
    foo!: string;
  }

  class Base {
    @AutoMap()
    base!: string;
  }

  class BaseVm {
    @AutoMap()
    base!: string;
  }

  afterEach(() => {
    Mapper.dispose();
    mockedGetMappingForDestination.mockClear();
    mockedInheritBaseMapping.mockClear();
    mockedInitializeReverseMappingProps.mockClear();
  });

  it('should return reversedMapping if found', () => {
    Mapper.createMap(Foo, FooVm).reverseMap();
    const mapping = Mapper.getMapping(Foo, FooVm) as Mapping;
    const reversedMapping = Mapper.getMapping(FooVm, Foo) as Mapping;
    // assert
    assertMockedFunctions(mapping, reversedMapping);
    expect(mockedInheritBaseMapping).toHaveBeenCalledTimes(0);

    const result = createReverseMappingObject(mapping, Mapper.mappingStorage);
    expect(result).toBe(reversedMapping);
    // should not be called a 2nd time
    expect(mockedInitializeReverseMappingProps).toHaveBeenCalledTimes(1);
    expect(mockedGetMappingForDestination).toHaveBeenCalledTimes(1);
    expect(mockedInheritBaseMapping).toHaveBeenCalledTimes(0);
  });

  it('should create reversedMapping if not found', () => {
    Mapper.createMap(Foo, FooVm);
    const mapping = Mapper.getMapping(Foo, FooVm) as Mapping;
    const reversedMapping = createReverseMappingObject(
      mapping,
      Mapper.mappingStorage
    );
    expect(reversedMapping).toBeTruthy();
    expect(reversedMapping[MappingClassId.models][0]).toEqual(
      mapping[MappingClassId.models][1]
    );
    expect(reversedMapping[MappingClassId.models][1]).toEqual(
      mapping[MappingClassId.models][0]
    );

    assertMockedFunctions(mapping, reversedMapping);
    expect(mockedInheritBaseMapping).toHaveBeenCalledTimes(0);
  });

  it('should includeBase if provided', () => {
    Mapper.createMap(Base, BaseVm).reverseMap();
    Mapper.createMap(Foo, FooVm);

    // mock
    const reversedBaseMapping = Mapper.getMapping(BaseVm, Base) as Mapping;
    mockedGetMappingForDestination.mockReturnValue(reversedBaseMapping);

    const mapping = Mapper.getMapping(Foo, FooVm) as Mapping;
    const reversedMapping = createReverseMappingObject(
      mapping,
      Mapper.mappingStorage
    );
    expect(reversedMapping).toBeTruthy();
    expect(reversedMapping[MappingClassId.models][0]).toEqual(
      mapping[MappingClassId.models][1]
    );
    expect(reversedMapping[MappingClassId.models][1]).toEqual(
      mapping[MappingClassId.models][0]
    );

    expect(mockedInitializeReverseMappingProps).toHaveBeenCalledTimes(2);
    expect(mockedGetMappingForDestination).toHaveBeenCalledTimes(2);
    expect(mockedInheritBaseMapping).toHaveBeenCalledTimes(1);
    expect(mockedInheritBaseMapping).toHaveBeenCalledWith(
      reversedMapping,
      reversedBaseMapping
    );
  });

  function assertMockedFunctions(mapping: Mapping, reversedMapping: Mapping) {
    expect(mockedInitializeReverseMappingProps).toHaveBeenCalledTimes(1);
    expect(mockedInitializeReverseMappingProps).toHaveBeenCalledWith(mapping);
    expect(mockedGetMappingForDestination).toHaveBeenCalledTimes(1);
    expect(mockedGetMappingForDestination).toHaveBeenCalledWith(
      reversedMapping[MappingClassId.bases]![1],
      reversedMapping[MappingClassId.bases]![0],
      Mapper.mappingStorage,
      true
    );
  }
});
