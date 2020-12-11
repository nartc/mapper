import { NamingConvention } from './naming-convention';

export interface CreateMapperOptions {
  /**
   * NamingConvention of the source object's properties
   */
  sourceNamingConvention?: NamingConvention;
  /**
   * NamingConvention of the destination object's properties
   */
  destinationNamingConvention?: NamingConvention;
  /**
   * Whether to skip assertion on unmapped properties or not
   */
  skipUnmappedAssertion?: boolean;
  /**
   * Whether to throw error or just log to the console
   */
  throwError?: boolean;
}
