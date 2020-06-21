import { ignore, preCondition, mapFrom } from '../../member-functions';
import { Mapper } from '../../automapper';
import { AutoMap } from '../../decorators';
import {
  Mapping,
  CreateMapFluentFunction,
  MappingClassId,
  MappingProperty,
  MemberMapFunctionId,
  TransformationType,
} from '../../types';
import { mockedGetMemberPath } from '../../utils/specs/mocks/get-member-path.mock';

jest.mock('../../utils/getMemberPath');

describe('CreateMapForMember', () => {
  class Foo {
    @AutoMap()
    foo!: string;
  }

  class FooVm {
    @AutoMap()
    foo!: string;
  }

  let mapping: Mapping<Foo, FooVm>;
  let fluentFunction: CreateMapFluentFunction<Foo, FooVm>;

  const selector = (d: FooVm) => d.foo;
  const fn = ignore();
  const path = 'foo';
  const mapFromFn = mapFrom(s => s.foo);

  beforeEach(() => {
    fluentFunction = Mapper.createMap(Foo, FooVm);
    mapping = Mapper.getMapping(Foo, FooVm) as Mapping;
  });

  afterEach(() => {
    Mapper.dispose();
    mockedGetMemberPath.mockClear();
  });

  it('should push new mappingProperty if no existProp (AutoMap)', () => {
    // mock
    mockedGetMemberPath.mockReturnValue(path);

    // remove all automap props
    mapping[MappingClassId.props] = [];
    fluentFunction.forMember(selector, fn);
    assertMockedGetMemberPath();

    // assert after forMember - transformationType should be ignore()
    const prop = assertMappingProperty(0);
    const [
      pName,
      {
        transformation: { mapFn, type, preCond },
      },
    ] = prop;
    expect(pName).toBe(path);
    expect(mapFn).toBe(fn);
    expect(type).toBe(0);
    expect(preCond).toBeUndefined();
  });

  it('should override mapInitialize config with forMember', () => {
    // mock
    mockedGetMemberPath.mockReturnValue(path);

    // assert before forMember
    const prop = assertMappingProperty();

    fluentFunction.forMember(selector, fn);
    assertMockedGetMemberPath();

    const [
      pName,
      {
        transformation: { mapFn, type, preCond },
      },
    ] = prop;
    expect(pName).toBe(path);
    expect(mapFn).toBe(fn);
    expect(type).toBe(0);
    expect(preCond).toBeUndefined();
  });

  it('should include preCond in mappingProperty if provided', () => {
    const preCondFn = preCondition(() => true);

    // mock
    mockedGetMemberPath.mockReturnValue(path);

    const prop = assertMappingProperty();

    fluentFunction.forMember(selector, preCondFn, fn);
    assertMockedGetMemberPath();

    const [
      pName,
      {
        transformation: { mapFn, type, preCond },
      },
    ] = prop;
    expect(pName).toBe(path);
    expect(mapFn).toBe(fn);
    expect(type).toBe(0);
    expect(preCond).toBe(preCondFn);
  });

  it('should get sourcePath for mapFrom', () => {
    // mock
    mockedGetMemberPath.mockReturnValue(path);
    const prop = assertMappingProperty();

    fluentFunction.forMember(selector, mapFromFn);

    expect(mockedGetMemberPath).toHaveBeenCalledTimes(2);
    expect(mockedGetMemberPath.mock.calls).toEqual([
      [selector],
      [mapFromFn[MemberMapFunctionId.misc]],
    ]);

    const [
      pName,
      {
        paths,
        transformation: { mapFn, type, preCond },
      },
    ] = prop;
    expect(pName).toBe(path);
    expect(paths).toHaveLength(2);
    expect(paths[1]).toBe(path);
    expect(mapFn).toBe(mapFromFn);
    expect(type).toBe(1);
    expect(preCond).toBeUndefined();
  });

  function assertMappingProperty(
    transformationType: TransformationType = 6
  ): [string, MappingProperty] {
    const prop = mapping[MappingClassId.props].find(
      ([propName]) => propName === path
    ) as [string, MappingProperty];
    expect(prop).toBeTruthy();
    expect(prop[1].transformation.type).toBe(transformationType);
    return prop;
  }

  function assertMockedGetMemberPath() {
    expect(mockedGetMemberPath).toHaveBeenCalledTimes(1);
    expect(mockedGetMemberPath).toHaveBeenCalledWith(selector);
  }
});
