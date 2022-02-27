import { Mapper, MappingProfile } from '@automapper/core';

export abstract class AutomapperProfile {
  protected mapper: Mapper;

  protected constructor(mapper: Mapper) {
    this.mapper = mapper;
    Promise.resolve().then(() => this.mapper.addProfile(this.mapProfile()));
  }

  abstract mapProfile(): MappingProfile;
}
