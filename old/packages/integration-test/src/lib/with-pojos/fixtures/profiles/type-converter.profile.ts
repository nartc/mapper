import type { MappingProfile } from '@automapper/core';
import {
  createTypeConverterMetadata,
  TypeConverterCamelSource,
  TypeConverterDestination,
  TypeConverterPascalDestination,
  TypeConverterSnakeDestination,
  TypeConverterSource,
} from '../interfaces/type-converter.interface';

export const typeConverterProfile: MappingProfile = (mapper) => {
  createTypeConverterMetadata();

  mapper
    .addTypeConverter(String, Number, (str) => parseInt(str))
    .addTypeConverter(String, Date, (str) => new Date(str))
    .addTypeConverter(String, Boolean, (str) => Boolean(str))
    .createMap<TypeConverterSource, TypeConverterDestination>(
      'TypeConverterSource',
      'TypeConverterDestination'
    );
};

export const typeConverterSnakeProfile: MappingProfile = (mapper) => {
  createTypeConverterMetadata();

  mapper
    .addTypeConverter(String, Number, (str) => parseInt(str))
    .addTypeConverter(String, Date, (str) => new Date(str))
    .addTypeConverter(String, Boolean, (str) => Boolean(str))
    .createMap<TypeConverterCamelSource, TypeConverterSnakeDestination>(
      'TypeConverterCamelSource',
      'TypeConverterSnakeDestination'
    );
};

export const typeConverterPascalProfile: MappingProfile = (mapper) => {
  createTypeConverterMetadata();

  mapper
    .addTypeConverter(String, Number, (str) => parseInt(str))
    .addTypeConverter(String, Date, (str) => new Date(str))
    .addTypeConverter(String, Boolean, (str) => Boolean(str))
    .createMap<TypeConverterCamelSource, TypeConverterPascalDestination>(
      'TypeConverterCamelSource',
      'TypeConverterPascalDestination'
    );
};
