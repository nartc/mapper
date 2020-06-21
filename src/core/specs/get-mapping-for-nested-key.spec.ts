import { Mapper } from '../../automapper';
import { AutoMap } from '../../decorators';
import { Mapping, MappingClassId } from '../../types';
import { getMappingForNestedKey } from '../get-mapping-for-nested-key';

describe('GetMappingForNestedKey', () => {
  class Foo {
    @AutoMap()
    foo!: string;
  }

  class FooVm {
    @AutoMap()
    fooVm!: string;
    @AutoMap()
    fooVms!: string[];
  }

  class Bar {
    @AutoMap(() => Foo)
    foo!: Foo;
  }

  afterEach(Mapper.dispose.bind(Mapper));

  it('should throw if keyMetadata is false (primitive)', () => {
    expect(() => {
      getMappingForNestedKey(FooVm, 'fooVm', Foo, Mapper.mappingStorage);
    }).toThrowError(
      `Metadata for fooVm is a primitive or Array. Consider manual map this property`
    );
  });

  it('should throw if keyMetadata is an Array', () => {
    expect(() => {
      getMappingForNestedKey(FooVm, 'fooVms', Foo, Mapper.mappingStorage);
    }).toThrowError(
      `Metadata for fooVms is a primitive or Array. Consider manual map this property`
    );
  });

  it('should throw if mapping for destination is not found', () => {
    expect(() => {
      getMappingForNestedKey(Bar, 'foo', FooVm, Mapper.mappingStorage);
    }).toThrowError(
      `Mapping for foo cannot be found. Consider manual map this property with MapWith`
    );
  });

  it('should return mapping if found', () => {
    Mapper.createMap(Foo, FooVm).reverseMap();
    const mapping = getMappingForNestedKey(
      Bar,
      'foo',
      FooVm,
      Mapper.mappingStorage
    ) as Mapping;
    expect(mapping).toBeTruthy();
    expect(mapping[MappingClassId.models][0]).toBe(FooVm);
    expect(mapping[MappingClassId.models][1]).toBe(Foo);
  });
});
