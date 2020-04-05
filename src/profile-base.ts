import { MappingProfile } from './types';

export abstract class ProfileBase implements MappingProfile {
  profileName: string;

  protected constructor() {
    this.profileName = this.constructor.name;
  }
}
