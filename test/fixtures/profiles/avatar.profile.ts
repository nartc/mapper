import {
  AutoMapper,
  condition,
  fromValue,
  ignore,
  mapFrom,
  nullSubstitution,
  preCondition,
  ProfileBase,
} from '../../../src';
import { Avatar, AvatarVm } from '../models/avatar';

export class AvatarProfile extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper
      .createMap(Avatar, AvatarVm)
      .forMember(
        d => d.url,
        preCondition(s => s.shouldIgnore > 5, 'default url'),
        mapFrom(s => s.source)
      )
      .forMember(
        d => d.forCondition,
        condition(s => s.shouldIgnore > 5, true)
      )
      .forMember(d => d.ignored, ignore())
      .forMember(d => d.shouldBeSubstituted, nullSubstitution('sub'))
      .reverseMap()
      .forPath(s => s.url, ignore())
      .forPath(s => s.shouldIgnore, fromValue(5));
  }
}
