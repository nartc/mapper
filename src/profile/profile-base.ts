/**
 * Abstract class for all mapping Profiles
 *
 */
import { MappingProfile } from '../types';

/**
 * MappingProfileBase. Provide the derived class name as value for profileName
 */
export abstract class MappingProfileBase implements MappingProfile {
  /**
   * @property {string} profileName - the name of the Profile
   */
  public profileName: string;

  /**
   * @constructor - initialize the profile with the profileName
   */
  protected constructor() {
    this.profileName = this.constructor.name;
  }
}
