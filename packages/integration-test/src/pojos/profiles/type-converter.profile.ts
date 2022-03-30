import { createMap, MappingProfile, typeConverter } from '@automapper/core';
import {
    createTypeConverterDtoMetadata,
    TypeConverterDto,
} from '../dtos/type-converter.dto';
import {
    createTypeConverterMetadata,
    TypeConverter,
} from '../models/type-converter';

export const typeConverterProfile: MappingProfile = (mapper) => {
    createTypeConverterMetadata();
    createTypeConverterDtoMetadata();

    createMap<TypeConverter, TypeConverterDto>(
        mapper,
        'TypeConverter',
        'TypeConverterDto',
        typeConverter(String, Number, (str) => parseInt(str) + 1),
        typeConverter(String, Boolean, (str) => Boolean(str)),
        typeConverter(String, Date, (str) => new Date(str)),
        typeConverter([String], [Number], (manyStrs) =>
            manyStrs.map((str) => parseInt(str))
        ),
        typeConverter(Date, String, (dateStr) => dateStr.toDateString())
    );
};
