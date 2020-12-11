import { NamingConvention } from './naming-convention';

export interface CreateMapOptions {
  sourceNamingConvention?: NamingConvention;
  destinationNamingConvention?: NamingConvention;
  includeBase?: [];
}
