/**
 * Abstract class for all mapping Profiles
 *
 */
import { AutoMapper } from '../automapper';
import { MappingProfile } from '../types';

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

  /**
   * @abstract configure() method to be called when using with Mapper.initialize()
   *
   * @param {AutoMapper} mapper - AutoMapper instance to add this Profile on
   */
  abstract configure(mapper: AutoMapper): void;
}
