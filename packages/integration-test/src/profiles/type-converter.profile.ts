import { createMap, MappingProfile, typeConverter } from '@automapper/core';
import { TypeConverterDto } from '../dtos/type-converter.dto';
import { TypeConverter } from '../models/type-converter';

export const typeConverterProfile: MappingProfile = (mapper) => {
    createMap(
        mapper,
        TypeConverter,
        TypeConverterDto,
        typeConverter(String, Number, (str) => parseInt(str) + 1),
        typeConverter(String, Date, (str) => new Date(str)),
        typeConverter(String, Boolean, (str) => Boolean(str)),
        typeConverter([String], [Number], (manyStrs) =>
            manyStrs.map((str) => parseInt(str))
        )
    );
};
