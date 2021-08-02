import type { MappingProfile } from '@automapper/types';
import {
  TypeConverterDestination,
  TypeConverterSource,
} from '../models/type-converter';

export const typeConverterProfile: MappingProfile = (mapper) => {
  mapper
    .addTypeConverter(String, Number, (str) => parseInt(str))
    .addTypeConverter(String, Date, (str) => new Date(str))
    .addTypeConverter(String, Boolean, (str) => Boolean(str))
    .createMap(TypeConverterSource, TypeConverterDestination);
};
