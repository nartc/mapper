import { mapFrom } from '@automapper/core';
import type { MapAction, Mapper, MappingProfile } from '@automapper/types';
import {
  createSimpleUserMetadata,
  SimpleUser,
  SimpleUserVm,
} from '../interfaces/simple-user.interface';

export const simpleUserProfileFactory = (actions?: {
  beforeMap: MapAction;
  afterMap: MapAction;
}): MappingProfile => (mapper: Mapper) => {
  createSimpleUserMetadata();

  const fluent = mapper.createMap<SimpleUser, SimpleUserVm>(
    'SimpleUser',
    'SimpleUserVm'
  );

  if (actions) {
    fluent.beforeMap(actions.beforeMap).afterMap(actions.afterMap);
  }

  fluent.forMember(
    (d) => d.fullName,
    mapFrom((s) => s.firstName + ' ' + s.lastName)
  );
};
