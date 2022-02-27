import type { MapAction, Mapper, MappingProfile } from '@automapper/core';
import { mapFrom } from '@automapper/core';
import { SimpleUser, SimpleUserVm } from '../models/simple-user';

export const selfUserProfile: MappingProfile = (mapper) => {
  mapper.createMap(SimpleUser, SimpleUser);
};

export const simpleUserProfileFactory =
  (actions?: { beforeMap: MapAction; afterMap: MapAction }): MappingProfile =>
  (mapper: Mapper) => {
    const fluent = mapper.createMap(SimpleUser, SimpleUserVm);

    if (actions) {
      fluent.beforeMap(actions.beforeMap).afterMap(actions.afterMap);
    }

    fluent.forMember(
      (d) => d.fullName,
      mapFrom((s) => s.firstName + ' ' + s.lastName)
    );
  };
