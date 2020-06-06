import { Mapper } from '../../automapper';
import { AutoMap } from '../../decorators';
import { mapFrom } from '../../member-functions';
import { getMappingForNestedKey } from '../get-mapping-for-nested-key';

describe('GetMappingForNestedKey', () => {
  it('keyMetadata is null', () => {
    class Foo {
      @AutoMap()
      foo!: string;
    }

    class FooVm {
      @AutoMap()
      fooVm!: string;
    }

    Mapper.createMap(Foo, FooVm)
      .forMember(
        d => d.fooVm,
        mapFrom(s => s.foo)
      )
      .reverseMap();

    expect(() => {
      getMappingForNestedKey(FooVm, 'fooVm', Foo, Mapper.mappingStorage);
    }).toThrowError(
      `Metadata for fooVm is a primitive or Array. Consider manual map this property`
    );
  });
});
