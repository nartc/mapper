import { Mapper, MappingProfile } from '@automapper/types';

export abstract class AutomapperProfile {
  protected mapper: Mapper;

  protected constructor(mapper: Mapper) {
    this.mapper = mapper;
    process.nextTick(() => this.mapper.addProfile(this.mapProfile()));
  }

  abstract mapProfile(): MappingProfile;
}
