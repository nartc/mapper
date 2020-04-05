import { AutoMapper } from '../automapper';
import { MappingProfile } from '../types';

/**
 * Internal ProfileStorage class
 *
 * @private
 */
export class ProfileStorage {
  private profiles: WeakMap<AutoMapper, MappingProfile[]>;

  constructor() {
    this.profiles = new WeakMap<AutoMapper, MappingProfile[]>();
  }

  /**
   * Initialize a Mapper instance with an empty profiles array
   *
   * @param {AutoMapper} mapper - Mapper instance to initialize
   */
  initialize(mapper: AutoMapper): void {
    this.profiles.set(mapper, []);
  }

  /**
   * Add a MappingProfile to a Mapper instance
   *
   * @param {AutoMapper} mapper - Mapper instance to initialize
   * @param {MappingProfile} profile - MappingProfile to add to the mapper instance
   */
  add(mapper: AutoMapper, profile: MappingProfile): void {
    const profiles = this.profiles.get(mapper) as MappingProfile[];
    if (profiles.some(p => p.profileName === profile.profileName)) {
      throw new Error(
        `${profile.profileName} already exists on this mapper instance`
      );
    }

    profiles.push(profile);
  }
}
