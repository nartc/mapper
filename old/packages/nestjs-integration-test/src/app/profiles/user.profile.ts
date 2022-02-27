import type { Mapper, MappingProfile } from '@automapper/core';
import { mapFrom } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { User, UserVm } from '../models/user';

@Injectable()
export class UserProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile(): MappingProfile {
    return (mapper) => {
      mapper
        .createMap(User, UserVm)
        .forMember(
          (d) => d.first,
          mapFrom((s) => s.firstName)
        )
        .forMember(
          (d) => d.last,
          mapFrom((s) => s.lastName)
        )
        .forMember(
          (d) => d.full,
          mapFrom((s) => s.firstName + ' ' + s.lastName)
        );
    };
  }
}
