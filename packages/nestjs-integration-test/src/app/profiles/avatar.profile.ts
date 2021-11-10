import type { Mapper, MappingProfile } from '@automapper/core';
import {
  condition,
  ignore,
  mapFrom,
  nullSubstitution,
  preCondition,
} from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { Avatar, AvatarVm } from '../models/avatar';

@Injectable()
export class AvatarProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile(): MappingProfile {
    return (mapper) => {
      mapper
        .createMap(Avatar, AvatarVm)
        .forMember(
          (d) => d.url,
          preCondition((s) => s.shouldIgnore > 5, 'default url'),
          mapFrom((s) => s.source)
        )
        .forMember(
          (d) => d.forCondition,
          condition((s) => s.shouldIgnore > 5, true)
        )
        .forMember((d) => d.willBeIgnored, ignore())
        .forMember((d) => d.shouldBeSubstituted, nullSubstitution('sub'));
    };
  }
}
