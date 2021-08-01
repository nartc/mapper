import { convertUsing, mapWith } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import type { Converter, Mapper, MappingProfile } from '@automapper/types';
import { Injectable } from '@nestjs/common';
import { Avatar, AvatarVm } from '../models/avatar';
import { UserProfile, UserProfileVm } from '../models/user-profile';

export const dateToStringConverter: Converter<Date, string> = {
  convert(source: Date | string): string {
    if (typeof source === 'string') return new Date(source).toDateString();
    return source.toDateString();
  },
};

@Injectable()
export class UserProfileProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile(): MappingProfile {
    return (mapper) => {
      mapper
        .createMap(UserProfile, UserProfileVm)
        .forMember(
          (d) => d.avatar,
          mapWith(AvatarVm, Avatar, (s) => s.avatar)
        )
        .forMember(
          (d) => d.birthday,
          convertUsing(dateToStringConverter, (s) => s.birthday)
        );
    };
  }
}
