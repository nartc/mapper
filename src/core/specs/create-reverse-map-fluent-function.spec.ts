import { ignore } from '../../member-functions/ignore';
import { createReverseMapFluentFunction } from '../create-reverse-map-fluent-function';
import { Mapper } from '../../automapper';
import { Mapping, MappingClassId } from '../../types';
import { AutoMap } from '../../decorators';
import { mockedCreateMapForMember } from './mocks/create-map-for-member.mock';

jest.mock('../create-map-for-member');

describe('CreateReverseMapFluentFunction', () => {
  class Foo {
    @AutoMap()
    foo!: string;
  }

  class FooVm {
    @AutoMap()
    foo!: string;
  }

  let mapping: Mapping<Foo, FooVm>;

  beforeEach(() => {
    Mapper.createMap(Foo, FooVm);
    mapping = Mapper.getMapping(Foo, FooVm) as Mapping;
  });

  afterEach(() => {
    Mapper.dispose();
    mockedCreateMapForMember.mockClear();
  });

  function assertReverseFluentFunction() {
    const reversedFluentFunction = createReverseMapFluentFunction(mapping);
    expect(reversedFluentFunction).toBeTruthy();
    expect(reversedFluentFunction.forPath).toBeTruthy();
    expect(reversedFluentFunction.forPath).toBeInstanceOf(Function);
    expect(reversedFluentFunction.beforeMap).toBeTruthy();
    expect(reversedFluentFunction.beforeMap).toBeInstanceOf(Function);
    expect(reversedFluentFunction.afterMap).toBeTruthy();
    expect(reversedFluentFunction.afterMap).toBeInstanceOf(Function);
    return reversedFluentFunction;
  }

  it('should create reversedMapFluentFunction', () => {
    assertReverseFluentFunction();
  });

  it('should call createMapForMember when forPath is invoked', () => {
    const fluentFunction = assertReverseFluentFunction();
    const selector = (s: Foo) => s.foo;
    const fn = ignore();
    fluentFunction.forPath(selector, fn);
    expect(mockedCreateMapForMember).toHaveBeenCalledTimes(1);
    expect(mockedCreateMapForMember).toHaveBeenCalledWith(
      mapping,
      selector,
      [fn],
      fluentFunction
    );
  });

  it('should assign action to beforeMap callback', () => {
    const fluentFunction = assertReverseFluentFunction();
    const action = () => {};
    fluentFunction.beforeMap(action);
    expect(mapping[MappingClassId.actions][0]).toEqual(action);
  });

  it('should assign action to afterMap callback', () => {
    const fluentFunction = assertReverseFluentFunction();
    const action = () => {};
    fluentFunction.afterMap(action);
    expect(mapping[MappingClassId.actions][1]).toEqual(action);
  });
});
