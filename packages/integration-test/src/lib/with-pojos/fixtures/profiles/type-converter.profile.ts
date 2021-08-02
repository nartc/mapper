import type { MappingProfile } from '@automapper/types';
import {
  createTypeConverterMetadata,
  TypeConverterDestination,
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
