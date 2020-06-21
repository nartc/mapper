import { Mapper } from '../../automapper';
import { defaultNamingConvention } from '../../conventions';
import { AutoMap } from '../../decorators';
import { ignore } from '../../member-functions/ignore';
import {
  CreateMapFluentFunction,
  Mapping,
  MapAction,
  MappingClassId,
} from '../../types';
import { createMapFluentFunction } from '../create-map-fluent-function';
import { createMappingObject } from '../create-mapping-object';
import { mockedCreateMapForMember } from './mocks/create-map-for-member.mock';
import { mockedGetMappingForDestination } from './mocks/get-mapping-for-destination.mock';
import { mockedInheritBaseMapping } from './mocks/inherit-base-mapping.mock';
import { mockedCreateReverseMapFluentFunction } from './mocks/create-reverse-map-fluent-function.mock';
import { mockedCreateReverseMappingObject } from './mocks/create-reverse-mapping-object.mock';

jest.mock('../inherit-base-mapping');
jest.mock('../get-mapping-for-destination');
jest.mock('../create-map-for-member');
jest.mock('../create-reverse-map-fluent-function');
jest.mock('../create-reverse-mapping-object');

describe('CreateMapFluentFunction', () => {
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

  let mapping: Mapping<Foo, FooVm>;
  let baseMapping: Mapping;

  const defaultOptions = {
    useUndefined: false,
    destinationMemberNamingConvention: defaultNamingConvention,
    sourceMemberNamingConvention: defaultNamingConvention,
  };

  beforeEach(() => {
    createMappingObject(Base, BaseVm, defaultOptions, Mapper.mappingStorage);
    createMappingObject(Foo, FooVm, defaultOptions, Mapper.mappingStorage);
    mapping = Mapper.getMapping(Foo, FooVm) as Mapping;
    baseMapping = Mapper.getMapping(Base, BaseVm) as Mapping;
  });
  afterEach(() => {
    Mapper.dispose();
    mockedGetMappingForDestination.mockClear();
    mockedInheritBaseMapping.mockClear();
    mockedCreateMapForMember.mockClear();
    mockedCreateReverseMappingObject.mockClear();
    mockedCreateReverseMapFluentFunction.mockClear();
  });

  it('should call inheritBaseMapping if baseMapping is not null', () => {
    // mock
    mockedGetMappingForDestination.mockReturnValue(baseMapping);
    mockedInheritBaseMapping.mockImplementation(() => {});

    const fluentFunction = createMapFluentFunction(
      mapping,
      { includeBase: [Base, BaseVm] },
      Mapper.mappingStorage
    );

    assertFluentFunction(fluentFunction);
    expect(mockedGetMappingForDestination).toHaveBeenCalledTimes(1);
    expect(mockedGetMappingForDestination).toHaveBeenCalledWith(
      BaseVm,
      Base,
      Mapper.mappingStorage,
      true
    );
    expect(mockedGetMappingForDestination).toHaveReturnedWith(baseMapping);
    expect(mockedInheritBaseMapping).toHaveBeenCalledTimes(1);
    expect(mockedInheritBaseMapping).toHaveBeenCalledWith(mapping, baseMapping);
  });

  it('should not call inheritBaseMapping if baseMapping is not found', () => {
    // mock
    mockedGetMappingForDestination.mockReturnValue(undefined);

    const fluentFunction = createMapFluentFunction(
      mapping,
      { includeBase: [Base, BaseVm] },
      Mapper.mappingStorage
    );

    // assert
    assertFluentFunction(fluentFunction);
    expect(mockedGetMappingForDestination).toHaveBeenCalledTimes(1);
    expect(mockedGetMappingForDestination).toHaveBeenCalledWith(
      BaseVm,
      Base,
      Mapper.mappingStorage,
      true
    );
    expect(mockedInheritBaseMapping).toHaveBeenCalledTimes(0);
  });

  it('should not call getMappingForDestination and inheritBaseMapping if options.includeBase is undefined', () => {
    const fluentFunction = createMapFluentFunction(
      mapping,
      { includeBase: undefined },
      Mapper.mappingStorage
    );
    // assert
    assertFluentFunction(fluentFunction);
    expect(mockedGetMappingForDestination).toHaveBeenCalledTimes(0);
    expect(mockedInheritBaseMapping).toHaveBeenCalledTimes(0);
  });

  it('should call createMapForMember when invoke fluentFunction.forMember', () => {
    const fluentFunction = createMapFluentFunction(
      mapping,
      { includeBase: undefined },
      Mapper.mappingStorage
    );
    assertFluentFunction(fluentFunction);
    const selector = (d: FooVm) => d.foo;
    const fn = ignore();

    fluentFunction.forMember(selector, fn);
    expect(mockedCreateMapForMember).toHaveBeenCalledTimes(1);
    expect(mockedCreateMapForMember).toHaveBeenCalledWith(
      mapping,
      selector,
      [fn],
      fluentFunction
    );
  });

  it('should set mapping[actions][0] to beforeMap action', () => {
    const fluentFunction = createMapFluentFunction(
      mapping,
      { includeBase: undefined },
      Mapper.mappingStorage
    );
    assertFluentFunction(fluentFunction);
    const action: MapAction = () => {};
    fluentFunction.beforeMap(action);
    expect(mapping[MappingClassId.actions][0]).toEqual(action);
  });

  it('should set mapping[actions][1] to afterMap action', () => {
    const fluentFunction = createMapFluentFunction(
      mapping,
      { includeBase: undefined },
      Mapper.mappingStorage
    );
    assertFluentFunction(fluentFunction);
    const action: MapAction = () => {};
    fluentFunction.afterMap(action);
    expect(mapping[MappingClassId.actions][1]).toEqual(action);
  });

  it('should call createReverseMapFluentFunction and createReverseMappingObject when invoke fluentFunction.reverseMap', () => {
    const [
      [source, destination],
      [useUndefined, sourceNaming, destinationNaming],
    ] = mapping;
    const reversedMapping: Mapping = [
      [destination, source],
      [useUndefined, destinationNaming, sourceNaming],
      [],
      [],
    ];
    mockedCreateReverseMappingObject.mockReturnValue(reversedMapping);
    const fluentFunction = createMapFluentFunction(
      mapping,
      { includeBase: undefined },
      Mapper.mappingStorage
    );
    assertFluentFunction(fluentFunction);
    fluentFunction.reverseMap();
    expect(mockedCreateReverseMappingObject).toHaveBeenCalledTimes(1);
    expect(mockedCreateReverseMappingObject).toHaveBeenCalledWith(
      mapping,
      Mapper.mappingStorage
    );
    expect(mockedCreateReverseMappingObject).toHaveReturnedWith(
      reversedMapping
    );
    expect(mockedCreateReverseMapFluentFunction).toHaveBeenCalledTimes(1);
    expect(mockedCreateReverseMapFluentFunction).toHaveBeenCalledWith(
      reversedMapping
    );
  });

  function assertFluentFunction(fluentFunction: CreateMapFluentFunction) {
    expect(fluentFunction).toBeTruthy();
    expect(fluentFunction.forMember).toBeTruthy();
    expect(fluentFunction.forMember).toBeInstanceOf(Function);
    expect(fluentFunction.beforeMap).toBeTruthy();
    expect(fluentFunction.beforeMap).toBeInstanceOf(Function);
    expect(fluentFunction.afterMap).toBeTruthy();
    expect(fluentFunction.afterMap).toBeInstanceOf(Function);
    expect(fluentFunction.reverseMap).toBeTruthy();
    expect(fluentFunction.reverseMap).toBeInstanceOf(Function);
  }
});
