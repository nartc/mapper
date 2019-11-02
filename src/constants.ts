import { CamelCaseNamingConvention } from './naming';
import { MapActionOptions } from './types';

/**
 * Internal constant
 * @private
 */
export const defaultSourceMemberNamingConvention = new CamelCaseNamingConvention();

/**
 * Internal constant
 * @private
 */
export const defaultDestinationMemberNamingConvention = new CamelCaseNamingConvention();

/**
 * Internal constant
 * @private
 */
export const defaultMapActionOptions: MapActionOptions = {
  beforeMap: undefined,
  afterMap: undefined,
};
