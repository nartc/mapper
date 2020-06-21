import { inheritBaseMapping } from '../inherit-base-mapping';
import { Mapper } from '../../automapper';
import { AutoMap } from '../../decorators';
import { Mapping, MappingClassId } from '../../types';

describe('InheritBaseMapping', () => {
  class Base {
    @AutoMap()
    base!: string;
  }

  class BaseVm {
    @AutoMap()
    base!: string;
  }

  class Foo extends Base {
    @AutoMap()
    foo!: string;
  }

  class FooVm extends BaseVm {
    @AutoMap()
    fooVm!: string;
  }

  afterEach(() => {
    Mapper.dispose();
  });

  it('should inherit base when map Foo-FooVm', () => {
    Mapper.createMap(Base, BaseVm);
    Mapper.createMap(Foo, FooVm);
    const mapping = Mapper.getMapping(Foo, FooVm) as Mapping;
    const baseMapping = Mapper.getMapping(Base, BaseVm) as Mapping;
    inheritBaseMapping(mapping, baseMapping);
    expect(mapping[MappingClassId.bases]).toHaveLength(2);
    expect(mapping[MappingClassId.bases]?.[0]).toBe(Base);
    expect(mapping[MappingClassId.bases]?.[1]).toBe(BaseVm);
    expect(mapping[MappingClassId.props]).toHaveLength(2);
    expect(mapping[MappingClassId.props][0][0]).toBe('base');
  });
});
