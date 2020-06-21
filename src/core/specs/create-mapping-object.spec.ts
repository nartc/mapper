import { createMappingObject } from '../create-mapping-object';
import { Mapper } from '../../automapper';
import { defaultNamingConvention } from '../../conventions';
import { AutoMap } from '../../decorators';
import { mockedInitializeMappingProps } from './mocks/initialize-mapping-props.mock';

jest.mock('../initialize-mapping-props');

describe('CreateMappingObject', () => {
  class Foo {
    @AutoMap()
    foo!: string;
  }

  class FooVm {
    @AutoMap()
    foo!: string;
  }

  const defaultOptions = {
    useUndefined: false,
    destinationMemberNamingConvention: defaultNamingConvention,
    sourceMemberNamingConvention: defaultNamingConvention,
  };

  afterEach(() => {
    Mapper.dispose();
    mockedInitializeMappingProps.mockClear();
  });

  it('should call initializeMappingProps and set new Mapping to mappingStorage', () => {
    createMappingObject(Foo, FooVm, defaultOptions, Mapper.mappingStorage);
    const mapping = Mapper.getMapping(Foo, FooVm);
    expect(mapping).toBeTruthy();
    expect(mockedInitializeMappingProps).toHaveBeenCalledTimes(1);
    expect(mockedInitializeMappingProps).toHaveBeenCalledWith(mapping);
  });

  it('should throw error if a Mapping for same Source and Destination is created the 2nd time', () => {
    createMappingObject(Foo, FooVm, defaultOptions, Mapper.mappingStorage);
    expect(mockedInitializeMappingProps).toHaveBeenCalledTimes(1);
    expect(() => {
      createMappingObject(Foo, FooVm, defaultOptions, Mapper.mappingStorage);
    }).toThrowError(
      `Mapping for source ${Foo.toString()} and destination ${FooVm.toString()} already exists`
    );
    // initializeMappingProps should not have been called the 2nd time
    expect(mockedInitializeMappingProps).toHaveBeenCalledTimes(1);
  });
});
