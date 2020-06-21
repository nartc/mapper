import { defaultNamingConvention } from '../../conventions';
import { initializeMappingProps } from '../initialize-mapping-props';
import { Mapping, MappingClassId } from '../../types';
import { AutoMap } from '../..//decorators';
import { Mapper } from '../../automapper';

describe('InitializeMappingProps', () => {
  afterEach(() => {
    Mapper.dispose();
  });

  it('should initialize fooVm for Mapping of Foo and FooVm', () => {
    class Foo {
      @AutoMap()
      foo!: string;
    }

    class FooVm {
      @AutoMap()
      fooVm!: string;
    }

    const m: Mapping = [
      [Foo, FooVm],
      [false, defaultNamingConvention, defaultNamingConvention],
      [],
      [],
    ];
    Mapper.mappingStorage.set(Foo, FooVm, m);
    const mapping = Mapper.getMapping(Foo, FooVm) as Mapping;
    initializeMappingProps(mapping);
    expect(mapping[MappingClassId.props]).toHaveLength(1);
  });

  it('should initialize fooVm and barVm for Mapping of Foo and FooVm', () => {
    class Bar {
      @AutoMap()
      bar!: string;
    }

    class BarVm {
      @AutoMap()
      barVm!: string;
    }

    class Foo {
      @AutoMap()
      foo!: string;
      @AutoMap(() => Bar)
      bar!: Bar;
    }

    class FooVm {
      @AutoMap()
      fooVm!: string;
      @AutoMap(() => BarVm)
      barVm!: BarVm;
    }

    const m: Mapping = [
      [Foo, FooVm],
      [false, defaultNamingConvention, defaultNamingConvention],
      [],
      [],
    ];
    Mapper.mappingStorage.set(Foo, FooVm, m);
    const mapping = Mapper.getMapping(Foo, FooVm) as Mapping;
    initializeMappingProps(mapping);
    expect(mapping[MappingClassId.props]).toHaveLength(2);
    expect(mapping[MappingClassId.props][0][0]).toBe('fooVm');
    expect(mapping[MappingClassId.props][1][0]).toBe('barVm');
  });

  it('should include Foo.foo in fooVm mapping property paths', () => {
    class Foo {
      @AutoMap()
      foo!: string;
    }

    class FooVm {
      @AutoMap()
      foo!: string;
    }

    const m: Mapping = [
      [Foo, FooVm],
      [false, defaultNamingConvention, defaultNamingConvention],
      [],
      [],
    ];
    Mapper.mappingStorage.set(Foo, FooVm, m);
    const mapping = Mapper.getMapping(Foo, FooVm) as Mapping;
    initializeMappingProps(mapping);
    expect(mapping[MappingClassId.props]).toHaveLength(1);
    expect(mapping[MappingClassId.props][0][1].paths).toHaveLength(2);
  });
});
