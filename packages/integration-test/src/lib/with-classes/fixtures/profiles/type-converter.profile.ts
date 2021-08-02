import type { MappingProfile } from '@automapper/types';
import {
  TypeConverterCamelSource,
  TypeConverterDestination,
  TypeConverterPascalDestination,
  TypeConverterSnakeDestination,
  TypeConverterSource,
} from '../models/type-converter';

export const typeConverterProfile: MappingProfile = (mapper) => {
  mapper
    .addTypeConverter(String, Number, (str) => parseInt(str))
    .addTypeConverter(String, Date, (str) => new Date(str))
    .addTypeConverter(String, Boolean, (str) => Boolean(str))
    .createMap(TypeConverterSource, TypeConverterDestination);
};

export const typeConverterSnakeProfile: MappingProfile = (mapper) => {
  mapper
    .addTypeConverter(String, Number, (str) => parseInt(str))
    .addTypeConverter(String, Date, (str) => new Date(str))
    .addTypeConverter(String, Boolean, (str) => Boolean(str))
    .createMap(TypeConverterCamelSource, TypeConverterSnakeDestination);
};

export const typeConverterPascalProfile: MappingProfile = (mapper) => {
  mapper
    .addTypeConverter(String, Number, (str) => parseInt(str))
    .addTypeConverter(String, Date, (str) => new Date(str))
    .addTypeConverter(String, Boolean, (str) => Boolean(str))
    .createMap(TypeConverterCamelSource, TypeConverterPascalDestination);
};
