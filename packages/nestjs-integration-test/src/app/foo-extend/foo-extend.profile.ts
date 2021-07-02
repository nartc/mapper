import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import type { Mapper, MappingProfile } from '@automapper/types';
import { Injectable } from '@nestjs/common';
import { Foo, FooVm } from '../models/foo';
import { FooExtend, FooExtendVm } from './foo-extend.model';

@Injectable()
export class FooExtendProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile(): MappingProfile {
    return (mapper) => {
      mapper.createMap(FooExtend, FooExtendVm, {
        extends: [mapper.getMapping(Foo, FooVm)],
      });
    };
  }
}
