import { CamelCaseNamingConvention } from './naming';
import { MapActionOptions } from './types';

export const defaultSourceMemberNamingConvention = new CamelCaseNamingConvention();
export const defaultDestinationMemberNamingConvention = new CamelCaseNamingConvention();
export const defaultMapActionOptions: MapActionOptions = {
  beforeMap: undefined,
  afterMap: undefined,
};
