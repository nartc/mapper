import { mapFrom, mapWith } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import type { Mapper, MappingProfile } from '@automapper/types';
import { Injectable } from '@nestjs/common';
import { Bar, BarVm, Foo, FooVm } from '../models/foo';

@Injectable()
export class FooProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile(): MappingProfile {
    return (mapper) => {
      mapper.createMap(Bar, BarVm).forMember(
        (d) => d.barVm,
        mapFrom((s) => s.bar)
      );
      mapper
        .createMap(Foo, FooVm)
        .forMember(
          (d) => d.fooVm,
          mapFrom((s) => s.foo)
        )
        .forMember(
          (d) => d.barVm,
          mapWith(
            () => BarVm,
            (s) => s.bar,
            () => Bar
          )
        );
    };
  }
}
